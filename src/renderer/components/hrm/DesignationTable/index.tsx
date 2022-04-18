import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const DesignationTable = () => {
  const format = 'YYYY-MM-DD';
  const today = new Date();
  const columns = [
    {
      title: 'SL No',
      dataIndex: 'sl_no',
      key: 'sl_no',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Voucher No',
      dataIndex: 'voucher_no',
      key: 'voucher_no',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Head of Account',
      dataIndex: 'head_of_account',
      key: 'head_of_account',
      width: '25%',
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      key: 'debit',
      align: 'right',
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'right',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
    },
  ];

  const data = [
    {
      key: '1',
      sl_no: 1,
      date: moment(today).format(format),
      voucher_no: 'Dh-4',
      type: 'CIV',
      head_of_account: 'Cash In Hand',
      debit: 125,
      credit: 100,
      balance: 558,
    },
    {
      key: '2',
      sl_no: 2,
      date: moment(today).format(format),
      voucher_no: 'DV-8',
      type: 'CIV',
      head_of_account: 'Cash In Hand',
      debit: 259,
      credit: 350,
      balance: 299,
    },
    {
      key: '3',
      sl_no: 3,
      date: moment(today).format(format),
      voucher_no: 'DK-1',
      type: 'CIV',
      head_of_account: 'Cash In Hand',
      debit: 489,
      credit: 508,
      balance: 789,
    },
  ];

  const [isOpenDesignationModal, setOpenDesignationModal] = useState(false);

  const handleOpenModal = () => {
    setOpenDesignationModal(true);
  };
  return (
    <div className="box_shadow">
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: '1.5rem', float: 'right' }}
      >
        <PlusCircleOutlined /> Add Designation
      </Button>
      <Table bordered columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default DesignationTable;
