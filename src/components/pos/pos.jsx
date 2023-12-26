import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadAllCouponValid } from "../../redux/rtk/features/Coupon/couponSlice";
import { loadAllVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";
import AddPos from "./AddPos";
import PaymentForm from "./PaymentForm";
import ProductsForSale from "./ProductsForSale";

const Pos = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  // Form Function
  const [form] = Form.useForm();
  const paymentForm = Form.useForm()[0];
  const dispatch = useDispatch();

  const [subTotal, setSubTotal] = useState([]);
  const [total, setTotal] = useState(0);
  const [afterDiscount, setAfterDiscount] = useState(0);
  const [afterVatTaxAdded, setAfterVatTaxAdded] = useState(0);
  const [due, setDue] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { list: vatTaxList, loading: vatTaxLoading } = useSelector(
    (state) => state.vatTax
  );
  const { validList, loading: validLoading } = useSelector(
    (state) => state.coupon
  );
  useEffect(() => {
    dispatch(loadAllVatTax());
    dispatch(loadAllCouponValid());
  }, [dispatch]);
  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  // total calculate
  const totalCalculator = () => {
    const productArray = form.getFieldValue("saleInvoiceProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productSalePrice || 0;
        const vat = current?.productVat || 0;
        const totalVat = (vat / 100) * price * quantity;

        return [
          ...subTotal,
          {
            subVat: current?.productVat || 0,
            subPrice: price * quantity + totalVat,
          },
        ];
      }, []) || [];

    setSubTotal(subTotal);
    const total =
      subTotal.reduce((total, current) => total + current.subPrice, 0) || 0;

    setTotal(total);

    const afterDiscount = Boolean(total)
      ? total - (paymentForm.getFieldValue("discount") || 0) || 0
      : 0;
    setAfterDiscount(afterDiscount);

    // coupon calculate
    let afterCouponAdded = afterDiscount;
    const couponFiled = paymentForm.getFieldValue("couponCode");

    if (couponFiled) {
      const couponItem = validList?.find(
        (item) => item.couponCode === couponFiled
      );

      if (couponItem.type === "percentage") {
        afterCouponAdded =
          afterDiscount - (couponItem.value / 100) * afterDiscount;
      } else {
        afterCouponAdded = afterDiscount - couponItem.value;
      }
    }
    // vat tax calculate
    const vatFields = paymentForm.getFieldValue("vatId");

    const totalVatArray =
      vatFields?.map((id) => {
        return vatTaxList.find((item) => id === item.id)?.percentage;
      }) || [];
    const TotalTaxVatPercent = totalVatArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const afterVatTaxAdded =
      afterCouponAdded + (TotalTaxVatPercent / 100) * afterCouponAdded;
    setAfterVatTaxAdded(afterVatTaxAdded);

    //due count
    const due = Boolean(afterCouponAdded)
      ? afterVatTaxAdded - (paymentForm.getFieldValue("paidAmount") || 0) || 0
      : 0;
    setDue(due);
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-grow border rounded-lg h-full'>
        <div className='flex flex-col xl:flex-row gap-5 h-full'>
          <div className='2xl:w-2/5  xl:w-1/2 p-5 bg-[#F1F1F1] h-full'>
            <ProductsForSale form={form} totalCalculator={totalCalculator} />
          </div>
          <div className='2xl:w-3/5 xl:w-1/2 p-5'>
            <AddPos
              form={form}
              totalCalculator={totalCalculator}
              subTotal={subTotal}
              afterVatTaxAdded={afterVatTaxAdded}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      </div>
      <div className='border rounded bg-white p-2 px-5 mt-2'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='font-semibold text-lg'>Net Total</span>:{" "}
            <span className='font-bold text-xl'>
              {afterVatTaxAdded.toFixed(3)}
            </span>
          </div>
          <div>
            <Button onClick={() => form.submit()} type='primary'>
              <strong>Continue Sale</strong>
            </Button>
          </div>
        </div>
      </div>
      <PaymentForm
        form={paymentForm}
        isModalOpen={isModalOpen}
        productForm={form}
        setIsModalOpen={setIsModalOpen}
        afterDiscount={afterDiscount}
        afterVatTaxAdded={afterVatTaxAdded}
        due={due}
        total={total}
        totalCalculator={totalCalculator}
        vatTaxList={vatTaxList}
        vatTaxLoading={vatTaxLoading}
        validList={validList}
        validLoading={validLoading}
      />
    </div>
  );
};

export default Pos;
