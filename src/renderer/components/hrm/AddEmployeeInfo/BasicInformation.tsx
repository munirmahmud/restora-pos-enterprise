import { Col, Form, Input, Row, Select } from 'antd';
import countryData from '../../../../static/country.json';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const BasicInformation = ({ employeeInfo, setEmployeeInfo }) => {
  const handleChangeState = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, state: value });
  };

  const handleChangeCountry = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, country: value });
  };

  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              value={employeeInfo.first_name}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, first_name: e.target.value })
              }
              size="large"
              placeholder="first name"
            />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email_address"
            rules={[
              { required: true, message: 'Please input your email address!' },
            ]}
          >
            <Input
              value={employeeInfo.email_address}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  email_address: e.target.value,
                })
              }
              size="large"
              placeholder="your email address"
            />
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
              onChange={handleChangeCountry}
            >
              <Option value="Bangladesh">Bangladesh</Option>
              {countryData.country?.map((countryName) => (
                <Option value={countryName?.name}>{countryName?.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <Input
              value={employeeInfo.city}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, city: e.target.value })
              }
              size="large"
              placeholder="city"
            />
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
            <Input
              value={employeeInfo.last_name}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, last_name: e.target.value })
              }
              size="large"
              placeholder="last Name"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input
              value={employeeInfo.phone}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, phone: e.target.value })
              }
              size="large"
              placeholder="your phone number"
            />
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
              onChange={handleChangeState}
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
            <Input
              value={employeeInfo.zip_code}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, zip_code: e.target.value })
              }
              size="large"
              placeholder="your zip code"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformation;
