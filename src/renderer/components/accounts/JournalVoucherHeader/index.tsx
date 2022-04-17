import { Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

type JournalHeaderProps = {
  date: string;
  remark: string;
};

const JournalVoucherHeader = ({ setJournalVoucherData }) => {
  const dateFormat = 'YYYY-MM-DD';
  const today = new Date();

  return (
    <div
      style={{
        padding: '1.5rem 2rem',
        boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
      }}
    >
      <Row gutter={20}>
        <Col lg={10} xl={10} xxl={10}>
          <Form.Item label="Date" style={{ marginBottom: '10px' }}>
            <DatePicker
              style={{ width: '100%' }}
              defaultValue={moment(today, dateFormat)}
              format={dateFormat}
              onChange={(_date, dateString) =>
                setJournalVoucherData((prevState: JournalHeaderProps) => ({
                  ...prevState,
                  date: dateString,
                }))
              }
              showToday={false}
              size="large"
            />
          </Form.Item>

          <Form.Item label="Remark" style={{ marginBottom: '10px' }}>
            <TextArea
              onChange={(e) =>
                setJournalVoucherData((prevState: JournalHeaderProps) => ({
                  ...prevState,
                  remark: e.target.value,
                }))
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default JournalVoucherHeader;
