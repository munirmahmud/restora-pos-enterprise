import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
const { TextArea } = Input;

type CustomerData = {
  errors: [];
  name: [];
  touched: boolean;
  validating: boolean;
  value: string;
  warnings: [];
};

type CustomerInfoProps = {
  addCustomer: CustomerData[];
  addCustomerModal: boolean;
  setAddCustomer: (params: {}) => void;
  setAddCustomerModal: (param: boolean) => void;
  setReRender: (prevState: boolean) => void;
};

const AddCustomerModal = ({
  customerInfo,
}: {
  customerInfo: CustomerInfoProps;
}) => {
  const [addCustomerName] = Form.useForm();

  const handleClose = () => {
    customerInfo.setAddCustomerModal(false);
    addCustomerName.resetFields();
  };

  const submitNewCustomer = () => {
    const addCustomerInfo = {};

    for (const data of customerInfo.addCustomer) {
      addCustomerInfo[data.name[0]] =
        typeof data?.value === 'string' ? data?.value?.trim() : data?.value;
    }

    // Insert through the event & channel
    window.insert_customer_info.send('insert_customer_info', addCustomerInfo);

    // Customer name insert response
    window.insert_customer_info.once(
      'insert_customer_info_response',
      ({ status }: { status: any }) => {
        if (status === 'inserted') {
          customerInfo.setReRender((prevState: boolean) => !prevState);
          customerInfo.setAddCustomerModal(false);
          addCustomerName.resetFields();

          message.success({
            content: 'Customer info added successfully',
            className: 'custom-class',
            duration: 1,
            style: {
              marginTop: '5vh',
              float: 'right',
            },
          });
        }
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Add Customer"
      visible={customerInfo.addCustomerModal}
      onOk={() => customerInfo.setAddCustomerModal(false)}
      onCancel={() => customerInfo.setAddCustomerModal(false)}
      footer={null}
      width={650}
    >
      <Row>
        <Col lg={24}>
          <Form
            form={addCustomerName}
            fields={customerInfo.addCustomer}
            onFinish={submitNewCustomer}
            onFieldsChange={(_, allFields) => {
              customerInfo.setAddCustomer(allFields);
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Customer Name"
              name="customer_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Customer Name!',
                },
              ]}
            >
              <Input placeholder="Customer Name" size="large" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="customer_email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email Address!',
                },
              ]}
            >
              <Input placeholder="Customer Email" size="large" />
            </Form.Item>

            <Form.Item
              label="Mobile "
              name="customer_phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your Mobile!',
                },
              ]}
            >
              <Input placeholder="Customer Mobile" size="large" />
            </Form.Item>

            <Form.Item label="Address" name="customer_address">
              <TextArea placeholder="Customer Address" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                danger
                style={{
                  marginRight: '1rem',
                }}
                onClick={handleClose}
              >
                Close
              </Button>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCustomerModal;
