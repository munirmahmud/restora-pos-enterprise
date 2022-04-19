import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const style = {
  borderBottom: '1px solid #e0e0e0',
};

const SupplierPaymentTable = () => {
  function onSearch(value: any) {
    console.log('search:', value);
  }

  return (
    <div
      className="journal_voucher_table"
      style={{
        padding: '1.5rem 2rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
        marginTop: '1.5rem',
      }}
    >
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Supplier Name</th>
            <th scope="col">Comments</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>
              <Form.Item name="supplier_name">
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  style={{ textAlign: 'left' }}
                  size="large"
                  // onChange={(value) =>
                  //   setDefaultTableData((prevState: JournalTableData) => ({
                  //     ...prevState,
                  //     account_name: value,
                  //   }))
                  // }
                  onSearch={onSearch}
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
              <Form.Item name="comment">
                <Input size="large" placeholder="Comment" />
              </Form.Item>
            </th>

            <th>
              <Form.Item name="amount">
                <Input size="large" placeholder="Amount" />
              </Form.Item>
            </th>
          </tr>

          <tr style={style}>
            <th colSpan={2}>Total</th>

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
              style={{ marginLeft: '1rem' }}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </tbody>
      </table>
    </div>
  );
};

export default SupplierPaymentTable;
