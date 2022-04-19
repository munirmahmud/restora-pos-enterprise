import { Col, Form, Input, Row, Select } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const Supervisor = () => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Supervisor Name"
            name="supervisor_name"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select Supervisor Name"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Bangladesh">Bangladesh</Option>
              <Option value="India">India</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Supervisor Report"
            name="supervisor_report"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Reports" />
          </Form.Item>
        </Col>

        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            name="Is Supervisor"
            label="is_supervisor"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Is Supervisor"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
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
      </Row>
    </div>
  );
};

export default Supervisor;
