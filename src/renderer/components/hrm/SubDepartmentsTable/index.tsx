import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
} from 'antd';
import { Key, ReactNode, useEffect, useState } from 'react';

const { confirm } = Modal;
const { Option } = Select;

type DataType = {
  key: Key;
  sl_no: number;
  department_name: string;
};

type UpdateSubDepartmentType = {
  sub_department_name?: string;
  department_name?: string;
};
type SubDepartmentType = {
  name: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
  errors?: string[];
  warnings?: string[];
};

const SubDepartmentsTable = () => {
  const [form] = Form.useForm();

  const [isOpenSubDepartmentModal, setOpenSubDepartmentModal] = useState(false);
  const [updateSubDepartmentData, setUpdateSubDepartmentData] =
    useState<UpdateSubDepartmentType>({});
  const [addSubDepartment, setAddSubDepartment] = useState<SubDepartmentType[]>(
    []
  );
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setAddSubDepartment([
      {
        name: ['sub_department_name'],
        value: updateSubDepartmentData?.sub_department_name,
      },
      {
        name: ['department_name'],
        value: updateSubDepartmentData?.department_name,
      },
    ]);
  }, [reRender]);

  const handleOpenModal = () => {
    form.resetFields();
    setOpenSubDepartmentModal(true);
  };

  const onChange = (value: string) => {
    console.log('value', value);
  };

  const handleSubmit = (value: UpdateSubDepartmentType) => {
    console.log('value', value);

    // addNewDepartment.id = updateSubDepartmentData?.id;

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
    setOpenSubDepartmentModal(false);
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
          <Button
            type="primary"
            onClick={() => handleEditSubDepartment(record)}
          >
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteSubDepartment(record)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const subDepartmentData = [
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

  const handleEditSubDepartment = (data: DataType) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setOpenSubDepartmentModal(true);
    setUpdateSubDepartmentData(data);
  };

  const handleDeleteSubDepartment = (data: DataType) => {
    console.log('delete data', data);
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        message.success({
          content: 'Sub Department deleted successfully',
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
        <PlusCircleOutlined /> Add Sub Department
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={subDepartmentData}
        pagination={false}
        rowKey={(record) => record.key}
      />

      <Modal
        title="Department Form"
        visible={isOpenSubDepartmentModal}
        onOk={() => setOpenSubDepartmentModal(false)}
        onCancel={() => setOpenSubDepartmentModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={addSubDepartment}
          onFieldsChange={(_, allFields: SubDepartmentType[]): void =>
            setAddSubDepartment(allFields)
          }
          autoComplete="off"
        >
          <Form.Item
            name="sub_department_name"
            label="Sub Department Name"
            rules={[
              { required: true, message: 'Sub Department Name is required' },
            ]}
          >
            <Input size="large" placeholder="Sub Department Name" />
          </Form.Item>

          <Form.Item
            name="department_name"
            label="Department Name"
            rules={[{ required: true, message: 'Department Name is required' }]}
          >
            <Select
              showSearch
              placeholder="Select a department name"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="technical">Technical</Option>
              <Option value="marketing">Marketing</Option>
            </Select>
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

export default SubDepartmentsTable;
