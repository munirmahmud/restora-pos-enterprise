import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
  Typography,
} from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const FoodAvailabilityList = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState('');
  const [foodName, setFoodName] = useState('');
  const [availableDay, setAvailableDay] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Food Name',
      dataIndex: 'foodName',
      key: 'foodName',
      width: '30%',
    },
    {
      title: 'Available Day',
      dataIndex: 'availableDay',
      width: '35%',
      key: 'availableDay',
    },
    {
      title: 'Available Time',
      dataIndex: 'availableTime',
      width: '25%',
      key: 'availableTime',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditCategory(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteCategory(record)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      foodName: 'Chicken Fry',
      availableDay: 'Saturday',
      availableTime: '00:00:00 - 00:00:00',
    },
    {
      key: 2,
      foodName: 'Burger',
      availableDay: 'Monday',
      availableTime: '00:00:00 - 00:00:00',
    },
  ];

  function handleEditCategory(record) {
    setOpenModal(true);
    console.log('Edit', record);
  }

  function handleDeleteCategory(record) {
    console.log('Delete', record);
    message.success({
      content: 'Foods category added successfully ',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
  }

  const changeFoodName = (foodName) => {
    console.log('status', foodName);
    setFoodName(foodName);
  };

  const changeAvailableDay = (availableDay) => {
    console.log('status', availableDay);
    setFoodName(availableDay);
  };

  const handleChangeStatus = (value) => {
    console.log('status', value);
    setStatus(value);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div
        style={{
          margin: '0rem 1.5rem',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className="d-flex justify-content_end mb-3">
          <Button
            type="primary"
            className="bulk_upload_btn"
            onClick={() => setOpenModal(true)}
          >
            <PlusCircleOutlined />
            Add Available Day & Time
          </Button>
        </div>

        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={data}
          pagination={false}
          rowKey={(record) => record.key}
        />
      </div>

      <Modal
        title="Add Available Day & Time"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            <Form
              form={form}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="foodName"
                label="Food Name"
                rules={[
                  { required: true, message: 'Please input your food name!' },
                ]}
              >
                <Select
                  placeholder="Select Option"
                  size="large"
                  onChange={changeFoodName}
                  value={foodName}
                  allowClear
                >
                  <Option value="pizza">Pizza</Option>
                  <Option value="dosa">Dhosa</Option>
                  <Option value="frenchFries">French Fries</Option>
                  <Option value="chickenKebab">Chicken Kebab</Option>
                  <Option value="burger">Burger</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="availableDay"
                label="Available Day"
                rules={[
                  {
                    required: true,
                    message: 'Please input your available day!',
                  },
                ]}
                tooltip={{
                  title: 'Use day name Like: Saturday, Sunday, ......',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Select Option"
                  size="large"
                  onChange={changeAvailableDay}
                  value={availableDay}
                  allowClear
                >
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                </Select>
              </Form.Item>

              <div className="d-flex">
                <Form.Item
                  label="From Time"
                  name="fromTime"
                  rules={[
                    { required: true, message: 'Please input your from time!' },
                  ]}
                >
                  <TimePicker placeholder="From Time" size="large" />
                </Form.Item>

                <Form.Item
                  label="To Time"
                  name="toTime"
                  style={{ marginLeft: 'auto' }}
                  rules={[
                    { required: true, message: 'Please input your to time!' },
                  ]}
                >
                  <TimePicker placeholder="To Time" size="large" />
                </Form.Item>
              </div>

              <Form.Item name="status" label="Status">
                <Select
                  placeholder="Select an Option"
                  value={status}
                  onChange={handleChangeStatus}
                  size="large"
                  allowClear
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="danger"
                  style={{
                    marginRight: '1rem',
                  }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default FoodAvailabilityList;
