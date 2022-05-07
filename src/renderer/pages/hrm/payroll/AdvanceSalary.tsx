import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import AdvanceSalaryComponent from 'renderer/components/hrm/PayrollComponent/AdvanceSalaryComponent';
import Sidebar from 'renderer/components/partials/Sidebar';
import Heading from '../../../components/Heading';
import { SettingsProps } from '../../../types';

type VoucherReportProps = {
  settings: SettingsProps;
};

const AdvanceSalary: FC<VoucherReportProps> = ({ settings }): JSX.Element => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Advance Salary" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <AdvanceSalaryComponent />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AdvanceSalary;
