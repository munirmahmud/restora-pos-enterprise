import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import Sidebar from 'renderer/components/partials/Sidebar';
import Heading from '../../../components/Heading';
import { SettingsProps } from '../../../types';
import SupplierPayment from './SupplierPayment';

type SupplierProps = {
  settings: SettingsProps;
};

const Supplier: FC<SupplierProps> = ({ settings }): JSX.Element => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Supplier Payment" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <SupplierPayment />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Supplier;
