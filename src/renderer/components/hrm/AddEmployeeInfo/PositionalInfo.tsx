import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  getDataFromDatabase,
  getErrorNotification,
} from './../../../../helpers';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const PositionalInfo = ({ employeeInfo, setEmployeeInfo }: any) => {
  window.get_employee_designation.send('get_employee_designation', {
    status: true,
  });
  window.fetch_department.send('fetch_department', {
    status: true,
  });

  const [designationList, setDesignationList] = useState([]);
  const [departMentList, setDepartMentList] = useState([]);

  useEffect(() => {
    getDataFromDatabase(
      'get_employee_designation_response',
      window.get_employee_designation
    ).then((response: any) => {
      setDesignationList(response);
    });

    getDataFromDatabase(
      'fetch_department_response',
      window.fetch_department
    ).then((response: any) => setDepartMentList(response));
  }, []);

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

  if (!employeeInfo.basic_salary) {
    // Salary Info Form
    getErrorNotification('Basic salary amount is required.');
  } else if (!employeeInfo.gross_salary) {
    getErrorNotification('Gross salary amount is required.');
  } else if (employeeInfo.basic_salary > employeeInfo.gross_salary) {
    getErrorNotification('Gross salary should not be less than basic salary.');
  }

  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Department"
            name="department_name"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              showSearch
              placeholder="Select a Department"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeDivision}
            >
              {departMentList.map((departmentName) => (
                <Option key={departmentName?.id} value={departmentName?.id}>
                  {departmentName?.department_name}
                </Option>
              ))}
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
              {designationList.map((designationName) => (
                <Option key={designationName?.id} value={designationName?.id}>
                  {designationName?.designation}
                </Option>
              ))}
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
              <Option value="1">Weekly</Option>
              <Option value="2">Monthly</Option>
              <Option value="3">Annual</Option>
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
              <Option value="1">Full Time</Option>
              <Option value="2">Part Time</Option>
              <Option value="3">Contractual</Option>
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
              <Option value="1">Hourly</Option>
              <Option value="2">Salary</Option>
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
