import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { Key, ReactNode, useEffect, useState } from 'react';

const { confirm } = Modal;

type DataType = {
  id: number;
  key: Key;
  sl_no: number;
  department_name: string;
};

type UpdateDepartmentType = {
  id: number;
  department_name: string;
};
type DepartmentType = {
  name: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
  errors?: string[];
  warnings?: string[];
};

const Department = () => {
  window.fetch_department.send('fetch_department', {
    status: true,
    department_name: '',
  });

  const [form] = Form.useForm();

  const [isOpenDepartmentModal, setOpenDepartmentModal] = useState(false);
  const [updateDepartmentData, setUpdateDepartmentData] =
    useState<UpdateDepartmentType>({
      id: null,
      department_name: '',
    });
  const [addDepartment, setDepartment] = useState<DepartmentType[]>([]);
  const [departMentList, setDepartMentList] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setDepartment([
      {
        name: ['department_name'],
        value: updateDepartmentData?.department_name,
      },
    ]);
  }, [reRender]);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_department_response',
      window.fetch_department
    ).then((response: any) => {
      console.log('response', response);

      setDepartMentList(response);
    });
  }, [reRender]);

  const handleOpenModal = () => {
    form.resetFields();
    setOpenDepartmentModal(true);
  };

  const handleSubmit = (values: UpdateDepartmentType) => {
    if (updateDepartmentData.id) {
      window.insert_department.send('insert_department', {
        id: updateDepartmentData.id,
        ...values,
      });

      message.success({
        content: 'Department updated successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });

      form.resetFields();
      setReRender((render) => !render);
      setOpenDepartmentModal(false);

      return;
    }

    window.insert_department.send('insert_department', values);

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
    setReRender((render) => !render);
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
      dataIndex: 'id',
      key: 'id',
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

  const handleEditDepartment = (data: DataType) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setOpenDepartmentModal(true);
    setUpdateDepartmentData(data);
  };

  const handleDeleteDepartment = (data: DataType) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the yes button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_department.send('delete_department', {
          id: data.id,
        });

        window.delete_department.once(
          'delete_department_response',
          ({ status }: { status: boolean }) => {
            if (status) {
              // Rerender the component
              setReRender((prevState) => !prevState);

              message.success({
                content: 'Designation deleted successfully',
                className: 'custom-class',
                duration: 1,
                style: {
                  marginTop: '5vh',
                  float: 'right',
                },
              });
            }
          }
        );
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
        <PlusCircleOutlined /> Add Department
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={departMentList}
        rowKey={(record) => record.id}
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
            setDepartment(allFields)
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

export default Department;
