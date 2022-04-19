import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Space, Table } from 'antd';
import { Key, useState } from 'react';
import DesignationAddModal from './DesignationAddModal';

const { confirm } = Modal;

type ColumnsType = {
  title: string;
  dataIndex: string;
  key: Key;
  align?: string;
  width: string;
};
type DataType = {
  key: Key;
  sl_no: number;
  position: string;
  details: string;
};

const DesignationTable = () => {
  const [isOpenDesignationModal, setOpenDesignationModal] = useState(false);
  const [designationEditData, setDesignationEditData] = useState({});
  const [reRender, setReRender] = useState(false);

  const columns: ColumnsType[] = [
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

  const handleOpenModal = () => {
    setOpenDesignationModal(true);
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

      <DesignationAddModal
        isOpenDesignationModal={isOpenDesignationModal}
        setOpenDesignationModal={setOpenDesignationModal}
        designationEditData={designationEditData}
        reRender={reRender}
        setReRender={setReRender}
      />
    </div>
  );
};

export default DesignationTable;
