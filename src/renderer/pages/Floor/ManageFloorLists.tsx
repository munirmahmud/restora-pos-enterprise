import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
} from 'antd';
import { getDataFromDatabase } from 'helpers';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { confirm } = Modal;

type ColumnTypes = {
  title: string;
  dataIndex?: string;
  key: string;
  width?: string;
  align?: string;
  render?: (_text: string, record: FloorType) => ReactNode;
};

type FloorType = {
  id: number;
  floorName: string;
};

const ManageFloorLists = () => {
  const [form] = Form.useForm();
  const [addFloor, setAddFloor] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [updateFloorData, setUpdateFloorData] = useState<FloorType>({});
  const [floorListsData, setFloorListsData] = useState<FloorType[]>([]);

  useEffect(() => {
    setAddFloor([
      {
        name: ['floorName'],
        value: updateFloorData?.floorName,
      },
    ]);

    window.fetch_floor.send('fetch_floor', { status: true });
    getDataFromDatabase('fetch_floor_response', window.fetch_floor).then(
      (response) => {
        setFloorListsData(response);
      }
    );
  }, [reRender]);

  const columns: ColumnTypes[] = [
    {
      title: 'SL NO',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Floor Name',
      dataIndex: 'floorName',
      key: 'floorName',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '20%',
      render: (_text: string, record: FloorType): ReactNode => (
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

  const handleEditFloor = (data: DataType) => {
    setReRender((prevState) => !prevState);
    setUpdateFloorData(data);
  };

  const handleDeleteFloor = (data: FloorType) => {
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        window.delete_floor.send('delete_floor', {
          id: data.id,
        });

        window.delete_floor.once(
          'delete_floor_response',
          ({ status }: { status: boolean }) => {
            if (status) {
              // Rerender the component
              setReRender((prevState) => !prevState);

              message.success({
                content: 'Floor deleted successfully',
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

  const handleSubmit = (values: FloorType) => {
    if (updateFloorData?.id) {
      window.insert_floor.send('insert_floor', {
        id: updateFloorData.id,
        ...values,
      });

      setReRender((prevState) => !prevState);

      message.success({
        content: 'Floor updated successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });

      form.resetFields();
    } else {
      window.insert_floor.send('insert_floor', {
        floorName: values.floorName,
      });

      setReRender((prevState) => !prevState);

      message.success({
        content: 'Floor added successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });

      form.resetFields();
    }
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
                fields={addFloor}
                onFieldsChange={(_, allFields) => {
                  setAddFloor(allFields);
                }}
              >
                <Row gutter={20}>
                  <Col lg={16}>
                    <Form.Item
                      name="floorName"
                      label="Floor Name"
                      rules={[
                        { required: true, message: 'Floor name is required' },
                      ]}
                    >
                      <Input placeholder="Add Table Name" />
                    </Form.Item>
                  </Col>

                  <Col lg={8} className="flex content_start">
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Add
                      </Button>
                      <Button type="primary" danger onClick={onReset}>
                        Reset
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>

        <Table
          bordered
          columns={columns}
          dataSource={floorListsData}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ManageFloorLists;
