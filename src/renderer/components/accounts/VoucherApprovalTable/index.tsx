import { EditOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { Key, ReactNode } from 'react';

type ColumnsTypes = {
  title: string;
  dataIndex: string;
  width?: string;
  align?: string;
  render?: (_text: string, record: ColumnsTypes) => ReactNode;
};

type DataTypes = {
  key: Key;
  sl_no: string;
  voucher_no: string;
  remark: string;
  debit: number;
  credit: number;
};

const VoucherApprovalTable = () => {
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Voucher No',
      dataIndex: 'voucher_no',
      width: '15%',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      width: '30%',
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      width: '15%',
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_text: string, record: DataTypes) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="primary" onClick={() => handleApprove(record)}>
            Approve
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      sl_no: '1',
      voucher_no: 'DV-1',
      remark: 'New York No. 1 Lake Park',
      debit: 32,
      credit: 32,
    },
    {
      key: '2',
      sl_no: '2',
      voucher_no: 'DV-1',
      remark: 'London No. 1 Lake Park',
      debit: 42,
      credit: 42,
    },
    {
      key: '3',
      sl_no: '3',
      voucher_no: 'DV-1',
      remark: 'Sidney No. 1 Lake Park',
      debit: 32,
      credit: 32,
    },
  ];

  const handleEdit = (data: DataTypes) => {
    console.log('data ed', data);
  };

  const handleApprove = (data: DataTypes) => {
    console.log('data aa', data);
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataTypes[]) => {
      console.log('selectedRows*******: ', selectedRows);
    },
  };

  const handleApproveMultiple = () => {};

  return (
    <div className="box_shadow">
      <Table
        bordered
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />

      <div style={{ marginTop: '1rem' }}>
        <Button type="primary" onClick={handleApproveMultiple}>
          Approve
        </Button>
      </div>
    </div>
  );
};

export default VoucherApprovalTable;
