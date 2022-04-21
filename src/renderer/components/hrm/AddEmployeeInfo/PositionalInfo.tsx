import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const PositionalInfo = ({ employeeInfo, setEmployeeInfo }: any) => {
  const handleChangeDivision = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, division: value });
  };

  const handleChangeDesignation = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, designation: value });
  };

  const handleChangeVoluntaryTermination = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, voluntary_termination: value });
  };

  const handleChangePayFrequency = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, pay_frequency: value });
  };

  const handleChangeDutyType = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, duty_type: value });
  };

  const handleChangeRateType = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, rate_type: value });
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
              onChange={handleChangeDivision}
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item label=" Hire Date" name="hire_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={(_date, dateString) =>
                setEmployeeInfo({ ...employeeInfo, hire_date: dateString })
              }
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Pay Frequency Text"
            name="pay_frequency_text"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.pay_frequency_text}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  pay_frequency_text: e.target.value,
                })
              }
              size="large"
              placeholder="Rate"
            />
          </Form.Item>

          <Form.Item
            label="Home Department"
            name="home_department"
            rules={[
              { required: true, message: 'Please input your home department!' },
            ]}
          >
            <Input
              value={employeeInfo.home_department}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  home_department: e.target.value,
                })
              }
              size="large"
              placeholder="Hourly Rate"
            />
          </Form.Item>

          <Form.Item label="Termination Date" name="termination_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={(_date, dateString) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  termination_date: dateString,
                })
              }
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Termination Reason"
            name="termination_reason"
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea
              value={employeeInfo.termination_reason}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  termination_reason: e.target.value,
                })
              }
              placeholder="maxLength is 200"
            />
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
              onChange={handleChangeDesignation}
            >
              <Option value="accounts">Accounts</Option>
              <Option value="sales man">Sales Man</Option>
              <Option value="kitchen manager">Kitchen Manager</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Original Hire Date" name="original_hire_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={(_date, dateString) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  original_hire_date: dateString,
                })
              }
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
              onChange={handleChangeVoluntaryTermination}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
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
              onChange={handleChangePayFrequency}
            >
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="annual">Annual</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Hourly Rate2"
            name="hourly_rate2"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              value={employeeInfo.hourly_rate2}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  hourly_rate2: e.target.value,
                })
              }
              size="large"
              placeholder="Hourly"
            />
          </Form.Item>

          <Form.Item
            label="Department Text"
            name="department_text"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.department_text}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  department_text: e.target.value,
                })
              }
              size="large"
              placeholder=" Hourly Rate"
            />
          </Form.Item>
        </Col>

        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Duty Type"
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
              onChange={handleChangeDutyType}
            >
              <Option value="full time">Full Time</Option>
              <Option value="part time">Part Time</Option>
              <Option value="contractual">Contractual</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Re Hire Date" name="re_hire_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              onChange={(_date, dateString) =>
                setEmployeeInfo({ ...employeeInfo, re_hire_date: dateString })
              }
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="Rate Type"
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
              onChange={handleChangeRateType}
            >
              <Option value="hourly">Hourly</Option>
              <Option value="salary">Salary</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Rate"
            name="rate"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.rate}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  rate: e.target.value,
                })
              }
              size="large"
              placeholder="Rate"
            />
          </Form.Item>

          <Form.Item
            label="Hourly Rate3"
            name="hourly_rate3"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.hourly_rate3}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  hourly_rate3: e.target.value,
                })
              }
              size="large"
              placeholder=" Hourly Rate"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default PositionalInfo;
