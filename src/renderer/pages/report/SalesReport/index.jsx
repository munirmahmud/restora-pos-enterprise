import { Col, ConfigProvider, Row } from 'antd';
import React from 'react';
import Heading from 'renderer/components/Heading';
import Sidebar from '../../../components/partials/Sidebar';
import AllSalesReport from './../../../components/AllSalesReport';
import './SalesReport.style.scss';

const SalesReport = ({ direction }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={direction}>
          <Row>
            <Col lg={3}>
              <Sidebar />
            </Col>
            <Col md={21}>
              <Heading title="Sales Report" />

              <AllSalesReport />
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SalesReport;
