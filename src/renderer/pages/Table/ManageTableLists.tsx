import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Upload,
} from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imagesData from '../../../static/images.json';
import { getDataFromDatabase } from './../../../helpers';

const { Option } = Select;
const { confirm } = Modal;

type DataType = {
  id: number;
  sl_no: number;
  table_name: string;
  capacity: number;
  icon: string;
};

type TableDataTypes = {
  id: string;
  imageSrc: string;
};

const customImageCSS = {
  padding: '14px',
  border: '1px solid rgb(227, 234, 239)',
  borderRadius: '5px',
  cursor: 'pointer',
};

const ManageTableLists = () => {
  window.fetch_floor.send('fetch_floor', { status: true });

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [addTable, setAddTable] = useState([]);
  const [openTableImageModal, setOpenTableImageModal] = useState(false);
  const [floorListsData, setFloorListsData] = useState([]);
  const [imageSource, setImageSource] = useState({});
  const [reRender, setReRender] = useState(false);
  const [updateTableData, setUpdateTableData] = useState({});

  useEffect(() => {
    getDataFromDatabase('fetch_floor_response', window.fetch_floor).then(
      (response: any) => {
        setFloorListsData(response);
      }
    );

    setAddTable([]);
  }, [reRender]);

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
    setReRender((prevState) => !prevState);
    setUpdateTableData(data);
  };

  const handleDeleteTable = (data: DataType) => {
    console.log('Delete data', data);
    confirm({
      title: 'Are you sure to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content:
        'If you click on the ok button the item will be deleted permanently from the database. Undo is not possible.',
      onOk() {
        message.success({
          content: 'Table deleted successfully',
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

  const handleSubmit = (values: any) => {
    if (updateTableData?.id) {
      window.insert_customer_table.send('insert_customer_table', {
        id: updateTableData.id,
        ...values,
      });

      setReRender((prevState) => !prevState);

      message.success({
        content: 'Table updated successfully',
        className: 'custom-class',
        duration: 1,
        style: {
          marginTop: '5vh',
          float: 'right',
        },
      });

      form.resetFields();
    } else {
      console.log('data', {
        ...values,
        person_capacity: parseInt(values.person_capacity),
        table_icon: imageSource?.imageSrc,
        status: 0,
      });

      window.insert_customer_table.send('insert_customer_table', {
        ...values,
        person_capacity: parseInt(values.person_capacity),
        table_icon: imageSource?.imageSrc,
        status: 0,
      });

      setReRender((prevState) => !prevState);

      message.success({
        content: 'Table added successfully',
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

  const handleTableImage = (imageData: TableDataTypes) => {
    setImageSource(imageData);
    setOpenTableImageModal(false);
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
            fields={addTable}
            onFieldsChange={(_, allFields) => {
              setAddTable(allFields);
            }}
          >
            <Form.Item
              name="tablename"
              label="Table Name"
              rules={[{ required: true, message: 'Table name is required' }]}
            >
              <Input placeholder="Add Table Name" />
            </Form.Item>

            <Form.Item name="person_capacity" label="Capacity">
              <Input placeholder="Add Capacity" />
            </Form.Item>

            <Form.Item name="floor" label="Floor Select">
              <Select placeholder="Select a option" allowClear>
                {floorListsData?.map((data) => (
                  <Option key={data?.id} value={data?.id}>
                    {data?.floorName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div>
              <Row gutter={10}>
                <Col lg={20}>
                  <Form.Item name="table_icon" label="Table Icon">
                    {imageSource?.imageSrc ? (
                      <Image
                        src={imageSource?.imageSrc}
                        preview={false}
                        width={50}
                      />
                    ) : (
                      <p>No icon is selected</p>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={4} className="flex content_between item_center">
                  <Button
                    type="primary"
                    onClick={() => setOpenTableImageModal(true)}
                    style={{ marginTop: '0.4rem' }}
                  >
                    Show
                  </Button>
                </Col>
              </Row>
            </div>

            <Space>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
              <Button type="primary" danger onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form>
        </Modal>

        <Modal
          title="Table Images"
          visible={openTableImageModal}
          onOk={() => setOpenTableImageModal(false)}
          onCancel={() => setOpenTableImageModal(false)}
          footer={null}
          width={900}
        >
          <div>
            <div className="flex content_end">
              <Upload>
                <Button className="" type="primary" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </div>

            <div className="image_wrapper" style={{ marginTop: '2rem' }}>
              <Row gutter={[20, 20]}>
                {imagesData.images?.map((image) => (
                  <Col lg={4} key={image?.id}>
                    <div
                      className="flex content_center"
                      style={customImageCSS}
                      onClick={() => handleTableImage(image)}
                    >
                      <Image preview={false} width={80} src={image?.imageSrc} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageTableLists;
