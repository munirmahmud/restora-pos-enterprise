import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

type DebitVoucherTypes = {
  data: string;
  remark: string;
};

const ContraVoucherHeader = () => {
  const [form] = Form.useForm();
  const today = new Date();

  const handleSubmit = (value: DebitVoucherTypes) => {
    console.log('value', value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
          <Col lg={10} xl={10} xxl={10}>
            <Form.Item
              name="date"
              label="Date"
              style={{ marginBottom: '10px' }}
            >
              <DatePicker
                style={{ width: '100%' }}
                defaultValue={moment(today, dateFormat)}
                format={dateFormat}
                showToday={false}
                size="large"
              />
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
      </Form>
    </div>
  );
};

export default ContraVoucherHeader;
