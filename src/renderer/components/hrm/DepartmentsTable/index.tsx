import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { Key, ReactNode, useEffect, useState } from 'react';

const { confirm } = Modal;

type DataType = {
  key: Key;
  sl_no: number;
  department_name: string;
};

type UpdateDepartmentType = {
  department_name?: string;
};
type DepartmentType = {
  name: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
  errors?: string[];
  warnings?: string[];
};

const DepartmentsTable = () => {
  const [form] = Form.useForm();

  const [isOpenDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [updateDepartmentData, setUpdateDepartmentData] =
    useState<UpdateDepartmentType>({});
  const [addDepartment, setAddDepartment] = useState<DepartmentType[]>([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setAddDepartment([
      {
        name: ['department_name'],
        value: updateDepartmentData?.department_name,
      },
    ]);
  }, [reRender]);

  const handleOpenModal = () => {
    form.resetFields();
    setOpenDepartmentModal(true);
  };

  const handleSubmit = (value: UpdateDepartmentType) => {
    console.log('value', value);

    // addNewDepartment.id = updateDepartmentData?.id;

    message.success({
      content: 'Department added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
    form.resetFields();
    setReRender((prevState) => !prevState);
    setOpenDepartmentModal(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns: any = [
    {
      title: 'SL No',
      dataIndex: 'sl_no',
      key: 'sl_no',
      width: '15%',
    },
    {
      title: 'Department Name',
      dataIndex: 'department_name',
      key: 'department_name',
      width: '70%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_text: string, record: DataType): ReactNode => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditDepartment(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteDepartment(record)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const designationData = [
    {
      key: 1,
      sl_no: 1,
      department_name: 'Sales Manager',
    },
    {
      key: 2,
      sl_no: 2,
      department_name: 'Senior Accountant',
    },
    {
      key: 3,
      sl_no: 3,
      department_name: 'Human Resource',
    },
  ];

  const handleEditDepartment = (data: DataType) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setOpenDepartmentModal(true);
    setUpdateDepartmentData(data);
  };

  const handleDeleteDepartment = (data: DataType) => {
    console.log('delete data', data);
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        message.success({
          content: 'Department deleted successfully',
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

  return (
    <div className="box_shadow">
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: '1.5rem', float: 'right' }}
      >
        <PlusCircleOutlined /> Add Designation
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={designationData}
        pagination={false}
      />

      <Modal
        title="Department Form"
        visible={isOpenDepartmentModal}
        onOk={() => setOpenDepartmentModal(false)}
        onCancel={() => setOpenDepartmentModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={addDepartment}
          onFieldsChange={(_, allFields: DepartmentType[]): void =>
            setAddDepartment(allFields)
          }
          autoComplete="off"
        >
          <Form.Item
            name="department_name"
            label="Department Name"
            rules={[{ required: true, message: 'Department Name is required' }]}
          >
            <Input size="large" placeholder="Department Name" />
          </Form.Item>

          <Space>
            <Button type="primary" danger onClick={handleReset}>
              Reset
            </Button>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentsTable;
