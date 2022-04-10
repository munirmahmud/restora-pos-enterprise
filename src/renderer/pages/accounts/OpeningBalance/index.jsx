import { Col, ConfigProvider, Row } from 'antd';
import Sidebar from 'renderer/components/partials/Sidebar';
import Heading from './../../../components/Heading';

const OpeningBalance = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Opening Balance" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <h1>Opening Balance</h1>
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default OpeningBalance;
