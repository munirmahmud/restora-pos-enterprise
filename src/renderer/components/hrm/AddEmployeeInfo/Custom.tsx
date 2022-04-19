import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';

import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const Custom = () => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Custom Field Name"
            name="custom_field_name"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder="Custom Field Name" size="large" />
          </Form.Item>
        </Col>

        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Custom Field Type"
            name="custom_field_type"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              size="large"
              placeholder="Custom Field Type"
              allowClear
              style={{ textAlign: 'left' }}
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col lg={7} xl={7} xxl={7}>
          <Form.Item
            label="Custom Value"
            name="custom_value"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder="Custom Value" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={20}>
                <Col lg={8} xl={8} xxl={8}>
                  <Form.Item
                    {...restField}
                    label="Custom Field Name"
                    name={[name, 'first']}
                    rules={[{ required: true, message: '' }]}
                  >
                    <Input placeholder="Custom Field Name" size="large" />
                  </Form.Item>
                </Col>

                <Col lg={8} xl={8} xxl={8}>
                  <Form.Item
                    {...restField}
                    label="Custom Field Type"
                    name={[name, 'last']}
                    rules={[{ required: true, message: '' }]}
                  >
                    <Select
                      size="large"
                      placeholder="Custom Field Type"
                      allowClear
                      style={{ textAlign: 'left' }}
                      showSearch
                      filterOption={(input: string, option: any) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="Bangladesh">Bangladesh</Option>
                      <Option value="India">India</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={7} xl={7} xxl={7}>
                  <Form.Item
                    {...restField}
                    label="Custom Value"
                    name={[name, 'last']}
                    rules={[{ required: true, message: '' }]}
                  >
                    <Input placeholder="Custom Value" size="large" />
                  </Form.Item>
                </Col>

                <Col lg={1} xl={1} xxl={1}>
                  <Button
                    style={{ marginTop: '1.8rem' }}
                    type="primary"
                    size="large"
                    danger
                    onClick={() => remove(name)}
                  >
                    <DeleteOutlined />
                  </Button>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="primary" onClick={() => add()}>
                <PlusCircleOutlined /> Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Custom;
