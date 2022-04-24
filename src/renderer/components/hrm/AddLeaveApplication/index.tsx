import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;

type DataTypes = {
  id: number;
  leave_type: string;
  total_leaves: number;
};

const AddLeaveApplication = () => {
  const today = new Date();
  const format = 'YYYY-MM-DD';
  const [form] = Form.useForm();

  const [isToggleModal, setToggleModal] = useState(false);
  const [updateLeaveApplicationInfo, setUpdateLeaveApplicationInfo] = useState(
    {}
  );
  const [leaveApplicationInfo, setLeaveApplicationInfo] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setLeaveApplicationInfo([
      {
        name: ['name'],
        value: updateLeaveApplicationInfo?.name,
      },
      {
        name: ['leave_type'],
        value: updateLeaveApplicationInfo?.leave_type,
      },
      {
        name: ['application_start_date'],
        // value: updateLeaveApplicationInfo?.application_start_date,
      },
      {
        name: ['application_end_date'],
        // value: updateLeaveApplicationInfo?.application_end_date,
      },
      {
        name: ['approve_start_date'],
        // value: updateLeaveApplicationInfo?.approve_start_date,
      },
      {
        name: ['approve_end_date'],
        // value: updateLeaveApplicationInfo?.approve_end_date,
      },
      {
        name: ['apply_day'],
        value: updateLeaveApplicationInfo?.apply_day,
      },
      {
        name: ['application_hard_copy'],
        // value: updateLeaveApplicationInfo?.application_hard_copy,
      },
      {
        name: ['approved_day'],
        value: updateLeaveApplicationInfo?.approved_day,
      },
      {
        name: ['approved_by'],
        value: updateLeaveApplicationInfo?.approved_by,
      },
      {
        name: ['reason'],
        value: updateLeaveApplicationInfo?.reason,
      },
    ]);
  }, [reRender]);

  const columns: any = [
    { title: 'SL NO', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leave_type',
      key: 'leave_type',
    },
    {
      title: 'Application Start Date',
      dataIndex: 'application_start_date',
      key: 'application_start_date',
    },
    {
      title: 'Application End Date',
      dataIndex: 'application_end_date',
      key: 'application_end_date',
    },
    {
      title: 'Approve Start Date',
      dataIndex: 'approve_start_date',
      key: 'approve_start_date',
    },
    {
      title: 'Approve End Date',
      dataIndex: 'approve_end_date',
      key: 'approve_end_date',
    },
    {
      title: 'Apply Day',
      dataIndex: 'apply_day',
      key: 'apply_day',
    },
    {
      title: 'Approved Day',
      dataIndex: 'approved_day',
      key: 'approved_day',
    },
    {
      title: 'Application Hard Copy',
      dataIndex: 'application_hard_copy',
      key: 'application_hard_copy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_text: string, record: DataTypes) => (
        <Space size={10}>
          <Button type="primary" onClick={() => handleApprove(record)}>
            <EyeOutlined />
          </Button>

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
      name: 'Sick',
      employee_id: 2,
      leave_type: 'sick',
      application_start_date: moment(today).format(format),
      application_end_date: moment(today).format(format),
      approve_start_date: moment(today).format(format),
      approve_end_date: moment(today).format(format),
      apply_day: 2,
      approved_day: 2,
      application_hard_copy: 'No Hard Copy',
      status: 'pending',
    },
  ];

  const handleOpenModal = () => {
    setToggleModal(true);
    form.resetFields();
  };

  const handleApprove = (data: any) => {
    console.log('approve data', data);
    setReRender((prevState) => !prevState);
    setToggleModal(true);
    setUpdateLeaveApplicationInfo({ ...data, action: 'approve' });
    form.resetFields();
  };

  const updateLeaveType = (data: any) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setToggleModal(true);
    setUpdateLeaveApplicationInfo(data);
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
          content: 'Leave Application deleted successfully',
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
    message.success({
      content: 'Leave Application added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });

    setToggleModal(false);

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
        <PlusCircleOutlined />
        Add Leave Application
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record: any) => record.id}
      />

      <Modal
        title="Add Leave Application"
        visible={isToggleModal}
        onOk={() => setToggleModal(false)}
        onCancel={() => setToggleModal(false)}
        footer={null}
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={leaveApplicationInfo}
          onFieldsChange={(_, allFields) => setLeaveApplicationInfo(allFields)}
          autoComplete="off"
        >
          <Row gutter={20}>
            <Col lg={12}>
              <Form.Item
                label="Employee Name"
                name="name"
                rules={[
                  { required: true, message: 'Employee Name is required' },
                ]}
              >
                <Input placeholder="Employee Name" />
              </Form.Item>

              <Form.Item
                label="Application Start Date"
                name="application_start_date"
              >
                <DatePicker
                  placeholder="Application Start Date"
                  style={{ width: '100%' }}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item label="Apply Day" name="apply_day">
                <Input placeholder="Apply Day" />
              </Form.Item>

              <Form.Item label="Approve Start Date" name="approve_start_date">
                <DatePicker
                  placeholder="Approve Start Date"
                  style={{ width: '100%' }}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item label="Approved Day" name="approved_day">
                <Input placeholder="Approved Day" />
              </Form.Item>

              <Form.Item label="Reason" name="reason">
                <TextArea rows={2} placeholder="Reason" />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Leave Type"
                name="leave_type"
                rules={[{ required: true, message: 'Leave Type is required' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  // onChange={onChange}

                  filterOption={(input: string, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="sick">Sick</Option>
                  <Option value="annual">Annual</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Application End date"
                name="application_end_date"
              >
                <DatePicker
                  placeholder="Application End date"
                  style={{ width: '100%' }}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item
                label="Application Hard Copy"
                name="application_hard_copy"
              >
                <Input placeholder="Application Hard Copy" />
              </Form.Item>

              <Form.Item label="Approved End Date" name="approve_end_date">
                <DatePicker
                  placeholder="Approved End Date"
                  style={{ width: '100%' }}
                  showToday={false}
                />
              </Form.Item>

              {updateLeaveApplicationInfo?.action && (
                <>
                  <Form.Item label="Approved By" name="approved_by">
                    <Select
                      showSearch
                      placeholder="Approved By"
                      optionFilterProp="children"
                      // onChange={onChange}
                      filterOption={(input: string, option: any) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="1">John</Option>
                      <Option value="2">Devid</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Status" name="status">
                    <Select
                      showSearch
                      placeholder="Status"
                      optionFilterProp="children"
                      // onChange={onChange}
                      filterOption={(input: string, option: any) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="1">Approve</Option>
                      <Option value="0">Decline</Option>
                    </Select>
                  </Form.Item>
                </>
              )}
            </Col>
          </Row>

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

export default AddLeaveApplication;
