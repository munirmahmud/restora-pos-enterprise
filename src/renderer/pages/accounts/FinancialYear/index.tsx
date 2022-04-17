import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import FinancialYearHeader from 'renderer/components/accounts/FinancialYearHeader';
import Sidebar from 'renderer/components/partials/Sidebar';
import Heading from '../../../components/Heading';
import { SettingsProps } from '../../../types';
import FinancialYearTable from './../../../components/accounts/FinancialYearHeader/FinancialYearTable';

type FinancialYearProps = {
  settings: SettingsProps;
};

const FinancialYear: FC<FinancialYearProps> = ({ settings }): JSX.Element => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Financial Year" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <FinancialYearHeader />

                <FinancialYearTable />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FinancialYear;
