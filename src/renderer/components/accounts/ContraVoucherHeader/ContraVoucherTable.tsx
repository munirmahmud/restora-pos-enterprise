import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Select } from 'antd';
import { useRef } from 'react';

const { Option } = Select;

const style = {
  borderBottom: '1px solid #e0e0e0',
};

const ContraVoucherTable = () => {
  const defaultRowRef = useRef(null);

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(value) {
    console.log('search:', value);
  }

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const handleRemove = (data) => {
    if (data) {
      defaultRowRef.current.remove();
    }
  };

  return (
    <div
      className="debit_voucher_table"
      style={{
        padding: '1.5rem 3rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
        marginTop: '1.5rem',
      }}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Account Name</th>
              <th scope="col">Comments</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {/* TODO: Data is not submitted. spreading error */}
                <tr ref={defaultRowRef}>
                  <th>
                    <Form.Item name={['account_name']}>
                      <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        style={{ textAlign: 'left' }}
                        size="large"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Form.Item>
                  </th>

                  <th>
                    <Form.Item name={['comments']}>
                      <Input size="large" placeholder="Comments" />
                    </Form.Item>
                  </th>

                  <th>
                    <Form.Item name={['debit']}>
                      <Input size="large" placeholder="Debit" />
                    </Form.Item>
                  </th>

                  <th>
                    <Form.Item name={['credit']}>
                      <Input size="large" placeholder="Credit" />
                    </Form.Item>
                  </th>

                  <th>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={handleRemove}
                    >
                      <div className="flex content_center">
                        <Button type="primary" danger>
                          <DeleteOutlined
                            style={{ fontWeight: 'bold', fontSize: '20px' }}
                          />
                        </Button>
                      </div>
                    </Popconfirm>
                  </th>
                </tr>

                {fields.map(({ key, name, ...restField }) => (
                  <tr key={key}>
                    <th>
                      <Form.Item {...restField} name={[name, 'account_name']}>
                        <Select
                          showSearch
                          placeholder="Select a person"
                          optionFilterProp="children"
                          style={{ textAlign: 'left' }}
                          size="large"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="tom">Tom</Option>
                        </Select>
                      </Form.Item>
                    </th>

                    <th>
                      <Form.Item {...restField} name={[name, 'comments']}>
                        <Input size="large" placeholder="Comments" />
                      </Form.Item>
                    </th>

                    <th>
                      <Form.Item {...restField} name={[name, 'debit']}>
                        <Input size="large" placeholder="Debit" />
                      </Form.Item>
                    </th>

                    <th>
                      <Form.Item {...restField} name={[name, 'credit']}>
                        <Input size="large" placeholder="Credit" />
                      </Form.Item>
                    </th>

                    <th>
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => remove(name)}
                      >
                        <div className="flex content_center">
                          <Button type="primary" danger>
                            <DeleteOutlined
                              style={{ fontWeight: 'bold', fontSize: '20px' }}
                            />
                          </Button>
                        </div>
                      </Popconfirm>
                    </th>
                  </tr>
                ))}

                <tr style={style}>
                  <th colspan="2">Total</th>

                  <th>
                    <Form.Item>
                      <Input size="large" placeholder="0" />
                    </Form.Item>
                  </th>

                  <th>
                    <Form.Item>
                      <Input size="large" placeholder="0" />
                    </Form.Item>
                  </th>
                </tr>

                <Form.Item
                  style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid transparent',
                  }}
                >
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    type="primary"
                  >
                    Add More
                  </Button>

                  <Button
                    style={{ marginLeft: '1rem' }}
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </table>
      </Form>
    </div>
  );
};

export default ContraVoucherTable;
