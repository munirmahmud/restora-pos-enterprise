import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { useState } from 'react';
import employeeImg from '../../../../../assets/default.jpg';
import EmployeeDetails from './EmployeeDetails';

const ManageEmployeeTable = () => {
  const columns = [
    { title: 'SL NO', dataIndex: 'sl_no', key: 'sl_no' },
    {
      title: 'Photograph',
      dataIndex: 'Photograph',
      key: 'Photograph',
      align: 'center',
      render: () => (
        <img
          src={employeeImg}
          alt="employeeImg"
          style={{ width: '50px', height: '50px' }}
        />
      ),
    },
    { title: 'First name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Email address',
      dataIndex: 'email_address',
      key: 'email_address',
    },
    { title: 'Division', dataIndex: 'division', key: 'division' },
    { title: 'Duty type', dataIndex: 'duty_type', key: 'duty_type' },
    { title: 'Hire date', dataIndex: 'hire_date', key: 'hire_date' },
    {
      title: 'Original Hire date',
      dataIndex: 'original_hire_date',
      key: 'original_hire_date',
    },
    {
      title: 'Termination date',
      dataIndex: 'termination_date',
      key: 'termination_date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_text, record) => (
        <Space size={10}>
          <Button
            type="primary"
            onClick={() => updateManageEmployeeInfo(record)}
          >
            <EditOutlined />
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => deleteManageEmployeeInfo(record)}
          >
            <DeleteOutlined />
          </Button>

          <Button type="primary" onClick={() => handleShowEmployeeInfo(record)}>
            <UserOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      sl_no: 1,
      first_name: 'john',
      last_name: 'brown',
      designation: 'react developer',
      phone: '58439579845',
      email_address: 'jhon@jhon.com',
      division: 'Khulna',
      duty_type: 'Full Time',
      hire_date: '2022-04-20',
      original_hire_date: '2022-04-20',
      termination_date: '2022-04-20',
    },
    {
      key: 2,
      sl_no: 2,
      first_name: 'john',
      last_name: 'brown',
      designation: 'react developer',
      phone: '58439579845',
      email_address: 'jhon@jhon.com',
      division: 'Dhaka',
      duty_type: 'Part Time',
      hire_date: '2022-04-15',
      original_hire_date: '2022-04-15',
      termination_date: '2022-04-15',
    },
  ];

  const updateManageEmployeeInfo = (data: any) => {
    console.log('edit data', data);
  };

  const deleteManageEmployeeInfo = (data: any) => {
    console.log('delete data', data);
  };

  const [isOpenEmployeeInfoModal, setIsOpenEmployeeInfoModal] = useState(false);
  const [manageEmployeeInfo, setManageEmployeeInfo] = useState({});

  const handleShowEmployeeInfo = (data: any) => {
    console.log('show data', data);
    setManageEmployeeInfo(data);
    setIsOpenEmployeeInfoModal(true);
  };

  return (
    <div className="box_shadow">
      <Table bordered columns={columns} dataSource={data} pagination={false} />

      <EmployeeDetails
        isOpenEmployeeInfoModal={isOpenEmployeeInfoModal}
        setIsOpenEmployeeInfoModal={setIsOpenEmployeeInfoModal}
      />
    </div>
  );
};

export default ManageEmployeeTable;
