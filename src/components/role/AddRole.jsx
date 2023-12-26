import { Button, Form, Input, Typography } from "antd";

import React, {  useState } from "react";
import { toast } from "react-toastify";
import { addSingleRole } from "../../redux/rtk/features/hr/role/roleSlice";
import { useDispatch } from "react-redux";

const AddRole = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    await dispatch(addSingleRole(values));
    setLoader(false);    
  };

  const onFinishFailed = () => {
    toast.warning("Failed at adding role");
    setLoader(false);
  };
  return (
    <>
      <Title level={4} className='m-2 mt-5 text-center'>
        Add New Role
      </Title>
      <Form
        eventKey='role-form'
        name='basic'
        layout='vertical'
        style={{ marginLeft: "40px", marginRight: "40px" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div>
          <Form.Item
            style={{ marginBottom: "20px" }}
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              onClick={() => setLoader(true)}
              type='primary'
              size='small'
              htmlType='submit'
              block
              loading={loader}
            >
              Add New Role
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddRole;
