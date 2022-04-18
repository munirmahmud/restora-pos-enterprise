import { Table } from 'antd';
import moment from 'moment';

const CashBookTable = () => {
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
      title: 'Voucher Type',
      dataIndex: 'voucher_type',
      key: 'voucher_type',
    },
    {
      title: 'Head Name',
      dataIndex: 'head_name',
      key: 'head_name',
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
      voucher_type: 'Sales Product',
      head_name: 'Cash In Hand',
      debit: 125,
      credit: 100,
      balance: 558,
    },
    {
      key: '2',
      sl_no: 2,
      date: moment(today).format(format),
      voucher_no: 'DV-8',
      voucher_type: 'Sales Product',
      head_name: 'Cash In Hand',
      debit: 259,
      credit: 350,
      balance: 299,
    },
    {
      key: '3',
      sl_no: 3,
      date: moment(today).format(format),
      voucher_no: 'DK-1',
      voucher_type: 'Sales Product',
      head_name: 'Cash In Hand',
      debit: 489,
      credit: 508,
      balance: 789,
    },
  ];

  return (
    <Table bordered columns={columns} dataSource={data} pagination={false} />
  );
};

export default CashBookTable;
