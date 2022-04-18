import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import VoucherReportTable from 'renderer/components/accounts/VoucherReportTable';
import Heading from 'renderer/components/Heading';
import { SettingsProps } from '../../../types';
import Sidebar from './../../../components/partials/Sidebar';

type VoucherReportProps = {
  settings: SettingsProps;
};

const VoucherReport: FC<VoucherReportProps> = ({ settings }): JSX.Element => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Voucher Report" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <VoucherReportTable />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default VoucherReport;
