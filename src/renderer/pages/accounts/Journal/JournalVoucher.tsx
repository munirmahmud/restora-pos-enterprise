import { Form } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import JournalVoucherHeader from 'renderer/components/accounts/JournalVoucherHeader';
import JournalVoucherTable from './../../../components/accounts/JournalVoucherHeader/JournalVoucherTable';

type JournalData = {
  date: string;
  remark: string;
};

type JournalTableData = {
  account_name: string;
  comments: string;
  credit: string;
  debit: string;
};

const JournalVoucher = () => {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';
  const today = new Date();

  const [journalVoucherData, setJournalVoucherData] = useState<JournalData>({
    date: moment(today).format(dateFormat),
    remark: '',
  });

  const [defaultTableData, setDefaultTableData] = useState<JournalTableData>({
    account_name: '',
    comments: '',
    credit: '',
    debit: '',
  });

  const handleSubmit = (value: any) => {
    const journalData = value.journalsData || [];
    const newDAtA = [...journalData, defaultTableData];

    console.log('newDAtA', { journalVoucherData, newDAtA });

    form.resetFields();
    setJournalVoucherData({
      date: '',
      remark: '',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <JournalVoucherHeader setJournalVoucherData={setJournalVoucherData} />

      <JournalVoucherTable
        defaultTableData={defaultTableData}
        setDefaultTableData={setDefaultTableData}
      />
    </Form>
  );
};

export default JournalVoucher;
