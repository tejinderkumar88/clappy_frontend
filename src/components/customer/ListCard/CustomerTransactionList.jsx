import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import ViewBtn from "../../Buttons/ViewBtn";

const CustomerTransactionList = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },

    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Type ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
    {
      title: "Action",
      key: "action",
      render: ({ id }) => <ViewBtn path={`/admin/transaction/${id}`} />,
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className='mt-2'>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={
            <h6 className='font-semibold m-0 text-center'>
              All Transaction Information
            </h6>
          }
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className='col-info'>
            <Table
              scroll={{ x: true }}
              loading={!list}
              columns={columns}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomerTransactionList;
