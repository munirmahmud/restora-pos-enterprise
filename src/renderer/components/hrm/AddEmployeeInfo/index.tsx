import { Button, Form, message, Steps } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useState } from 'react';
import './AddEmployeeInfo.style.scss';
import AdditionalAddress from './AdditionalAddress';
import BankInfo from './BankInfo';
import BasicInformation from './BasicInformation';
import Benefits from './Benefits';
import BiographicalInfo from './BiographicalInfo';
import Custom from './Custom';
import EmergencyContact from './EmergencyContact';
import PositionalInfo from './PositionalInfo';
import SalaryInfo from './SalaryInfo';
import Supervisor from './Supervisor';

const { Step } = Steps;

type EmployeeInfoTypes = {};

const AddEmployeeInfo = () => {
  const [current, setCurrent] = useState(0);
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfoTypes>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    attendance_time: '',
    employee_type: '',

    account_number: '',
    bank_name: '',
    bban_number: '',
    branch_name: '',

    basic_salary: '', // emp_salary
    house_rent: '', // emp_salary
    medical: '', // emp_salary
    others_allowance: '', // emp_salary
    gross_salary: '', // emp_salary
    tranport_allowance: '', // emp_salary

    division: '',
    hire_date: '',
    pay_frequency_text: '',
    home_department: '',
    termination_date: '',
    termination_reason: '',
    designation: '',
    original_hire_date: '',
    voluntary_termination: '',
    pay_frequency: '',
    hourly_rate2: '',
    department_text: '',
    duty_type: '',
    re_hire_date: '',
    rate_type: '',
    rate: '',
    hourly_rate3: '',

    benefit_class_code: '',
    benefit_accrual_date: '',
    benefit_description: '',
    benefit_status: '',

    supervisor_name: '',
    supervisor_report: '',
    is_supervisor: '',

    date_of_birth: '',
    eeo_class: '',
    work_in_state: '',
    gender: '',
    ethnic_group: '',
    live_in_state: '',
    marital_status: '',
    ssn: '',
    citizenship: '',
    pp_image: '',

    home_email: '',
    home_phone: '',
    cell_phone: '',
    business_email: '',
    business_phone: '',

    emergency_contact: '',
    emergency_work_phone: '',
    alter_emergency_contact: '',
    alt_emergency_work_phone: '',
    emergency_home_phone: '',
    emergency_contact_relation: '',
    alt_emergency_home_phone: '',
    custom_field_name: '',
    custom_value: '',
    custom_field_type: '',
  });

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <BasicInformation
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Bank Info',
      content: (
        <BankInfo
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Salary Info',
      content: (
        <SalaryInfo
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Positional Info',
      content: (
        <PositionalInfo
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Benefits',
      content: (
        <Benefits
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Supervisor',
      content: (
        <Supervisor
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Biography',
      content: (
        <BiographicalInfo
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Address',
      content: (
        <AdditionalAddress
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Contact',
      content: (
        <EmergencyContact
          employeeInfo={employeeInfo}
          setEmployeeInfo={setEmployeeInfo}
        />
      ),
    },
    {
      title: 'Custom',
      content: (
        <Custom employeeInfo={employeeInfo} setEmployeeInfo={setEmployeeInfo} />
      ),
    },
  ];

  const handleSubmit = () => {
    console.log('employeeInfo', employeeInfo);
    window.insert_employee.send('insert_employee', employeeInfo);

    message.success({
      content: 'Employee information added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="add_employee_wrapper">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
      >
        <Steps current={current}>
          {steps?.map((item) => (
            <Step key={item?.title} title={item?.title} />
          ))}
        </Steps>

        <div className="steps_content">{steps[current].content}</div>

        <div className="steps_action">
          {current > 0 && (
            <Button
              className="submit_btn"
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}

          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              className="submit_btn"
              // onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}

          {current < steps.length - 1 && (
            <Button
              className="submit_btn"
              type="primary"
              onClick={() => next()}
            >
              Next
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

getDataFromDatabase(
  'get_employee_designation_response',
  window.get_employee_designation
).then((response: any) => {
  console.log(response);
});

export default AddEmployeeInfo;
