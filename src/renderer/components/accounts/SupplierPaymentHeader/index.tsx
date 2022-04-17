import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

const SupplierPaymentHeader = () => {
  const today = new Date();

  return (
    <div
      style={{
        padding: '1.5rem 3rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
      }}
    >
      <Row gutter={20}>
        <Col lg={10} xl={10} xxl={10}>
          <Form.Item
            name="payment_type"
            label="Payment Type"
            style={{ marginBottom: '10px' }}
          >
            <Select placeholder="Select a option" size="large" allowClear>
              <Option value="1">Cash Payment</Option>
              <Option value="2">Bank Payment</Option>
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Date" style={{ marginBottom: '10px' }}>
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
    </div>
  );
};

export default SupplierPaymentHeader;
