import { Col, Form, Input, Row } from 'antd';
import './AddEmployeeInfo.style.scss';

const AdditionalAddress = () => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Home Email"
            name="home_email"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Home Email" />
          </Form.Item>

          <Form.Item
            label="Home Phone "
            name="home_phone "
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Home Phone " />
          </Form.Item>

          <Form.Item
            label="Cell Phone"
            name="cell_phone"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Cell Phone" />
          </Form.Item>
        </Col>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Business Email"
            name="business_email"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Business Email" />
          </Form.Item>

          <Form.Item
            label="Business Phone"
            name="business_phone"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Business Phone" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalAddress;
