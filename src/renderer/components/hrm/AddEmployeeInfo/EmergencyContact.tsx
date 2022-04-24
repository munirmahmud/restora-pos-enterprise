import { Col, Form, Input, Row } from 'antd';
import './AddEmployeeInfo.style.scss';

const EmergencyContact = ({ employeeInfo, setEmployeeInfo }: any) => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Emergency Contact"
            name="emergency_contact"
            rules={[
              {
                required: true,
                message: 'Emergency Contact is required filed',
              },
            ]}
          >
            <Input
              value={employeeInfo.emergency_contact}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  emergency_contact: e.target.value,
                })
              }
              size="large"
              placeholder="Emergency Contact"
            />
          </Form.Item>

          <Form.Item
            label="Emergency Work Phone"
            name="emergency_work_phone"
            rules={[
              {
                required: true,
                message: 'Emergency Work Phone is required filed',
              },
            ]}
          >
            <Input
              value={employeeInfo.emergency_work_phone}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  emergency_work_phone: e.target.value,
                })
              }
              size="large"
              placeholder="Emergency Work Phone"
            />
          </Form.Item>

          <Form.Item
            label="Alter Emergency Contact"
            name="alter_emergency_contact"
          >
            <Input
              value={employeeInfo.alter_emergency_contact}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  alter_emergency_contact: e.target.value,
                })
              }
              size="large"
              placeholder="Alter Emergency Contact"
            />
          </Form.Item>

          <Form.Item
            label="Alt Emergency Work Phone"
            name="alt_emergency_work_phone"
          >
            <Input
              value={employeeInfo.alt_emergency_work_phone}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  alt_emergency_work_phone: e.target.value,
                })
              }
              size="large"
              placeholder="Alt Emergency Work Phone"
            />
          </Form.Item>
        </Col>

        <Col lg={12} xl={12} xxl={12}>
          <Form.Item
            label="Emergency Home Phone"
            name="emergency_home_phone"
            rules={[
              {
                required: true,
                message: 'Emergency Home Phone is required filed',
              },
            ]}
          >
            <Input
              value={employeeInfo.emergency_home_phone}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  emergency_home_phone: e.target.value,
                })
              }
              size="large"
              placeholder="Emergency Home Phone"
            />
          </Form.Item>

          <Form.Item
            label="Emergency Contact Relation"
            name="emergency_contact_relation"
          >
            <Input
              value={employeeInfo.emergency_contact_relation}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  emergency_contact_relation: e.target.value,
                })
              }
              size="large"
              placeholder="Emergency Contact Relation"
            />
          </Form.Item>
          <Form.Item
            label="Alt Emergency Home Phone"
            name="alt_emergency_home_phone"
          >
            <Input
              value={employeeInfo.alt_emergency_home_phone}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  alt_emergency_home_phone: e.target.value,
                })
              }
              size="large"
              placeholder="Alt Emergency Home Phone"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default EmergencyContact;
