import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

type COATypes = {
  head_name: string;
  parent_head_name: number;
  selected: [];
};

const AccountsHeader = () => {
  const [form] = Form.useForm();
  const plainOptions = ['Active', 'GL'];
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isSubItem, setSubItem] = useState(false);

  const handleCheckBox = (checkedValues: string[] | any): void => {
    setCheckList(checkedValues);
  };

  const handleSubmit = (values: COATypes) => {
    console.log('values', values);

    form.resetFields();
  };

  const handleReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="accounts_head_area"
      style={{
        padding: '1.5rem 3rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={20}>
          <Col lg={12} xl={12} xxl={12}>
            <Form.Item
              name="head_name"
              label="Head Name"
              rules={[{ required: true, message: 'Head name is required' }]}
            >
              <Input placeholder="Head Name" size="large" />
            </Form.Item>
            <Form.Item name="parent_head_name" label="Parent Head Name">
              <Select placeholder="Select a option" size="large" allowClear>
                <Option value="1">Current Assets</Option>
                <Option value="2">Account ReceiveAble</Option>
                <Option value="3">Customer ReceiveAble</Option>
              </Select>
            </Form.Item>

            <div className="flex">
              <Form.Item name="selected">
                <Checkbox.Group
                  options={plainOptions}
                  value={checkList}
                  onChange={handleCheckBox}
                />
              </Form.Item>

              <Form.Item>
                <Checkbox
                  onChange={() => setSubItem(!isSubItem)}
                  checked={isSubItem}
                >
                  Is Sub Type
                </Checkbox>
              </Form.Item>
            </div>

            {isSubItem && (
              <Form.Item name="fourth_level_item" label="Sub Type">
                <Select placeholder="Select a option" size="large" allowClear>
                  <Option value="1">Sub Assets</Option>
                  <Option value="2">Account Assets</Option>
                  <Option value="3">Customer Data</Option>
                </Select>
              </Form.Item>
            )}

            <Space>
              <Button
                type="primary"
                danger
                htmlType="button"
                className="reset_btn"
                onClick={handleReset}
              >
                Reset
              </Button>

              <Button type="primary" htmlType="submit" className="submit_btn">
                Submit
              </Button>
            </Space>
          </Col>
          <Col lg={12} xl={12} xxl={12}></Col>
        </Row>
      </Form>
    </div>
  );
};

export default AccountsHeader;
