import { Button, Form, message, Steps } from 'antd';
import { useState } from 'react';
import './AddEmployeeInfo.style.scss';
import AdditionalAddress from './AdditionalAddress';
import BasicInformation from './BasicInformation';
import Benefits from './Benefits';
import BiographicalInfo from './BiographicalInfo';
import Custom from './Custom';
import EmergencyContact from './EmergencyContact';
import PositionalInfo from './PositionalInfo';
import Supervisor from './Supervisor';

const { Step } = Steps;

const steps = [
  {
    title: 'Basic Information',
    content: <BasicInformation />,
  },
  {
    title: 'Positional Info',
    content: <PositionalInfo />,
  },
  {
    title: 'Benefits',
    content: <Benefits />,
  },
  {
    title: 'Supervisor',
    content: <Supervisor />,
  },
  {
    title: 'Biographical Info',
    content: <BiographicalInfo />,
  },
  {
    title: 'Additional Address',
    content: <AdditionalAddress />,
  },
  {
    title: 'Emergency Contact',
    content: <EmergencyContact />,
  },
  {
    title: 'Custom',
    content: <Custom />,
  },
];

const AddEmployeeInfo = () => {
  const [current, setCurrent] = useState(0);

  const handleSubmit = (values: any) => {
    console.log('Success:', values);
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
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
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
              onClick={() => message.success('Processing complete!')}
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

export default AddEmployeeInfo;
