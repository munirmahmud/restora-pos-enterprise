import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Space, Table } from 'antd';
import { useState } from 'react';
import employeeImg from '../../../../../assets/default.jpg';
import EmployeeDetails from './EmployeeDetails';

const { confirm } = Modal;

type DataTypes = {
  key: number;
  sl_no: string;
  first_name: string;
  last_name: string;
  designation: string;
  phone: number;
  email_address: string;
  division: string;
  duty_type: string;
  hire_date: string;
  original_hire_date: string;
  termination_date: string;
};

const ManageEmployeeTable = () => {
  const [isOpenEmployeeInfoModal, setIsOpenEmployeeInfoModal] = useState(false);
  const [manageEmployeeInfo, setManageEmployeeInfo] = useState({});

  const columns: any = [
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
      render: (_text: string, record: DataTypes) => (
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
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        message.success({
          content: 'Category deleted successfully',
          className: 'custom-class',
          duration: 1,
          style: {
            marginTop: '5vh',
            float: 'right',
          },
        });
      },
      onCancel() {},
    });
  };

  const handleShowEmployeeInfo = (data: any) => {
    console.log('show data', data);
    setManageEmployeeInfo(data);
    setIsOpenEmployeeInfoModal(true);
  };

  return (
    <div className="box_shadow">
      <Table bordered columns={columns} dataSource={data} pagination={false} />

      <EmployeeDetails
        manageEmployeeInfo={manageEmployeeInfo}
        isOpenEmployeeInfoModal={isOpenEmployeeInfoModal}
        setIsOpenEmployeeInfoModal={setIsOpenEmployeeInfoModal}
      />
    </div>
  );
};

export default ManageEmployeeTable;
