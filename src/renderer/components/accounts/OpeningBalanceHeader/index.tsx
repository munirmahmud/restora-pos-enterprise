import { Button, Col, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

type DebitVoucherTypes = {
  head_of_account: string;
  amount: string;
  remark: string;
};

const OpeningBalanceHeader = () => {
  const [form] = Form.useForm();

  const handleSubmit = (value: DebitVoucherTypes) => {
    console.log('value', value);

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div
      className="accounts_head_area"
      style={{
        padding: '1.5rem 3rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={20}>
          <Col lg={14} xl={14} xxl={14}>
            <Form.Item
              name="head_of_account"
              label="Head of Account"
              style={{ marginBottom: '10px' }}
            >
              <Select placeholder="Select a option" size="large" allowClear>
                <Option value="1">Bank</Option>
                <Option value="2">Bkash</Option>
                <Option value="3">City Bank</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              style={{ marginBottom: '10px' }}
            >
              <Input placeholder="Amount" size="large" />
            </Form.Item>

            <Form.Item
              name="remark"
              label="Remark"
              style={{ marginBottom: '10px' }}
            >
              <TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Space>
          <Button type="primary" danger onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default OpeningBalanceHeader;
