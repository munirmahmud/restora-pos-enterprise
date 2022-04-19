import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import BankBookTable from './BankBookTable';

const { RangePicker } = DatePicker;
const { Option } = Select;

const BankBookHeader = () => {
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState<string[]>([]);

  const handleSearch = (value) => {
    console.log('value', {
      ...value,
      start_date: dateRange[0],
      end_date: dateRange[1],
    });

    form.resetFields();
  };

  return (
    <>
      <div className="box_shadow">
        <div className="search_wrapper">
          <Form
            form={form}
            layout="vertical"
            name="control-hooks"
            onFinish={handleSearch}
          >
            <Row gutter={20}>
              <Col lg={8}>
                <Form.Item name="gl_head" label="GL Head">
                  <Select
                    showSearch
                    size="large"
                    placeholder="Select a option"
                    optionFilterProp="children"
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
              </Col>

              <Col lg={8}>
                <Form.Item name="account_code" label="Account Code">
                  <Input size="large" placeholder="Code" />
                </Form.Item>
              </Col>

              <Col lg={8} className="flex content_between item_center">
                <Form.Item label="Start Date & End Date">
                  <RangePicker
                    format="YYYY-MM-DD"
                    onChange={(_value, dateString: string[]) =>
                      setDateRange(dateString)
                    }
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="submit_btn"
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: '1.6rem' }}
                  >
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      <div className="box_shadow" style={{ marginTop: '1.5rem' }}>
        <BankBookTable />
      </div>
    </>
  );
};

export default BankBookHeader;
