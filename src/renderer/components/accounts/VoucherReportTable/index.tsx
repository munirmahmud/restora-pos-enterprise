import { Table } from 'antd';
import moment from 'moment';

const VoucherReportTable = () => {
  const format = 'YYYY-MM-DD';
  const today = new Date();
  const columns = [
    {
      title: 'Voucher No',
      dataIndex: 'voucher_no',
      key: 'voucher_no',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const data = [
    {
      key: '1',
      voucher_no: 'John-1',
      remark: 'Customer debit for Product Invoice#0160 - 0160',
      amount: 558,
      date: moment(today).format(format),
    },
    {
      key: '2',
      voucher_no: 'Jim-05',
      remark: 'Customer debit for Product Invoice#0161 - 0161',
      amount: 299,
      date: moment(today).format(format),
    },
    {
      key: '3',
      voucher_no: 'Joe-55',
      remark:
        'Sale Income For Online payment by appcusL-0001-Walkin - Sale0160',
      amount: 789,
      date: moment(today).format(format),
    },
  ];

  return (
    <div className="box_shadow">
      <Table bordered columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default VoucherReportTable;
