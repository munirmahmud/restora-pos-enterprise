import { Button, Col, DatePicker, Form, Row } from 'antd';
import { useState } from 'react';
import CashBookTable from './CashBookTable';

const { RangePicker } = DatePicker;

const CashBookHeader = () => {
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState<string[]>([]);

  const handleSearch = () => {
    console.log('value', {
      start_date: dateRange[0],
      end_date: dateRange[1],
    });
  };

  return (
    <div className="box_shadow">
      <div className="search_wrapper">
        <Row gutter={20}>
          <Col lg={24}>
            <div
              style={{ marginBottom: '2rem' }}
              className="flex content_center"
            >
              <Form
                form={form}
                name="control-hooks"
                onFinish={handleSearch}
                className="flex content_center"
              >
                <Form.Item>
                  <RangePicker
                    format="YYYY-MM-DD"
                    onChange={(_value, dateString: string[]) =>
                      setDateRange(dateString)
                    }
                    size="large"
                    style={{ minWidth: '600px' }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="submit_btn"
                    style={{ marginLeft: '1rem' }}
                    type="primary"
                    htmlType="submit"
                  >
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>

        <CashBookTable />
      </div>
    </div>
  );
};

export default CashBookHeader;
