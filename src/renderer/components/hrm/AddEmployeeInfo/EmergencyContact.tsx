import { Col, Form, Input, Row } from 'antd';
import './AddEmployeeInfo.style.scss';

const EmergencyContact = () => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Emergency Contact"
            name="emergency_contact"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Emergency Contact" />
          </Form.Item>

          <Form.Item
            label="Emergency Work Phone"
            name="emergency_work_phone"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Emergency Work Phone" />
          </Form.Item>

          <Form.Item
            label="Alter Emergency Contact"
            name="alter_emergency_contact"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Alter Emergency Contact" />
          </Form.Item>

          <Form.Item
            label="Alt Emergency Work Phone"
            name="alt_emergency_work_phone"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Alt Emergency Work Phone" />
          </Form.Item>
        </Col>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Emergency Home Phone"
            name="emergency_home_phone"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Emergency Home Phone" />
          </Form.Item>

          <Form.Item
            label="Emergency Contact Relation"
            name="emergency_contact_relation"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Emergency Contact Relation" />
          </Form.Item>
          <Form.Item
            label="Alt Emergency Home Phone"
            name="alt_emergency_home_phone"
            rules={[{ required: true, message: '' }]}
          >
            <Input size="large" placeholder="Alt Emergency Home Phone" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default EmergencyContact;
