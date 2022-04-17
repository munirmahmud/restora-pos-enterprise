import { Col, ConfigProvider, Row } from 'antd';
import SupplierPaymentTable from 'renderer/components/accounts/SupplierPayment/SupplierPaymentTable';
import Sidebar from 'renderer/components/partials/Sidebar';
import Heading from '../../../components/Heading';
import SupplierPayment from './../SupplierPayment';

const Supplier = ({ settings }) => {
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
                <SupplierPaymentTable />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Supplier;
