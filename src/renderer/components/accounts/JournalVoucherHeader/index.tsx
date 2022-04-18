import { Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import { ChangeEvent, FC } from 'react';

const { TextArea } = Input;

type JournalHeaderProps = {
  date: string;
  remark: string;
};

type JournalProps = {
  journalVoucherData: JournalHeaderProps;
  setJournalVoucherData: (prevState: JournalHeaderProps) => void;
};

const JournalVoucherHeader: FC<JournalProps> = ({
  journalVoucherData,
  setJournalVoucherData,
}) => {
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
              onChange={(_date, dateString: string) =>
                setJournalVoucherData({
                  date: dateString,
                  remark: journalVoucherData.remark,
                })
              }
              showToday={false}
              size="large"
            />
          </Form.Item>

          <Form.Item label="Remark" style={{ marginBottom: '10px' }}>
            <TextArea
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setJournalVoucherData({
                  date: journalVoucherData.date,
                  remark: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default JournalVoucherHeader;
