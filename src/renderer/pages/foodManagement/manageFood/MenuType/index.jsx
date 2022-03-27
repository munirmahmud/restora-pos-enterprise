import { Col, ConfigProvider, Row } from 'antd';
import Heading from 'renderer/components/Heading';
import MenuTypeList from './../../../../components/MenuTypeList';
import Sidebar from './../../../../components/partials/Sidebar';
import './MenuType.style.scss';

const MenuType = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>
            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Menu Type" />

              <MenuTypeList />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default MenuType;
