import { Button, Form, InputNumber, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSale } from "../../redux/rtk/features/sale/saleSlice";

export default function PaymentForm({
  isModalOpen,
  setIsModalOpen,
  form,
  total,
  totalCalculator,
  afterDiscount,
  afterVatTaxAdded,
  due,
  vatTaxList,
  vatTaxLoading,
  productForm,
  validList,
  validLoading,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHold, setHold] = useState("false");
  //get id from local storage
  const userId = localStorage.getItem("id");
  // validation handlers
  const validatePaidAmount = (_, value) => {
    if (isHold === "true") {
      return Promise.resolve();
    }
    if (value >= afterVatTaxAdded) {
      return Promise.resolve();
    }
    return Promise.reject(
      `Paid amount must be gater than or equal ${afterVatTaxAdded}`
    );
  };
  const validateDiscount = (_, value) => {
    if (value >= 0 && value <= total) {
      return Promise.resolve();
    }
    return Promise.reject(`Discount must be gater than or equal ${total}`);
  };
  const onFormSubmit = async (values) => {
    try {
      const products = productForm
        ?.getFieldValue("saleInvoiceProduct")
        ?.map((product) => {
          return {
            productId: product.productId,
            productSalePrice: product.productSalePrice,
            productQuantity: product.productQuantity,
          };
        });

      const data = {
        ...values,
        customerId: productForm.getFieldValue("customerId"),
        date: productForm.getFieldValue("date"),
        paidAmount: afterVatTaxAdded,
        saleInvoiceProduct: products,
        userId: parseInt(userId),
        isHold,
      };
      const resp = await dispatch(addSale(data));
      setHold("false");
      if (resp.payload.message === "success") {
        form.resetFields();
        isHold === "true"
          ? navigate(`/admin/hold-sale`)
          : navigate(`/admin/sale/${resp.payload.data.id}`);
      }
    } catch (error) {}
  };

  return (
    <>
      <Modal
        title='Sale'
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          form={form}
          className='m-lg-1'
          onFinish={onFormSubmit}
          name='dynamic_form_nest_item'
          initialValues={{
            discount: 0,
            paidAmount: 0,
            vatId: [],
          }}
          layout='vertical'
          size='large'
          autoComplete='off'
        >
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>Total: </strong>
            <strong>{total.toFixed(2)}</strong>
          </div>
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Discount: </span>
            <Form.Item
              className='w-1/2'
              name='discount'
              rules={[
                {
                  validator: validateDiscount,
                },
              ]}
            >
              <InputNumber
                onChange={() => totalCalculator()}
                defaultValue={0}
              />
            </Form.Item>
          </div>
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>After Discount: </strong>
            <strong>{afterDiscount.toFixed(2)}</strong>
          </div>
          <div
            className='flex justify-between'
            style={{
              padding: "10px 0px",
              alignItems: "center",
            }}
          >
            <span className=''>Vat/Tax: </span>
            <Form.Item className='w-1/2' name='vatId'>
              <Select
                mode='multiple'
                placeholder='Select Vat/Tax type'
                maxTagCount={5}
                loading={vatTaxLoading}
                onChange={() => totalCalculator()}
              >
                {vatTaxList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                    <span className='italic'>@{item.percentage}%</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div
            className='flex justify-between'
            style={{
              padding: "10px 0px",
              alignItems: "center",
            }}
          >
            <span className=''>Coupon Code: </span>
            <Form.Item className='w-1/2' name='couponCode'>
              <Select
                allowClear
                placeholder='Select coupon code'
                size={"small"}
                loading={validLoading}
                showSearch
                onChange={() => totalCalculator()}
              >
                {validList?.map((item) => (
                  <Select.Option key={item.id} value={item.couponCode}>
                    <span className='italic'>{item.couponCode}</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>Paid Amount: </strong>
            <strong className='text-xl'>{afterVatTaxAdded.toFixed(2)}</strong>
          </div>
          <div
            className='flex justify-between'
            style={{
              padding: "10px 0px",
              alignItems: "center",
            }}
          >
            <strong>Given Amount: </strong>
            <Form.Item
              name='paidAmount'
              rules={[
                {
                  required: true,
                  message: "Given amount is required",
                },
                {
                  validator: validatePaidAmount,
                },
              ]}
              className='w-1/2'
            >
              <InputNumber
                onChange={() => totalCalculator()}
                defaultValue={0}
              />
            </Form.Item>
          </div>
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>Return Amount: </strong>
            <strong>{due.toFixed(2)}</strong>
          </div>
          <div className='flex items-center gap-3'>
            <Form.Item className='w-1/2'>
              <Button
                block
                type='dashed'
                htmlType='button'
                onClick={() => {
                  setHold("true");
                  setTimeout(() => {
                    form.submit();
                  }, 0.5);
                }}
              >
                Save Draft
              </Button>
            </Form.Item>
            <Form.Item className='w-1/2'>
              <Button block type='primary' htmlType='submit'>
                Sale Now
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
