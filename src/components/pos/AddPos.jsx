import { DatePicker, Form, Select } from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/rtk/features/customer/customerSlice";
import Products from "./Products";

import dayjs from "dayjs";
import { loadAllVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";
import BigDrawer from "../Drawer/BigDrawer";
import AddCust from "../customer/addCust";

const AddPos = ({ form, subTotal, setIsModalOpen, totalCalculator }) => {
  const { Option } = Select;

  const dispatch = useDispatch();
  const allCustomer = useSelector((state) => state.customers.list);

  const onFormSubmit = async () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(loadAllVatTax());
    dispatch(loadAllCustomer({ page: 1, count: 10 }));
  }, [dispatch]);

  return (
    <Form
      form={form}
      className='m-lg-1'
      onFinish={onFormSubmit}
      name='dynamic_form_nest_item'
      layout='vertical'
      size='large'
      autoComplete='off'
      initialValues={{
        date: dayjs(),
      }}
    >
      <div className='flex flex-col 3xl:flex-row justify-between gap-2 mb-10'>
        <div className='3xl:w-1/2 flex items-end '>
          <Form.Item
            label='Customer'
            className='flex-grow'
            name='customerId'
            rules={[
              {
                required: true,
                message: "Please Select a Customer!",
              },
            ]}
          >
            <Select
              className='w-full'
              loading={!allCustomer}
              showSearch
              placeholder='Select a customer '
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.children
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {allCustomer &&
                allCustomer.map((cust) => (
                  <Option key={cust.id} value={cust.id}>
                    {cust.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <BigDrawer
            className={"mb-[27px]"}
            title={"new Customer"}
            btnTitle={"New"}
          >
            <AddCust drawer={true} />
          </BigDrawer>
        </div>
        <div className='3xl:w-1/2'>
          <Form.Item
            label='Date'
            name='date'
            rules={[
              {
                required: true,
                message: "Please input Date!",
              },
            ]}
            required
          >
            <DatePicker />
          </Form.Item>
        </div>
      </div>

      <Products
        subTotal={subTotal}
        form={form}
        totalCalculator={totalCalculator}
      />
    </Form>
  );
};

export default AddPos;
