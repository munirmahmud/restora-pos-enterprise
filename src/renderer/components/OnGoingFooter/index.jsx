import {
  CheckCircleOutlined,
  DeleteOutlined,
  DeliveredProcedureOutlined,
  EditOutlined,
  SearchOutlined,
  ShrinkOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useState } from 'react';
import PremiumVersion from '../partials/PremiumVersion';
import './OnGoingFooter.style.scss';

const OnGoingFooter = () => {
  const [premiumVersion, setPremiumVersion] = useState(false);

  window.get_all_order_info_ongoing.send('get_all_order_info_ongoing', { 'status': true })

  window.get_all_order_info_ongoing.once('get_all_order_info_ongoing_response', (args)=>{
    console.log("***************************", args);
  })

  function orderCompleted(orderId) {
    console.log('orderId:::::::::: ', orderId);
  }

  return (
    <>
      <div className="on_going_footer">
        <div className="on_going_footer_container">
          <Row>
            <Col lg={24}>
              <div className="on_going_btn_wrapper">
                <Button
                  type="primary"
                  className="on_going_btn search_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <SearchOutlined /> Search
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn cancel_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <DeleteOutlined /> Cancel
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn merge_order_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <ShrinkOutlined /> Merge Order
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn split_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <SwapOutlined /> Split
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn due_invoice_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <DeliveredProcedureOutlined /> Due Invoice
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn kot_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <EditOutlined /> Kot
                </Button>

                <Button
                  type="primary"
                  className="on_going_btn edit_btn premium_btn"
                  onClick={() => setPremiumVersion(true)}
                >
                  <EditOutlined /> Edit
                </Button>

                <Button type="primary" className="on_going_btn complete_btn"
                  onClick={() => orderCompleted(100)}
                >
                  <CheckCircleOutlined /> Complete

                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <PremiumVersion
        premiumVersion={premiumVersion}
        setPremiumVersion={setPremiumVersion}
      />
    </>
  );
};

export default OnGoingFooter;
