import { Button, Form, Steps } from 'antd';
import { getErrorNotification, getSuccessNotification } from 'helpers';
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

type EmployeeInfoTypes = {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  attendance_time?: string;
  employee_type?: string;
  country?: string;

  account_number: number;
  bank_name: string;
  bban_number: string;
  branch_name: string;

  basic_salary: number;
  house_rent?: number;
  medical?: number;
  others_allowance?: number;
  gross_salary: number;
  tranport_allowance?: number;

  division: string;
  hire_date?: string;
  pay_frequency_text: string;
  home_department: string;
  termination_date?: string;
  termination_reason: string;
  designation: string;
  original_hire_date?: string;
  voluntary_termination: string;
  pay_frequency: string;
  hourly_rate2: string;
  department_text: string;
  duty_type: string;
  re_hire_date?: string;
  rate_type: string;
  rate: string;
  hourly_rate3: string;

  benefit_class_code?: string;
  benefit_accrual_date?: string;
  benefit_description?: string;
  benefit_status?: string;

  supervisor_name?: string;
  supervisor_report?: string;
  is_supervisor?: string;

  date_of_birth: string;
  eeo_class?: string;
  work_in_state?: string;
  gender: string;
  ethnic_group?: string;
  live_in_state?: string;
  marital_status?: string;
  ssn?: string;
  citizenship?: string;
  pp_image?: string;

  home_email?: string;
  home_phone?: string;
  cell_phone: string;
  business_email?: string;
  business_phone?: string;

  emergency_contact: number;
  emergency_work_phone: number;
  alter_emergency_contact?: number;
  alt_emergency_work_phone?: number;
  emergency_home_phone: number;
  emergency_contact_relation?: string;
  alt_emergency_home_phone?: string;

  custom_field_name?: string;
  custom_value?: string;
  custom_field_type?: string;
};

window.send_status_to_create_table.send('send_status_to_create_table', {
  status: true,
});

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

    account_number: 0,
    bank_name: '',
    bban_number: '',
    branch_name: '',

    basic_salary: 0, // emp_salary
    house_rent: 0, // emp_salary
    medical: 0, // emp_salary
    others_allowance: 0, // emp_salary
    gross_salary: 0, // emp_salary
    tranport_allowance: 0, // emp_salary

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
    window.insert_employee.send('insert_employee', employeeInfo);

    getSuccessNotification('Employee information added successfully');
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

  const handleNextForm = () => {
    console.log('employeeInfo 111', employeeInfo);

    // Basic info form
    if (!employeeInfo.first_name) {
      getErrorNotification('First name is required.');
      return;
    } else if (!employeeInfo.email) {
      getErrorNotification('Email is required.');
      return;
    } else if (!employeeInfo.phone) {
      getErrorNotification('Phone number is required.');
      return;
    }

    next();

    if (!employeeInfo.basic_salary) {
      // Salary Info Form
      getErrorNotification('Basic salary amount is required.');
      return;
    } else if (!employeeInfo.gross_salary) {
      getErrorNotification('Gross salary amount is required.');
      return;
    } else if (employeeInfo.basic_salary > employeeInfo.gross_salary) {
      getErrorNotification(
        'Gross salary should not be less than basic salary.'
      );
      return;
    }

    next();

    // Go to the next form
    if (employeeInfo.basic_salary && employeeInfo.gross_salary) {
      next();
      return;
    }

    // Positional Info form
    if (!employeeInfo.division) {
      getErrorNotification('Department is required.');
      return;
    } else if (!employeeInfo.pay_frequency_text) {
      getErrorNotification('Pay freequency text is required.');
      return;
    } else if (!employeeInfo.home_department) {
      getErrorNotification('Home department is required.');
      return;
    } else if (!employeeInfo.termination_reason) {
      getErrorNotification('Termination reason is required.');
      return;
    } else if (!employeeInfo.designation) {
      getErrorNotification('Designation is required.');
      return;
    } else if (!employeeInfo.voluntary_termination) {
      getErrorNotification('Voluntary termination is required.');
      return;
    } else if (!employeeInfo.pay_frequency) {
      getErrorNotification('Pay frequency is required.');
      return;
    } else if (!employeeInfo.hourly_rate2) {
      getErrorNotification('Hourly rate 2  is required.');
      return;
    } else if (!employeeInfo.department_text) {
      getErrorNotification('Department text  is required.');
      return;
    } else if (!employeeInfo.duty_type) {
      getErrorNotification('Duty type is required.');
      return;
    } else if (!employeeInfo.rate_type) {
      getErrorNotification('Rate type is required.');
      return;
    } else if (!employeeInfo.rate) {
      getErrorNotification('Rate is required.');
      return;
    } else if (!employeeInfo.hourly_rate3) {
      getErrorNotification('Hourly rate 3 is required.');
      return;
    }
    console.log('employeeInfo.designation', employeeInfo.designation);

    // Go to the next form
    next();

    // Biography
    if (!employeeInfo.date_of_birth) {
      getErrorNotification('Date of birth is required.');
      return;
    } else if (!employeeInfo.gender) {
      getErrorNotification('Gender is required.');
      return;
    }

    // Go to the next form
    next();

    // Address
    if (!employeeInfo.cell_phone) {
      getErrorNotification('Cell phone is required.');
      return;
    }

    // Go to the next form
    next();

    // Contact
    if (!employeeInfo.emergency_contact) {
      getErrorNotification('Emergency contact is required.');
      return;
    } else if (!employeeInfo.emergency_work_phone) {
      getErrorNotification('Emergency work phone is required.');
      return;
    } else if (!employeeInfo.emergency_home_phone) {
      getErrorNotification('Emergency home phone is required.');
      return;
    }
  };

  return (
    <div className="add_employee_wrapper">
      <Form
        // name="basic"
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
              // className="submit_btn"
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
              // className="submit_btn"
              // onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}

          {current < steps.length - 1 && (
            <Button
              // className="submit_btn"
              type="primary"
              onClick={() => handleNextForm()}
            >
              Next
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

window.insert_employee.once('insert_employee_response', (arg) => {
  console.log(arg);
});

export default AddEmployeeInfo;
