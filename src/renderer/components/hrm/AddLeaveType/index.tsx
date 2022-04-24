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
  InputNumber,
  message,
  Modal,
  Space,
  Table,
} from 'antd';
import { useEffect, useState } from 'react';

const { confirm } = Modal;

type DataTypes = {
  id: number;
  leave_type: string;
  total_leaves: number;
};

const AddLeaveType = () => {
  const [form] = Form.useForm();
  const [isOpenLeaveTypeModal, setOpenLeaveTypeModal] = useState(false);
  const [updateLeaveTypeInfo, setUpdateLeaveTypeInfo] = useState({});
  const [leaveTypeInfo, setLeaveTypeInfo] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setLeaveTypeInfo([
      {
        name: ['leave_type'],
        value: updateLeaveTypeInfo?.leave_type,
      },
      {
        name: ['total_leaves'],
        value: updateLeaveTypeInfo?.total_leaves,
      },
    ]);
  }, [reRender]);

  const columns: any = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Type Name',
      dataIndex: 'leave_type',
      key: 'leave_type',
      width: '35%',
    },
    {
      title: 'Total Leave Days',
      dataIndex: 'total_leaves',
      key: 'total_leaves',
      width: '35%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_text: string, record: DataTypes) => (
        <Space size={10}>
          <Button type="primary" onClick={() => updateLeaveType(record)}>
            <EditOutlined />
          </Button>

          <Button type="primary" danger onClick={() => deleteLeaveType(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      id: 1,
      leave_type: 'Sick',
      total_leaves: 2,
    },
    {
      key: 2,
      id: 2,
      leave_type: 'Annual',
      total_leaves: 5,
    },
  ];

  const handleOpenModal = () => {
    setOpenLeaveTypeModal(true);
    form.resetFields();
  };

  const updateLeaveType = (data: any) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setOpenLeaveTypeModal(true);
    setUpdateLeaveTypeInfo(data);
    form.resetFields();
  };

  const deleteLeaveType = (data: any) => {
    console.log('delete data', data);
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      okText: 'Yes',
      onOk() {
        message.success({
          content: 'Leave Type deleted successfully',
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

  const handleSubmit = (value: any) => {
    console.log('value', value);
    setReRender((prevState) => !prevState);
    setOpenLeaveTypeModal(false);

    form.resetFields();
  };

  const handleReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="box_shadow">
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ marginBottom: '1.5rem', float: 'right' }}
      >
        <PlusCircleOutlined /> Add Leave Type
      </Button>

      <Table bordered columns={columns} dataSource={data} pagination={false} />

      <Modal
        title="Add Leave Type"
        visible={isOpenLeaveTypeModal}
        onOk={() => setOpenLeaveTypeModal(false)}
        onCancel={() => setOpenLeaveTypeModal(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={leaveTypeInfo}
          onFieldsChange={(_, allFields) => setLeaveTypeInfo(allFields)}
          autoComplete="off"
        >
          <Form.Item
            name="leave_type"
            label="Leave Type"
            rules={[{ required: true, message: 'Leave Type is required' }]}
          >
            <Input size="large" placeholder="Leave Type" />
          </Form.Item>

          <Form.Item name="total_leaves" label="Number of Leave Days">
            <InputNumber
              min={1}
              size="large"
              placeholder="Number of Leave Days"
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

export default AddLeaveType;
