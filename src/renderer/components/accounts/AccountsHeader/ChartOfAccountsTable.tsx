import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table } from 'antd';
import { useState } from 'react';
import AccountEditModal from './AccountEditModal';

type COAProps = {
  head_code: number;
  head_name: string;
  head_type: string;
  parent_head: string;
  transaction: string;
};

const ChartOfAccountsTable = () => {
  const [isOpenAccountEditModal, setOpenAccountEditModal] =
    useState<boolean>(false);

  const columns = [
    {
      title: 'Head Code',
      dataIndex: 'head_code',
      key: 'head_code',
    },
    {
      title: 'Head Name',
      dataIndex: 'head_name',
      key: 'head_name',
      width: '25%',
    },
    {
      title: 'Parent Head',
      dataIndex: 'parent_head',
      key: 'parent_head',
      width: '22%',
    },
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      width: '15%',
    },
    {
      title: 'Head Type',
      dataIndex: 'head_type',
      key: 'head_type',
      width: '15%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: COAProps) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditAccountData(record)}>
            <EditOutlined />
            Edit
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => handleDeleteAccountData(record)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      head_code: 1,
      head_name: 'Assets',
      parent_head: 'COA',
      transaction: 'No',
      head_type: 'Assets',
    },
    {
      key: '2',
      head_code: 2,
      head_name: 'Income',
      parent_head: 'COA',
      transaction: 'No',
      head_type: 'Income',
    },
    {
      key: '3',
      head_code: 3,
      head_name: 'Assets',
      parent_head: 'COA',
      transaction: 'No',
      head_type: 'Liabilities',
    },
  ];

  const handleEditAccountData = (data: COAProps) => {
    console.log('edit data', data);
    setOpenAccountEditModal(true);
  };
  const handleDeleteAccountData = (data: COAProps) => {
    console.log('delete data', data);
  };

  const handlePrint = () => {
    console.log('print');
  };

  return (
    <div
      style={{
        padding: '1.5rem 3rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
        marginTop: '1.5rem',
      }}
    >
      <div
        className="search_input"
        style={{
          marginBottom: '1.5rem',
        }}
      >
        <Row>
          <Col lg={12} xl={12} xxl={12}>
            <Input placeholder="Search..." size="large" />
          </Col>

          <Col lg={12} xl={12} xxl={12} className="flex content_end">
            <Button type="primary" className="printBtn" onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        bordered
        columns={columns}
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
      />

      <AccountEditModal
        isOpenAccountEditModal={isOpenAccountEditModal}
        setOpenAccountEditModal={setOpenAccountEditModal}
      />
    </div>
  );
};

export default ChartOfAccountsTable;
