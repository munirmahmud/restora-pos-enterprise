import { Col, ConfigProvider, Row } from 'antd';
import ContraVoucherHeader from 'renderer/components/accounts/ContraVoucherHeader';
import Sidebar from 'renderer/components/partials/Sidebar';
import ContraVoucherTable from './../../../components/accounts/ContraVoucherHeader/ContraVoucherTable';
import Heading from './../../../components/Heading';

const ContraVoucher = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Contra Voucher" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <ContraVoucherHeader />
                <ContraVoucherTable />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ContraVoucher;
