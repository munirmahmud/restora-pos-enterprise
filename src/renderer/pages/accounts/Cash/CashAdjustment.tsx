import { Form } from 'antd';
import CashAdjustmentHeader from 'renderer/components/accounts/CashAdjustmentHeader';
import CashAdjustmentTable from './../../../components/accounts/CashAdjustmentHeader/CashAdjustmentTable';

type CashAdjustmentTypes = {
  payment_type: string;
  data: string;
  remark: string;
};

const CashAdjustment = () => {
  const [form] = Form.useForm();

  const handleSubmit = (value: CashAdjustmentTypes) => {
    console.log('value', value);

    form.resetFields();
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
      <CashAdjustmentHeader />
      <CashAdjustmentTable />
    </Form>
  );
};

export default CashAdjustment;
