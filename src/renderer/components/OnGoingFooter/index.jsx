import {
  CheckCircleOutlined,
  DeleteOutlined,
  DeliveredProcedureOutlined,
  EditOutlined,
  SearchOutlined,
  ShrinkOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Col, message, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InVoiceGenerate from '../InVoiceGenerate';
import PremiumVersion from '../partials/PremiumVersion';
import TokenModal from '../TokenModal';
import { ContextData } from './../../contextApi';
import QuickOrderModal from './../Cart/QuickOrderModal';
import CancelOrderModal from './CancelOrderModal';
import './OnGoingFooter.style.scss';

const OnGoingFooter = ({
  orderComplete,
  settings,
  openSearchInput,
  setOpenSearchInput,
  activeInactiveBtn,
  ongoingOrders,
  setOngoingOrders,
  setReRender,
}) => {
  let redirect = useNavigate();
  const { cartItems, setCartItems } = useContext(ContextData);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [premiumVersion, setPremiumVersion] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [orderData, setOrderData] = useState({});
  const [tokenPrint, setTokenPrint] = useState('printToken');
  // const [printDueInvoice, setPrintDueInvoice] = useState(null);
  const [invoicePrintDivId, setInvoicePrintDivId] = useState(null);

  useEffect(() => {
    if (orderComplete?.order_info?.length) {
      setOrderData(orderComplete);
    }
  }, [orderComplete]);

  function orderCompleted(orderItem) {
    if (Object.keys(orderItem).length === 0) {
      message.error({
        content: 'Sorry! No order is selected.',
        className: 'custom-class',
        duration: 2,
        style: {
          marginTop: '15vh',
        },
      });

      setReRender((prevState) => !prevState);

      return;
    }

    setOpenModal(true);
  }

  const generateDueInvoice = (orderItemObj) => {
    console.log('orderData nnn', orderData);
    console.log('orderItemObj mmm', orderItemObj);
    if (Object.keys(orderData).length === 0) {
      message.error({
        content: 'Sorry! No order is selected.',
        className: 'custom-class',
        duration: 2,
        style: {
          marginTop: '15vh',
        },
      });
      return;
    }

    const newInvoiceData = {
      ...orderItemObj,
      grandTotal: orderItemObj.grand_total,
    };

    setOrderData(newInvoiceData);

    var printContents = document.querySelector(
      `.${invoicePrintDivId.classList.value}`
    ).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();

    // After printing reload the page
    // window.location.reload();
  };

  const kitchenOrderToken = (orderDetails) => {
    if (Object.keys(orderDetails).length === 0) {
      message.error({
        content: 'Sorry! No order is selected.',
        className: 'custom-class',
        duration: 2,
        style: {
          marginTop: '15vh',
        },
      });

      return;
    }

    var printContents = document.getElementById(tokenPrint).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();

    // After printing reload the page
    window.location.reload();
    // & Redirect to the ongoing page
    window.addEventListener('afterprint', (e) => {
      console.log('after print', e);
      redirect('/on_going_order');
    });

    window.onafterprint = () => {
      console.log('on after print');
    };
  };

  const editOnGoingOrder = (orderData) => {
    if (Object.keys(orderData).length === 0) {
      message.error({
        content: 'Sorry! No order is selected.',
        className: 'custom-class',
        duration: 2,
        style: {
          marginTop: '15vh',
        },
      });

      return;
    }

    localStorage.setItem('order_id', orderData.order_id);
    const orderItems = JSON.parse(orderData.order_info);

    setCartItems(orderItems);
    redirect('/', { state: { ...orderData, order_info: orderItems } });
  };

  const handleSearchBtn = () => {
    window.scrollTo(0, 0);
    setOpenSearchInput(!openSearchInput);
  };

  const cancelOrder = (orderData) => {
    console.log('Cancel orderData', orderData);
    // setReRender((prevState) => !prevState);
    setCancelOrderModal(true);
  };

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
                  onClick={handleSearchBtn}
                >
                  <SearchOutlined /> Search
                </Button>

                <Button
                  type="primary"
                  className={
                    activeInactiveBtn?.status === 1
                      ? 'on_going_btn cancel_btn'
                      : 'on_going_btn cancel_btn premium_btn'
                  }
                  onClick={() => cancelOrder(orderData)}
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
                  className={
                    activeInactiveBtn?.status === 1
                      ? 'on_going_btn due_invoice_btn '
                      : 'on_going_btn due_invoice_btn premium_btn'
                  }
                  onClick={() => generateDueInvoice(orderData)}
                >
                  <DeliveredProcedureOutlined /> Due Invoice
                </Button>

                <Button
                  type="primary"
                  className={
                    activeInactiveBtn?.status === 1
                      ? 'on_going_btn kot_btn '
                      : 'on_going_btn kot_btn premium_btn'
                  }
                  onClick={() => kitchenOrderToken(orderComplete)}
                >
                  <EditOutlined /> KOT
                </Button>

                <Button
                  type="primary"
                  className={
                    activeInactiveBtn?.status === 1
                      ? 'on_going_btn edit_btn '
                      : 'on_going_btn edit_btn premium_btn'
                  }
                  onClick={() => editOnGoingOrder(orderComplete)}
                >
                  <EditOutlined /> Edit
                </Button>

                <Button
                  type="primary"
                  className={
                    activeInactiveBtn?.status === 1
                      ? 'on_going_btn complete_btn '
                      : 'on_going_btn complete_btn premium_btn'
                  }
                  onClick={() => orderCompleted(orderComplete)}
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

      {openModal && (
        <QuickOrderModal
          settings={settings}
          openModal={openModal}
          setOpenModal={setOpenModal}
          foodItems={orderData}
          setReRender={setReRender}
          ongoingOrders={ongoingOrders}
          setOngoingOrders={setOngoingOrders}
        />
      )}

      <TokenModal orderData={orderData} tokenPrint={tokenPrint} />

      <InVoiceGenerate
        foodData={orderData}
        setInvoicePrintDivId={setInvoicePrintDivId}
        settings={settings}
      />

      {/* <DueInvoiceModal
        orderData={orderData}
        printDueInvoice={printDueInvoice}
        settings={settings}
      /> */}

      {cancelOrderModal && (
        <CancelOrderModal
          orderData={orderData}
          cancelOrderModal={cancelOrderModal}
          setCancelOrderModal={setCancelOrderModal}
        />
      )}
    </>
  );
};

export default OnGoingFooter;
