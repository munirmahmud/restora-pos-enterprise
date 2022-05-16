import { Form, Input, Modal } from 'antd';

const CancelOrderModal = ({
  orderData,
  cancelOrderModal,
  setCancelOrderModal,
}: any) => {
  const [form] = Form.useForm();

  const handleSubmit = (value: any) => {
    console.log('Value', value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Cancel Order"
      visible={cancelOrderModal}
      onOk={() => setCancelOrderModal(false)}
      onCancel={() => setCancelOrderModal(false)}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        // fields={categories}
        onFinish={handleSubmit}
        // onFieldsChange={(_, allFields) => {
        //   setCategories(allFields);
        // }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
        // label="Order ID"
        // name="category_name"
        >
          <b>Order ID: {orderData?.order_id}</b>
        </Form.Item>

        <Form.Item label="Cancel Reason" name="cancel_reason">
          <Input placeholder="Category Name" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CancelOrderModal;
