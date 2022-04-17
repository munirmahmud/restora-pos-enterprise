import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const CashAdjustmentTable = () => {
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
            <th scope="col">Code</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>
              <Form.Item name="code">
                <Input size="large" placeholder="Code" />
              </Form.Item>
            </th>

            <th>
              <Form.Item name="amount">
                <Input size="large" placeholder="Amount" />
              </Form.Item>
            </th>
          </tr>

          <Form.Item
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid transparent',
            }}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </tbody>
      </table>
    </div>
  );
};

export default CashAdjustmentTable;
