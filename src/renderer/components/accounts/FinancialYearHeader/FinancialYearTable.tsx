import { Table } from 'antd';

const FinancialYearTable = () => {
  const columns = [
    {
      title: 'SL NO.',
      dataIndex: 'SL NO.',
      key: 'SL NO.',
      width: '5%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      width: '30%',
    },
    {
      title: 'From',
      dataIndex: 'From',
      key: 'From',
      width: '20%',
    },
    {
      title: 'To',
      dataIndex: 'To',
      key: 'To',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
    },
  ];

  return (
    <div
      style={{
        padding: '2rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
        marginTop: '1.5rem',
      }}
    >
      <Table
        bordered
        columns={columns}
        locale={{ emptyText: 'No Financial data found.' }}
      />
    </div>
  );
};

export default FinancialYearTable;
