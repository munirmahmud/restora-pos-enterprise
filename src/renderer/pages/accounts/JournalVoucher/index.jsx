import { Col, ConfigProvider, Row } from 'antd';
import JournalVoucherHeader from 'renderer/components/accounts/JournalVoucherHeader';
import Sidebar from 'renderer/components/partials/Sidebar';
import JournalVoucherTable from './../../../components/accounts/JournalVoucherHeader/JournalVoucherTable';
import Heading from './../../../components/Heading';

const JournalVoucher = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Journal Voucher" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <JournalVoucherHeader />
                <JournalVoucherTable />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default JournalVoucher;
