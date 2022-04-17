import { Form } from 'antd';
import SupplierPaymentHeader from 'renderer/components/accounts/SupplierPaymentHeader';
import SupplierPaymentTable from '../../../components/accounts/SupplierPaymentHeader/SupplierPaymentTable';

type SupplierPaymentTypes = {
  payment_type: string;
  data: string;
  remark: string;
};

const SupplierPayment = () => {
  const [form] = Form.useForm();

  const handleSubmit = (value: SupplierPaymentTypes) => {
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
      <SupplierPaymentHeader />
      <SupplierPaymentTable />
    </Form>
  );
};

export default SupplierPayment;
