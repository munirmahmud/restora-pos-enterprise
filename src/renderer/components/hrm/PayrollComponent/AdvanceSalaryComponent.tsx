import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
} from 'antd';
import { getDataFromDatabase } from 'helpers';
import moment from 'moment';
import { Key, ReactNode, useEffect, useState } from 'react';

const { confirm } = Modal;
const dateFormat = 'MM-YYYY';

type DataType = {
  id: number;
  key: Key;
  sl_no: number;
  employee_id: number;
  req_amount: number;
  release_amount: number;
  salary_month: string;
  created_at: string;
};

type UpdateDepartmentType = {
  id: number;
  employee_id: number;
  name: string;
  req_amount: number;
  release_amount: number;
  salary_month: string;
  created_at: string;
};
type DepartmentType = {
  name: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
  errors?: string[];
  warnings?: string[];
};

const AdvanceSalaryComponent = () => {
  window.fetch_salary_advance.send('fetch_salary_advance', { status: true });

  const [form] = Form.useForm();

  const [isToggleModal, setToggleModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState<UpdateDepartmentType>({
    id: null,
    name: '',
    employee_id: null,
    req_amount: 0,
    release_amount: 0,
    salary_month: '',
    created_at: '',
  });
  const [salaryAdvance, setSalaryAdvance] = useState<DepartmentType[]>([]);
  const [salaryAdvanceList, setSalaryAdvanceList] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setSalaryAdvance([
      {
        name: ['name'],
        value: updateFormData?.name,
      },
      {
        name: ['req_amount'],
        value: updateFormData?.req_amount,
      },
      {
        name: ['release_amount'],
        value: updateFormData?.release_amount,
      },
      {
        name: ['salary_month'],
        value: updateFormData?.salary_month,
      },
      {
        name: ['created_at'],
        value: updateFormData?.created_at,
      },
    ]);
  }, [reRender]);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_salary_advance_response',
      window.fetch_salary_advance
    ).then((response: any) => {
      console.log('response', response);

      setSalaryAdvanceList(
        response.map((item: UpdateDepartmentType) => ({
          ...item,
          release_amount:
            item.release_amount === null ? 0 : item.release_amount,
          salary_month: moment(parseInt(item.salary_month)).format('MMM YYYY'),
          created_at: moment(item.created_at).format('ddd MMM YYYY'),
        }))
      );
    });
  }, [reRender]);

  const handleOpenModal = () => {
    form.resetFields();
    setToggleModal(true);
  };

  const handleSubmit = (values: UpdateDepartmentType) => {
    const data = {
      employee_id: values.employee_id,
      req_amount: values.req_amount,
      salary_month: +moment(values.salary_month),
    };

    if (updateFormData.id) {
      window.insert_department.send('insert_salary_advance', {
        id: updateFormData.id,
        ...data,
      });

      message.success({
        content: 'Salary advance updated successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });

      form.resetFields();
      setReRender((render) => !render);
      setToggleModal(false);

      return;
    }

    window.insert_salary_advance.send('insert_salary_advance', data);

    message.success({
      content: 'Salary advance added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });

    form.resetFields();
    setReRender((render) => !render);
    setToggleModal(false);
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
      width: '6%',
    },
    {
      title: 'Employee Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Requested Amount',
      dataIndex: 'req_amount',
      key: 'req_amount',
      width: '15%',
    },
    {
      title: 'Release Amount',
      dataIndex: 'release_amount',
      key: 'release_amount',
      width: '15%',
    },
    {
      title: 'Salary Month',
      dataIndex: 'salary_month',
      key: 'salary_month',
      width: '20%',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '20%',
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
    setToggleModal(true);
    setUpdateFormData(data);
  };

  const handleDeleteDepartment = (data: DataType) => {
    console.log(data);

    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the yes button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_salary_advance.send('delete_salary_advance', {
          id: data.id,
        });

        window.delete_salary_advance.once(
          'delete_salary_advance_response',
          ({ status }: { status: boolean }) => {
            if (status) {
              // Rerender the component
              setReRender((render) => !render);

              message.success({
                content: 'Salary advance deleted successfully',
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

  const employNames = [
    { id: 1, name: 'Munir' },
    { id: 2, name: 'Mahmud' },
    { id: 3, name: 'Bahadur' },
  ];

  return (
    <div className="box_shadow">
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: '1.5rem', float: 'right' }}
      >
        <PlusCircleOutlined /> Advance Salary
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={salaryAdvanceList}
        rowKey={(record) => record.id}
        pagination={false}
      />

      <Modal
        title="Salary Advance"
        visible={isToggleModal}
        onOk={() => setToggleModal(false)}
        onCancel={() => setToggleModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={salaryAdvance}
          onFieldsChange={(_, allFields: DepartmentType[]): void =>
            setSalaryAdvance(allFields)
          }
          autoComplete="off"
        >
          <Form.Item
            name="employee_id"
            label="Employee Name"
            rules={[{ required: true, message: 'Employee name is required' }]}
          >
            <Select
              placeholder="Select an employee name"
              allowClear
              size="large"
            >
              {employNames.map((employee) => (
                <Select.Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="req_amount"
            label="Amount"
            rules={[{ required: true, message: 'Amount is required' }]}
          >
            <Input size="large" placeholder="$20000" />
          </Form.Item>

          <Form.Item
            name="salary_month"
            label="Salary Month"
            rules={[{ required: true, message: 'Month is required' }]}
          >
            <DatePicker
              defaultValue={moment(new Date(), dateFormat)}
              format={dateFormat}
              picker="month"
              size="large"
              style={{ width: '100%' }}
            />
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

export default AdvanceSalaryComponent;
