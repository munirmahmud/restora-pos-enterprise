import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type DataType = {
  id: number;
  sl_no: number;
  table_name: string;
  capacity: number;
  icon: string;
};

const ManageFloorLists = () => {
  const [form] = Form.useForm();

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
          <Button type="primary" onClick={() => handleEditFloor(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteFloor(record)}
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

  const handleEditFloor = (data: DataType) => {
    console.log('Edit data', data);
  };

  const handleDeleteFloor = (data: DataType) => {
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
          <Link to="/manage_table">Table List</Link>
        </Button>
      </Space>

      <div className="floor_lists" style={{ padding: '0.5rem' }}>
        <div className="add_floor" style={{ padding: '1rem 0rem' }}>
          <Row>
            <Col lg={12} push={6}>
              <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="floor_name"
                  label="Floor Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Add Table Name" />
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
            </Col>
          </Row>
        </div>

        <Table
          bordered
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.sl_no}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ManageFloorLists;
