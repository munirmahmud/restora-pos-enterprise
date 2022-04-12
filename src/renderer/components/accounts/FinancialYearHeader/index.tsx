import { Button, Col, DatePicker, Form, Input, Radio, Row, Space } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const dateFormat = 'YYYY-MM-DD';

type FinancialYearTypes = {
  title: string;
  from_date: string;
  to_date: string;
  status: number;
};

const FinancialYearHeader = () => {
  const [form] = Form.useForm();
  const today = new Date();

  const [value, setValue] = useState(1);

  const handleChangeStatus = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = (value: FinancialYearTypes) => {
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
        padding: '1.5rem 2rem',
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
              name="title"
              label="Title"
              style={{ marginBottom: '10px' }}
            >
              <Input placeholder="Title" size="large" />
            </Form.Item>

            <Row gutter={20}>
              <Col lg={12} xl={12} xxl={12}>
                <Form.Item
                  name="from_date"
                  label="From"
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
              </Col>

              <Col lg={12} xl={12} xxl={12}>
                <Form.Item name="to_date" label="To">
                  <DatePicker
                    style={{ width: '100%' }}
                    defaultValue={moment(today, dateFormat)}
                    format={dateFormat}
                    showToday={false}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="status"
              label="Status"
              style={{ marginBottom: '10px' }}
            >
              <Radio.Group onChange={handleChangeStatus} value={value}>
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Inactive</Radio>
              </Radio.Group>
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

export default FinancialYearHeader;
