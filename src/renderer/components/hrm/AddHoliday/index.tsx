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
  InputNumber,
  message,
  Modal,
  Space,
  Table,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

const { confirm } = Modal;

type DataTypes = {
  id: number;
  leave_type: string;
  total_leaves: number;
};

const AddHoliday = () => {
  const [form] = Form.useForm();
  const [isOpenToggleModal, setOpenToggleModal] = useState(false);
  const [updateHolidayInfo, setUpdateHolidayInfo] = useState({});
  const [holidayInfo, setHolidayInfo] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setHolidayInfo([
      {
        name: ['holiday_name'],
        value: updateHolidayInfo?.holiday_name,
      },
      {
        name: ['from'],
        // value: updateHolidayInfo?.from,
      },
      {
        name: ['to'],
        // value: updateHolidayInfo?.to,
      },
      {
        name: ['number_of_days'],
        value: updateHolidayInfo?.number_of_days,
      },
    ]);
  }, [reRender]);

  const columns: any = [
    { title: 'SL NO', dataIndex: 'id', key: 'id' },
    {
      title: 'Holiday Name',
      dataIndex: 'holiday_name',
      key: 'holiday_name',
      width: '30%',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: '15%',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: '15%',
    },
    {
      title: 'Number of Days',
      dataIndex: 'number_of_days',
      key: 'number_of_days',
      width: '15%',
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

  const format = 'YYYY-MM-DD';
  const today = new Date();

  const data = [
    {
      key: 1,
      id: 1,
      holiday_name: 'Pahela Boishakh',
      from: moment(today).format(format),
      to: moment(today).format(format),
      number_of_days: 1,
    },
    {
      key: 2,
      id: 2,
      holiday_name: 'Pahela Boishakh',
      from: moment(today).format(format),
      to: moment(today).format(format),
      number_of_days: 1,
    },
  ];

  const handleOpenModal = () => {
    setOpenToggleModal(true);
    form.resetFields();
  };

  const updateLeaveType = (data: any) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setOpenToggleModal(true);
    setUpdateHolidayInfo(data);
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
          content: 'Holiday deleted successfully',
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
      content: 'Holiday added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });

    setOpenToggleModal(false);
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
        <PlusCircleOutlined /> Add Holiday
      </Button>

      <Table bordered columns={columns} dataSource={data} pagination={false} />

      <Modal
        title="Add Leave Type"
        visible={isOpenToggleModal}
        onOk={() => setOpenToggleModal(false)}
        onCancel={() => setOpenToggleModal(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={holidayInfo}
          onFieldsChange={(_, allFields) => setHolidayInfo(allFields)}
          autoComplete="off"
        >
          <Form.Item
            name="holiday_name"
            label="Holiday Name"
            rules={[{ required: true, message: 'Holiday Name is required' }]}
          >
            <Input placeholder="Holiday Name" />
          </Form.Item>

          <Form.Item name="from" label="From">
            <DatePicker
              placeholder="From"
              style={{ width: '100%' }}
              showToday={false}
            />
          </Form.Item>

          <Form.Item name="to" label="To">
            <DatePicker
              placeholder="To"
              style={{ width: '100%' }}
              showToday={false}
              // onChange={(_date, dateString: string) => setHolidayInfo([{...}])}
            />
          </Form.Item>

          <Form.Item
            name="number_of_days"
            label="Number of Days Without Weekend"
          >
            <InputNumber
              min={1}
              placeholder="Number of Days Without Weekend"
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

export default AddHoliday;
