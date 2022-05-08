import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

const { Option } = Select;

type DataType = {
  id: number;
  sl_no: number;
  table_name: string;
  capacity: number;
  icon: string;
};

const ManageTableLists = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    {
      title: 'SL NO',
      dataIndex: 'sl_no',
      key: 'sl_no',
      width: '7%',
    },
    {
      title: 'Table Name',
      dataIndex: 'table_name',
      key: 'table_name',
      width: '30%',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      width: '25%',
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_text: string, record: DataType): ReactNode => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditTable(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteTable(record)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      sl_no: 1,
      table_name: 'John Brown',
      capacity: 32,
      icon: '',
    },
    {
      sl_no: 2,
      table_name: 'Jim Green',
      capacity: 42,
      icon: '',
    },
    {
      sl_no: 3,
      table_name: 'Joe Black',
      capacity: 32,
      icon: '',
    },
  ];

  const handleEditTable = (data: DataType) => {
    console.log('Edit data', data);
  };
  const handleDeleteTable = (data: DataType) => {
    console.log('Delete data', data);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        margin: '0rem 1.5rem',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Space
        className="btn_group flex content_end"
        style={{ padding: '0.5rem' }}
      >
        <Button type="primary">
          <Link to="/manage_floor">
            <PlusCircleOutlined /> Add Floor
          </Link>
        </Button>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <PlusCircleOutlined /> Add Table
        </Button>
      </Space>

      <div className="table_lists" style={{ padding: '0.5rem' }}>
        <Table
          bordered
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.sl_no}
          pagination={false}
        />

        <Modal
          title="Add Table"
          visible={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          footer={null}
          width={500}
        >
          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="table_name"
              label="Table Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Add Table Name" />
            </Form.Item>

            <Form.Item name="capacity" label="Capacity">
              <Input placeholder="Add Capacity" />
            </Form.Item>

            <Form.Item name="select_floor" label="Floor Select">
              <Select placeholder="Select a option" allowClear>
                <Option value="1">Main Floor</Option>
                <Option value="2">VIP Floor</Option>
                <Option value="3">Hall Floor</Option>
              </Select>
            </Form.Item>

            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="primary" danger onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ManageTableLists;
