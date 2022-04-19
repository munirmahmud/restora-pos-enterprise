import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { Key, useEffect, useState } from 'react';

const { confirm } = Modal;

type ColumnsType = {
  title: string;
  dataIndex: string;
  key: Key;
  align?: string;
  width?: string;
  render?: (_text: string, record: DataType) => void;
};
type DataType = {
  key: Key;
  sl_no: number;
  position: string;
  details: string;
};

type FieldTypes = {
  name: string | number | (string | number)[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
  errors?: string[];
  warnings?: string[];
};

type DesignationType = {
  position?: string | undefined;
  details?: string | undefined;
};

const DesignationTable = () => {
  const [form] = Form.useForm();

  const [isOpenDesignationModal, setOpenDesignationModal] = useState(false);
  const [designationEditData, setDesignationEditData] =
    useState<DesignationType>({});
  const [addDesignation, setAddDesignation] = useState<FieldTypes[]>([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setAddDesignation([
      {
        name: ['position'],
        value: designationEditData?.position,
      },
      {
        name: ['details'],
        value: designationEditData?.details,
      },
    ]);
  }, [reRender]);

  const handleOpenModal = () => {
    form.resetFields();
    setOpenDesignationModal(true);
  };

  const handleSubmit = (values: DesignationType) => {
    console.log('values', values);

    // let addNewDesignation: any = {};

    // for (const data of addDesignation) {
    //   addNewDesignation[data.name[0]] =
    //     typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    // }

    // addNewDesignation.id = designationEditData?.id;

    message.success({
      content: 'Designation added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
    form.resetFields();
    setReRender((prevState) => !prevState);
    setOpenDesignationModal(false);
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
      width: '5%',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      width: '20%',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      width: '60%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_text: string, record: DataType): JSX.Element => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditDesignation(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteDesignation(record)}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const designationData = [
    {
      key: 1,
      sl_no: 1,
      position: 'Counter server',
      details: 'Play a key role in every restaurant.',
    },
    {
      key: 2,
      sl_no: 2,
      position: 'Kitchen manager',
      details:
        'Oversee the successful running of a restaurant by hiring qualkklk;ified staff, monitoring customer satisfaction, and ensuring that all products and beverages are ordered in the correct quantities.',
    },
    {
      key: 3,
      sl_no: 3,
      position: 'Salesman',
      details:
        'Most waiters and waitresses, also called servers, work in full-service restaurants. They greet customers, take food orders, bring food and drinks to the tables and take payment and make change.',
    },
  ];

  const handleEditDesignation = (data: DataType) => {
    console.log('edit data', data);
    setReRender((prevState) => !prevState);
    setOpenDesignationModal(true);
    setDesignationEditData(data);
  };

  const handleDeleteDesignation = (data: DataType) => {
    console.log('delete data', data);
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        message.success({
          content: 'Category deleted successfully',
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
        <PlusCircleOutlined /> Add Designation
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={designationData}
        pagination={false}
      />

      <Modal
        title="Add Designation"
        visible={isOpenDesignationModal}
        onOk={() => setOpenDesignationModal(false)}
        onCancel={() => setOpenDesignationModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          fields={addDesignation}
          onFieldsChange={(_, allFields: FieldTypes[]): void =>
            setAddDesignation(allFields)
          }
          autoComplete="off"
        >
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Position is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="details"
            label="Details"
            rules={[{ required: true, message: 'Details is required' }]}
          >
            <Input.TextArea />
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

export default DesignationTable;
