import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const Benefits = ({ employeeInfo, setEmployeeInfo }: any) => {
  const handleChangeBenefitStatus = (value: any) => {
    setEmployeeInfo({ ...employeeInfo, benefit_status: value });
  };

  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={12} xl={12} xxl={12}>
          <Form.Item label="Benefit Class code" name="benefit_class_code">
            <Input
              value={employeeInfo.benefit_class_code}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  benefit_class_code: e.target.value,
                })
              }
              placeholder="Benefit Class code"
              size="large"
            />
          </Form.Item>

          <Form.Item label="Benefit Accrual Date" name="benefit_accrual_date">
            <DatePicker
              style={{ width: '100%' }}
              onChange={(_date, dateString) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  benefit_accrual_date: dateString,
                })
              }
              placeholder="Benefit Accrual Date"
              size="large"
            />
          </Form.Item>
        </Col>

        <Col lg={11} xl={11} xxl={11}>
          <Form.Item label="Benefit Description" name="benefit_description">
            <Input
              value={employeeInfo.benefit_description}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  benefit_description: e.target.value,
                })
              }
              placeholder="Benefit Description"
              size="large"
            />
          </Form.Item>
          <Form.Item label="Benefit Status" name="benefit_status">
            <Select
              size="large"
              placeholder="Status"
              allowClear
              style={{ textAlign: 'left' }}
              onChange={handleChangeBenefitStatus}
            >
              <Option value="1">Active</Option>
              <Option value="2">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={20}>
                <Col lg={12} xl={12} xxl={12}>
                  <Form.Item
                    label="Benefit Class code"
                    {...restField}
                    name={[name, 'first']}
                  >
                    <Input placeholder="Benefit Class code" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Benefit Accrual Date"
                    {...restField}
                    name={[name, 'first']}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: '100%' }}
                      // onChange={onDateAccrualChange}
                      placeholder="Benefit Accrual Date"
                    />
                  </Form.Item>
                </Col>
                <Col lg={11} xl={11} xxl={11}>
                  <Form.Item
                    label="Benefit Description"
                    {...restField}
                    name={[name, 'last']}
                  >
                    <Input placeholder="Benefit Description" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Benefit Status"
                    {...restField}
                    name={[name, 'last']}
                  >
                    <Select
                      size="large"
                      placeholder="Benefit Status"
                      allowClear
                      style={{ textAlign: 'left' }}
                    >
                      <Option value="Bangladesh">Bangladesh</Option>
                      <Option value="India">India</Option>
                    </Select>
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
                <PlusCircleOutlined />
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Benefits;
