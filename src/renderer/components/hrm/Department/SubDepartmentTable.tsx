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
import { getDataFromDatabase } from 'helpers';
import { Key, ReactNode, useEffect, useState } from 'react';

const { confirm } = Modal;
const { Option } = Select;

type DataType = {
  key: Key;
  id: number;
  department_name: string;
};

type UpdateSubDepartmentType = {
  sub_department_name?: string;
  department_id?: number;
  id?: number;
};
type SubDepartmentType = {
  name: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
  errors?: string[];
  warnings?: string[];
};

type DepartmentType = {
  id: number;
  department_name: string;
};

const SubDepartmentsTable = () => {
  window.fetch_department.send('fetch_department', { status: true });
  window.fetch_sub_department.send('fetch_sub_department', { status: true });

  const [form] = Form.useForm();

  const [isOpenSubDepartmentModal, setOpenSubDepartmentModal] = useState(false);
  const [updateSubDepartmentData, setUpdateSubDepartmentData] =
    useState<UpdateSubDepartmentType>({});
  const [addSubDepartment, setAddSubDepartment] = useState<SubDepartmentType[]>(
    []
  );
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [subDepartments, setSubDepartments] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_sub_department_response',
      window.fetch_sub_department
    ).then((response) => setSubDepartments(response));

    setAddSubDepartment([
      {
        name: ['sub_department_name'],
        value: updateSubDepartmentData?.sub_department_name,
      },
      {
        name: ['department_id'],
        value: updateSubDepartmentData?.department_id,
      },
    ]);
  }, [reRender]);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_department_response',
      window.fetch_department
    ).then((response) =>
      setDepartments(
        response.map((item: UpdateSubDepartmentType, i: number) => ({
          id: i + 1,
          ...item,
        }))
      )
    );
  }, []);

  const handleOpenModal = () => {
    form.resetFields();
    setOpenSubDepartmentModal(true);
  };

  const onChange = (value: string) => {
    console.log('onchange value', value);
  };

  console.log('updateSubDepartmentData', updateSubDepartmentData);

  const handleSubmit = (values: UpdateSubDepartmentType) => {
    console.log('values', values);

    // addNewDepartment.id = updateSubDepartmentData?.id;
    if (updateSubDepartmentData?.id) {
      console.log('hi', {
        id: updateSubDepartmentData.id,
        ...values,
      });

      window.insert_sub_department.send('insert_sub_department', {
        id: updateSubDepartmentData.id,
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
      setReRender((prevState) => !prevState);
      setOpenSubDepartmentModal(false);

      return;
    }
    const data = {
      department_id: values.department_id,
      sub_department_name: values.sub_department_name,
    };
    window.insert_sub_department.send('insert_sub_department', data);

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
      dataIndex: 'id',
      key: 'id',
      width: '15%',
    },
    {
      title: 'Sub department Name',
      dataIndex: 'sub_department_name',
      key: 'sub_department_name',
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
        'If you click on the yes button, the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_sub_department.send('delete_sub_department', {
          id: data.id,
        });

        window.delete_sub_department.once(
          'delete_sub_department_response',
          ({ status }: { status: boolean }) => {
            if (status) {
              // Rerender the component
              setReRender((render) => !render);

              message.success({
                content: 'Sub department deleted successfully',
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
        <PlusCircleOutlined /> Add Sub Department
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={subDepartments}
        pagination={false}
        rowKey={(record) => record.id}
      />

      <Modal
        title="Department Form"
        visible={isOpenSubDepartmentModal}
        onOk={() => setOpenSubDepartmentModal(false)}
        onCancel={() => setOpenSubDepartmentModal(false)}
        footer={null}
        okText="Yes"
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
            name="department_id"
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
              {departments.map((department) => (
                <Option key={department.id} value={department.id}>
                  {department.department_name}
                </Option>
              ))}
              {/* <Option value="marketing">Marketing</Option> */}
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
