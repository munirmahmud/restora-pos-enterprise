import { Col, Form, Input, Row, Select } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const Supervisor = ({ employeeInfo, setEmployeeInfo }: any) => {
  const handleChangeSupervisorName = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, supervisor_name: value });
  };

  const handleChangeIsSupervisor = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, is_supervisor: value });
  };

  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item label="Supervisor Name" name="supervisor_name">
            <Select
              showSearch
              placeholder="Select Supervisor Name"
              allowClear
              size="large"
              style={{ textAlign: 'left' }}
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeSupervisorName}
            >
              <Option value="1">Jhon</Option>
              <Option value="2">Devid</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Supervisor Report" name="supervisor_report">
            <Input
              value={employeeInfo.supervisor_report}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  supervisor_report: e.target.value,
                })
              }
              size="large"
              placeholder="Reports"
            />
          </Form.Item>
        </Col>

        <Col lg={12} xl={12} xxl={12}>
          <Form.Item label="Is Supervisor" name="is_supervisor">
            <Select
              placeholder="Is Supervisor"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeIsSupervisor}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default Supervisor;
