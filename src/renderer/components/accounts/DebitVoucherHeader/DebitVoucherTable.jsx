import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);
const { Option } = Select;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  return <td {...restProps}>{childNode}</td>;
};

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log('search:', val);
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Account Name',
        dataIndex: 'account_name',
        width: '20%',
        editable: true,
        render: (text, record) => (
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        ),
      },
      {
        title: 'Comments',
        dataIndex: 'comments',
        width: '36%',
        render: (text, record) => (
          <Form.Item name="comments" style={{ marginBottom: '10px' }}>
            <Input placeholder="Comments" size="large" />
          </Form.Item>
        ),
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: '36%',
        render: (text, record) => (
          <Form.Item name="amount" style={{ marginBottom: '10px' }}>
            <Input placeholder="Amount" size="large" />
          </Form.Item>
        ),
      },
      {
        title: 'Action',
        dataIndex: 'action',
        align: 'center',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <div className="flex content_center">
                <Button type="danger">
                  <DeleteOutlined
                    style={{ fontWeight: '700', fontSize: '20px' }}
                  />
                </Button>
              </div>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          account_name: 'Edward King 0',
          comments: 'London',
          amount: 500,
        },
        {
          key: '1',
          account_name: 'Edward King 1',
          comments: 'London',
          amount: 500,
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div
        style={{
          padding: '1.5rem 3rem',
          boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
          marginTop: '1.5rem',
        }}
      >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />

        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
            marginTop: '1.5rem',
          }}
        >
          Add More
        </Button>
      </div>
    );
  }
}

export default EditableTable;
