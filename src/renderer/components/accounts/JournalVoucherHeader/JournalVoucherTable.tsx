import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Select } from 'antd';
import { ChangeEvent, FC, SyntheticEvent, useRef } from 'react';
import './JournalVoucher.style.scss';

const { Option } = Select;

type JournalTableData = {
  account_name?: string;
  comments?: string;
  credit?: string;
  debit?: string;
};

const style = {
  borderBottom: '1px solid #e0e0e0',
};

type JournalVoucherTableProps = {
  defaultTableData: JournalTableData;
  setDefaultTableData: (args: JournalTableData) => void;
};

const JournalVoucherTable: FC<JournalVoucherTableProps> = ({
  setDefaultTableData,
  defaultTableData,
}) => {
  const defaultRowRef = useRef<HTMLTableRowElement>(null);

  const handleRemove = (e?: SyntheticEvent) => {
    if (!defaultRowRef.current) return;

    if (e) {
      defaultRowRef.current.remove();
    }
  };

  return (
    <div
      className="journal_voucher_table"
      style={{
        padding: '1.5rem 2rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
        marginTop: '1.5rem',
      }}
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

        <Form.List name="journalsData">
          {(fields, { add, remove }) => (
            <>
              <tr ref={defaultRowRef}>
                <th>
                  <Form.Item>
                    <Select
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      style={{ textAlign: 'left' }}
                      size="large"
                      onChange={(value: string) =>
                        setDefaultTableData({
                          ...defaultTableData,
                          account_name: value,
                        })
                      }
                      filterOption={(input: string, option: any) =>
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
                  <Form.Item>
                    <Input
                      size="large"
                      placeholder="Comments"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDefaultTableData({
                          ...defaultTableData,
                          comments: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </th>

                <th>
                  <Form.Item>
                    <Input
                      size="large"
                      placeholder="Debit"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDefaultTableData({
                          ...defaultTableData,
                          debit: e.target.value,
                        })
                      }
                      disabled={defaultTableData?.credit === '' ? false : true}
                    />
                  </Form.Item>
                </th>

                <th>
                  <Form.Item>
                    <Input
                      size="large"
                      placeholder="Credit"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDefaultTableData({
                          ...defaultTableData,
                          credit: e.target.value,
                        })
                      }
                      disabled={defaultTableData?.debit === '' ? false : true}
                    />
                  </Form.Item>
                </th>

                <th>
                  <Popconfirm title="Sure to delete?" onConfirm={handleRemove}>
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
                        filterOption={(input: string, option: any) =>
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
                <th colSpan={2}>Total</th>

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
    </div>
  );
};

export default JournalVoucherTable;
