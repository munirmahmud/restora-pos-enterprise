import { Col, Form, Input, Row } from 'antd';
import './AddEmployeeInfo.style.scss';

const AdditionalAddress = ({ employeeInfo, setEmployeeInfo }: any) => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item label="Home Email" name="home_email">
            <Input
              value={employeeInfo.home_email}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, home_email: e.target.value })
              }
              size="large"
              placeholder="Home Email"
            />
          </Form.Item>

          <Form.Item label="Home Phone" name="home_phone">
            <Input
              value={employeeInfo.home_phone}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, home_phone: e.target.value })
              }
              size="large"
              placeholder="Home Phone "
            />
          </Form.Item>

          <Form.Item
            label="Cell Phone"
            name="cell_phone"
            rules={[{ required: true, message: 'Cell Phone is required' }]}
          >
            <Input
              value={employeeInfo.cell_phone}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, cell_phone: e.target.value })
              }
              size="large"
              placeholder="Cell Phone"
            />
          </Form.Item>
        </Col>

        <Col lg={12} xl={12} xxl={12}>
          <Form.Item label="Business Email" name="business_email">
            <Input
              value={employeeInfo.business_email}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  business_email: e.target.value,
                })
              }
              size="large"
              placeholder="Business Email"
            />
          </Form.Item>

          <Form.Item label="Business Phone" name="business_phone">
            <Input
              value={employeeInfo.business_phone}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  business_phone: e.target.value,
                })
              }
              size="large"
              placeholder="Business Phone"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalAddress;
