import { Col, Form, Input, Row } from 'antd';

const SalaryInfo = ({ employeeInfo, setEmployeeInfo }: any) => {
  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12}>
          <Form.Item
            label="Basic Salary"
            name="basic_salary"
            rules={[
              { required: true, message: 'Please input your basic salary!' },
            ]}
          >
            <Input
              value={employeeInfo.basic_salary}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  basic_salary: e.target.value,
                })
              }
              size="large"
              placeholder="Basic Salary"
            />
          </Form.Item>

          <Form.Item label="Medical" name="medical">
            <Input
              value={employeeInfo.medical}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  medical: e.target.value,
                })
              }
              size="large"
              placeholder="Medical"
            />
          </Form.Item>

          <Form.Item label="Others" name="others">
            <Input
              value={employeeInfo.others}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  others: e.target.value,
                })
              }
              size="large"
              placeholder="Others"
            />
          </Form.Item>
        </Col>

        <Col lg={12}>
          <Form.Item label="House Rent" name="house_rent">
            <Input
              value={employeeInfo.house_rent}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, house_rent: e.target.value })
              }
              size="large"
              placeholder="House Rent"
            />
          </Form.Item>

          <Form.Item label="Transport Allowance" name="transport_allowance">
            <Input
              value={employeeInfo.transport_allowance}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  transport_allowance: e.target.value,
                })
              }
              size="large"
              placeholder="Transport Allowance"
            />
          </Form.Item>

          <Form.Item
            label="Gross Salary"
            name="gross_salary"
            rules={[
              { required: true, message: 'Please input your gross salary!' },
            ]}
          >
            <Input
              value={employeeInfo.gross_salary}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  gross_salary: e.target.value,
                })
              }
              size="large"
              placeholder="Gross Salary"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default SalaryInfo;
