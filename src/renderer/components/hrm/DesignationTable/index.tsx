import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { Key, useEffect, useState } from 'react';

const { confirm } = Modal;

type DataType = {
  key: Key;
  id: number;
  designation: string;
  designation_details: string;
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
  id?: number;
  designation?: string | undefined;
  designation_details?: string | undefined;
};

const DesignationTable = () => {
  window.get_employee_designation.send('get_employee_designation', {
    status: true,
  });

  window.delete_employee_designation.send('delete_employee_designation', {
    status: true,
  });

  const [form] = Form.useForm();

  const [isOpenDesignationModal, setOpenDesignationModal] = useState(false);
  const [addDesignation, setAddDesignation] = useState<FieldTypes[]>([]);
  const [updateDesignationData, setUpdateDesignationData] =
    useState<DesignationType>({});
  const [designationList, setDesignationList] = useState([]);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    setAddDesignation([
      {
        name: ['designation'],
        value: updateDesignationData?.designation,
      },
      {
        name: ['designation_details'],
        value: updateDesignationData?.designation_details,
      },
    ]);

    getDataFromDatabase(
      'get_employee_designation_response',
      window.get_employee_designation
    ).then((response: any) => {
      setDesignationList(response);
    });
  }, [reRender]);

  const handleOpenModal = () => {
    form.resetFields();
    setOpenDesignationModal(true);
  };

  const columns: any = [
    {
      title: 'SL No',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Position',
      dataIndex: 'designation',
      key: 'designation',
      width: '20%',
    },
    {
      title: 'Details',
      dataIndex: 'designation_details',
      key: 'designation_details',
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

  const handleEditDesignation = (data: DataType) => {
    setOpenDesignationModal(true);
    setReRender((prevState) => !prevState);
    setUpdateDesignationData(data);
  };

  const handleDeleteDesignation = (data: DataType) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      okText: 'Yes',
      onOk() {
        window.delete_employee_designation.send('delete_employee_designation', {
          id: data.id,
        });

        window.delete_employee_designation.once(
          'delete_employee_designation_response',
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

  const handleSubmit = (values: DesignationType) => {
    if (updateDesignationData?.id) {
      window.insert_employee_designation.send('insert_employee_designation', {
        id: updateDesignationData.id,
        ...values,
      });

      setReRender((prevState) => !prevState);

      message.success({
        content: 'Designation updated successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });

      form.resetFields();
      setOpenDesignationModal(false);

      // return;
    } else {
      window.insert_employee_designation.send(
        'insert_employee_designation',
        values
      );

      setReRender((prevState) => !prevState);

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
      setOpenDesignationModal(false);
    }
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
        <PlusCircleOutlined /> Add Designation
      </Button>

      <Table
        bordered
        columns={columns}
        dataSource={designationList}
        rowKey={(record) => record.id}
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
            name="designation"
            label="Designation"
            rules={[{ required: true, message: 'Designation is required' }]}
          >
            <Input size="large" placeholder="Designation" />
          </Form.Item>

          <Form.Item name="designation_details" label="Description">
            <Input.TextArea
              size="large"
              placeholder="Designation Description"
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

export default DesignationTable;
