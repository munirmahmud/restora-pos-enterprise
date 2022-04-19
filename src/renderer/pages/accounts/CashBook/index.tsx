import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import CashBookHeader from 'renderer/components/accounts/CashBookHeader';
import Heading from 'renderer/components/Heading';
import Sidebar from 'renderer/components/partials/Sidebar';
import { SettingsProps } from '../../../types';

type CashBookProps = {
  settings: SettingsProps;
};

const CashBook: FC<CashBookProps> = ({ settings }): JSX.Element => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Cash Book" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <CashBookHeader />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CashBook;
