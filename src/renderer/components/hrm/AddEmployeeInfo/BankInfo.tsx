import { Col, Form, Input, Row } from 'antd';

const BankInfo = ({ employeeInfo, setEmployeeInfo }: any) => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12}>
          <Form.Item
            label="Account Number"
            name="account_number"
            rules={[
              { required: true, message: 'Please input your account number!' },
            ]}
          >
            <Input
              value={employeeInfo.account_number}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  account_number: e.target.value,
                })
              }
              size="large"
              placeholder="Account Number"
            />
          </Form.Item>

          <Form.Item
            label="BBAN Number"
            name="bban_number"
            rules={[
              { required: true, message: 'Please input your bban number!' },
            ]}
          >
            <Input
              value={employeeInfo.bban_number}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  bban_number: e.target.value,
                })
              }
              size="large"
              placeholder="BBAN Number"
            />
          </Form.Item>
        </Col>

        <Col lg={12}>
          <Form.Item
            label="Bank Name"
            name="bank_name"
            rules={[
              { required: true, message: 'Please input your bank name!' },
            ]}
          >
            <Input
              value={employeeInfo.bank_name}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, bank_name: e.target.value })
              }
              size="large"
              placeholder="Bank Name"
            />
          </Form.Item>

          <Form.Item
            label="Branch Address"
            name="branch_name"
            rules={[
              { required: true, message: 'Please input your branch name!' },
            ]}
          >
            <Input
              value={employeeInfo.branch_name}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  branch_name: e.target.value,
                })
              }
              size="large"
              placeholder="Branch Address"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BankInfo;
