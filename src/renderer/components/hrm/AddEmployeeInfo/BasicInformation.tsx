import { Col, Form, Input, Row, Select } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const BasicInformation = () => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="first name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email_address"
            rules={[
              { required: true, message: 'Please input your email address!' },
            ]}
          >
            <Input size="large" placeholder="your email address" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select country"
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
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <Input size="large" placeholder="city" />
          </Form.Item>
        </Col>

        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input size="large" placeholder="last Name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input size="large" placeholder="your phone number" />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: 'Please input your state!' }]}
          >
            <Select
              showSearch
              placeholder="Select state"
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
            label="Zip Code "
            name="zip_code"
            rules={[{ required: true, message: 'Please input your zip code!' }]}
          >
            <Input size="large" placeholder="your zip code" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformation;
