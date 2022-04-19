import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const PositionalInfo = () => {
  const onDateChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const onHireDateChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const onTerminationDateChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const onReHireChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Division"
            name="division"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select a Division"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item label=" Hire Date" name="hire_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={onHireDateChange}
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Pay Frequency Text"
            name="pay_frequency_text"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Rate" />
          </Form.Item>

          <Form.Item
            label="Home Department"
            name="home_department"
            rules={[
              { required: true, message: 'Please input your home department!' },
            ]}
          >
            <Input size="large" placeholder="Hourly Rate" />
          </Form.Item>

          <Form.Item label="Termination Date" name="termination_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={onTerminationDateChange}
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Termination Reason"
            name="termination_reason"
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea placeholder="maxLength is 200" />
          </Form.Item>
        </Col>

        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select Designation"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Original Hire Date" name="original_hire_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={onDateChange}
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Voluntary Termination"
            name="voluntary_termination"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select Designation"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Pay Frequency"
            name="pay_frequency"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select Frequency"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Hourly Rate2"
            name="hourly_rate2"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Hourly" />
          </Form.Item>

          <Form.Item
            label="Department Text"
            name="department_text"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder=" Hourly Rate" />
          </Form.Item>
        </Col>

        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Duty type"
            name="duty_type"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select Duty Type"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="1">Full Time</Option>
              <Option value="2">Part Time</Option>
              <Option value="3">Contractual</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Re Hire Date" name="re_hire_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={onReHireChange}
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Rate type"
            name="rate_type"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select Rate Type"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Rate"
            name="rate"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Rate" />
          </Form.Item>

          <Form.Item
            label="Hourly Rate3"
            name="hourly_rate3"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder=" Hourly Rate" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default PositionalInfo;
