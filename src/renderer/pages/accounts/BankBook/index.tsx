import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import BankBookHeader from 'renderer/components/accounts/BankBookHeader';
import Heading from 'renderer/components/Heading';
import Sidebar from 'renderer/components/partials/Sidebar';
import { SettingsProps } from '../../../types';

type BankBookProps = {
  settings: SettingsProps;
};

const BankBook: FC<BankBookProps> = ({ settings }): JSX.Element => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Bank Book" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <BankBookHeader />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default BankBook;
