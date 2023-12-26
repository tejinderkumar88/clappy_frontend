import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select } from "antd";

export default function ProductAdd({
  form,
  productList,
  productLoading,
  totalCalculator,
  subTotal,
}) {
  const handleSetInitial = (product, serial) => {
    const productArray = form.getFieldValue("adjustInvoiceProduct");
    const findProduct = productList.find((pro) => pro.id === product);
    const newArray = productArray.map((product, index) => {
      if (index === serial) {
        return {
          ...product,
          productQuantity: findProduct.productQuantity,
          productPurchasePrice: findProduct.productPurchasePrice,
        };
      } else {
        return product;
      }
    });

    form.setFieldsValue({
      adjustInvoiceProduct: newArray,
    });
    totalCalculator(serial);
  };

  return (
    <>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs'>
          SL
        </div>

        <div className='col-span-3 font-weight-bold md:text-base xxs:text-xs'>
          Product
        </div>

        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs'>
          Total QYT
        </div>

        <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs'>
          Unit Price
        </div>

        <div className='col-span-2 font-weight-bold md:text-base xxs:text-xs'>
          Type
        </div>

        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs'>
          Adjust QYT
        </div>

        <div className='col-span-1 font-weight-bold md:text-base xxs:text-xs'>
          Total
        </div>

        <div className='col-span-1 md:text-base xxs:text-xs'>Delete</div>
      </div>

      <hr style={{ backgroundColor: "black", marginTop: "0.5rem" }} />

      <Form.List
        name='adjustInvoiceProduct'
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className='max-h-[550px] grid w-full overflow-y-auto overflow-x-visible mt-2'>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className='grid grid-cols-12 gap-3' key={key}>
                  <div className='col-span-1'>{index + 1}</div>
                  <div className='col-span-3'>
                    <Form.Item
                      {...restField}
                      name={[name, "productId"]}
                      rules={[
                        {
                          required: true,
                          message: "Product is required",
                        },
                      ]}
                    >
                      <Select
                        placeholder='Select Product'
                        showSearch
                        loading={productLoading}
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(product) => {
                          handleSetInitial(product, index);
                        }}
                      >
                        {productList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-span-1'>
                    <Form.Item
                      {...restField}
                      name={[name, "productQuantity"]}
                      rules={[
                        {
                          required: true,
                          message: "quantity is required",
                        },
                      ]}
                    >
                      <InputNumber
                        disabled
                        size={"small"}
                        placeholder='Quantity'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-span-2'>
                    <Form.Item
                      {...restField}
                      name={[name, "productPurchasePrice"]}
                      rules={[
                        {
                          required: true,
                          message: "Price is required",
                        },
                      ]}
                    >
                      <InputNumber
                        size='small'
                        // className="w-full text-sm xxs:p-0 md:p-2"
                        placeholder='50000'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-span-2'>
                    <Form.Item
                      {...restField}
                      name={[name, "adjustType"]}
                      rules={[
                        {
                          required: true,
                          message: "Adjust type is required",
                        },
                      ]}
                    >
                      <Select
                        placeholder='Select Adjust Type'
                        showSearch
                        size='small'
                        onChange={() => totalCalculator(index)}
                      >
                        <Select.Option key={"increment"}>
                          Increment
                        </Select.Option>
                        <Select.Option key={"decrement"}>
                          Decrement
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-span-1'>
                    <Form.Item
                      {...restField}
                      name={[name, "adjustQuantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Adjust Quantity is required",
                        },
                      ]}
                    >
                      <InputNumber
                        size='small'
                        placeholder='50'
                        onChange={() => totalCalculator(index)}
                      />
                    </Form.Item>
                  </div>
                  <div className='col-span-1'>
                    <div className='font-weight-bold totalMargin'>
                      {subTotal[index]?.adjustType === "increment" && "+"}
                      {subTotal[index]?.adjustType === "decrement" && "-"}
                      {subTotal[index]?.total || 0}
                    </div>
                  </div>
                  <div className='col-span-1'>
                    <Form.Item>
                      <button
                        shape='circle'
                        className='flex justify-center items-center bg-red-600 text-white p-2 rounded-md'
                        onClick={() => {
                          remove(name);
                          totalCalculator(index);
                        }}
                      >
                        <DeleteOutlined className='' />
                      </button>
                    </Form.Item>
                  </div>
                </div>
              ))}
            </div>
            <Form.Item style={{ marginTop: "20px" }}>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}
