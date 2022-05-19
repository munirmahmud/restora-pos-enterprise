import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import { ContextData } from 'renderer/contextApi';
import {
  CalculatePrice,
  getDataFromDatabase,
  getDiscountAmount,
} from '../../../../helpers';
import './QuickOrderModal.style.scss';

const { Text, Title } = Typography;

const QuickOrderModal = ({
  openModal,
  setOpenModal,
  settings,
  foodItems,
  setReRender,
  ongoingOrders,
  setOngoingOrders,
}) => {
  window.get_all_order_info_ongoing.send('get_all_order_info_ongoing', {
    status: true,
  });
  window.get_customer_names.send('get_customer_names', { status: true });

  const { cartItems, setCartItems } = useContext(ContextData);
  const [printInvoiceData, setPrintInvoiceData] = useState(null);
  const [onGoingOrderData, setOnGoingOrderData] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [isPayButtonClicked, setIsPayButtonClicked] = useState(false);

  const [invoicePrintDivId, setInvoicePrintDivId] = useState(null);

  const [invoiceData, setInvoiceData] = useState(null);
  const [customDiscountAmount, setCustomDiscountAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  let calc = new CalculatePrice(settings, foodData);

  useEffect(() => {
    const totalAmount =
      calc.getTotalPrice() -
      getDiscountAmount(settings, customDiscountAmount, calc.getTotalPrice()) +
      (invoiceData?.serviceCharge ? invoiceData?.serviceCharge : 0) +
      (invoiceData?.vat ? invoiceData?.vat : 0);

    setGrandTotal(totalAmount);
  }, [customDiscountAmount, grandTotal]);

  useEffect(() => {
    const orderData = localStorage.getItem('order');
    if (orderData) {
      const parsedData = JSON.parse(orderData);

      setCustomDiscountAmount(parsedData.discount);
      setInvoiceData(parsedData);
      setGrandTotal(parsedData.grandTotal);
    }

    console.log('foodItems', foodItems);

    if (foodItems?.order_info) {
      if (typeof foodItems?.order_info !== 'string') {
        setFoodData(foodItems?.order_info);
      } else {
        setFoodData(JSON.parse(foodItems?.order_info));
      }
    } else {
      setFoodData(foodItems);
    }
  }, [foodItems]);

  useEffect(() => {
    getDataFromDatabase(
      'get_customer_names_response',
      window.get_customer_names
    ).then((data = []) => {
      const filterCustomerId = data.find(
        (customersId) => customersId?.id === foodItems?.customer_id
      );

      if (filterCustomerId) {
        setCustomerName(filterCustomerId?.customer_name);
      } else {
        setCustomerName('Walk In');
      }
    });
  }, [foodData]);

  const handlePayBtn = () => {
    // Received on going order data
    setOnGoingOrderData(foodData);

    getDataFromDatabase(
      'get_all_order_info_ongoing_response',
      window.get_all_order_info_ongoing
    ).then((data = []) => {
      setOpenModal(false);

      // Execute when click on quick order -> complete button -> Pay now and print invoice
      if (foodItems.order_id) {
        window.update_order_info_ongoing.send('update_order_info_ongoing', {
          order_id: foodItems.order_id,
          grand_total: grandTotal,
          discount: customDiscountAmount,
        });
      } else {
        // Execute when click on quick order -> Pay now and print invoice
        window.update_order_info_ongoing.send('update_order_info_ongoing', {
          order_id: data[data.length - 1].order_id,
          grand_total: grandTotal,
          discount: customDiscountAmount,
        });
      }

      // Set the item to remove it from the array
      if (ongoingOrders) {
        const index = ongoingOrders.findIndex(
          (item) => item.order_id === foodItems.order_id
        );

        const updateOngoingOrders = ongoingOrders.splice(index, 1);

        setOngoingOrders(ongoingOrders);
        setReRender((prevState) => !prevState);
      }
    });

    posPrintInvoice();

    // window.update_order_info_ongoing.once(
    //   'update_order_info_ongoing_response',
    //   (args) => {
    //     console.log('))))))))))))))))))))))))))))))))))))))', args);
    //   }
    // );
  };

  const handleIncrement = () => {
    setCustomDiscountAmount((prevState) => parseInt(prevState) + 1);
  };

  const handleDecrement = () => {
    if (customDiscountAmount === 0) return;

    setCustomDiscountAmount((prevState) => parseInt(prevState) - 1);
  };

  function posPrintInvoice() {
    console.log('invoicePrintDivId', invoicePrintDivId.classList);
    // return;
    var printContents = document.querySelector(
      `.${invoicePrintDivId.classList.value}`
    ).innerHTML;

    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
  }

  console.log('invoicePrintDivId', invoicePrintDivId);

  return (
    <>
      <Modal
        title="Select Your Payment Method"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          setOpenModal(false);
          setCartItems([]);
        }}
        footer={null}
        width={1200}
      >
        <Row className="order_wrapper">
          <Col lg={8}>
            <div className="order_summary">
              <div className="order_summary_heading">
                <Title level={5}>Order Summary</Title>
              </div>

              <div className="total_order_amount">
                <Title level={4}>
                  Your Cart: {Array.isArray(foodData) && foodData?.length}{' '}
                  item(s){' '}
                  <span style={{ float: 'right' }}>
                    {settings.currency_icon}
                    {calc.getTotalPrice()}
                  </span>
                </Title>
              </div>

              <div style={{ height: '330px', overflowY: 'scroll' }}>
                {foodData?.length > 0 &&
                  foodData?.map((item, index) => (
                    <div
                      className="flex content_between order_item"
                      key={index}
                    >
                      <h3>
                        {item?.product_name}
                        <span
                          style={{
                            fontSize: 13,
                            marginLeft: '0.5rem',
                            fontWeight: 400,
                          }}
                        >
                          ({item.quantity} x {item?.price})
                        </span>
                      </h3>
                      <h3>
                        {settings?.position === 'left' &&
                          settings.currency_icon}{' '}
                        {item.quantity * item?.price}{' '}
                        {settings?.position === 'right' &&
                          settings.currency_icon}
                      </h3>
                    </div>
                  ))}
              </div>

              <div className="total_order">
                <Title level={4}>
                  Subtotal{' '}
                  <span style={{ float: 'right' }}>
                    {settings?.position === 'left' && settings.currency_icon}{' '}
                    {grandTotal}{' '}
                    {settings?.position === 'right' && settings.currency_icon}
                  </span>
                </Title>
                <Title level={4}>
                  Service Charge{' '}
                  <span style={{ float: 'right' }}>
                    {settings?.position === 'left' && settings.currency_icon}{' '}
                    {invoiceData?.serviceCharge
                      ? invoiceData?.serviceCharge
                      : '0.00'}{' '}
                    {settings?.position === 'right' && settings.currency_icon}
                  </span>
                </Title>
                <Title level={4}>
                  GST @ {settings?.vat}%{' '}
                  <span style={{ float: 'right' }}>
                    {settings?.position === 'left' && settings.currency_icon}{' '}
                    {calc.getVat() ? calc.getVat() : '0.00'}{' '}
                    {settings?.position === 'right' && settings.currency_icon}
                  </span>
                </Title>
              </div>

              <div className="total_order_discount">
                <Title level={4} style={{ marginTop: '10px' }}>
                  Discount:
                </Title>

                <div className="discount_input_wrapper">
                  {settings?.position === 'left' && settings.currency_icon}{' '}
                  <input
                    type="number"
                    value={customDiscountAmount}
                    onChange={(e) => setCustomDiscountAmount(e.target.value)}
                    className="discount_input"
                  />
                  <div className="discount_buttons">
                    <button onClick={handleIncrement}>+</button>
                    <button onClick={handleDecrement}>-</button>
                  </div>
                  {settings?.position === 'right' && settings.currency_icon}
                </div>
              </div>

              <div className="total_grand_item">
                <Title level={4}>
                  Grand Total:
                  <span style={{ float: 'right' }}>
                    {settings?.position === 'left' && settings.currency_icon}{' '}
                    {grandTotal}{' '}
                    {settings?.position === 'right' && settings.currency_icon}
                  </span>
                </Title>
              </div>
            </div>
          </Col>

          <Col lg={16}>
            <div className="order_calculation">
              <div className="order_calculation_heading">
                <Title level={5}>Select Payment Type</Title>
              </div>

              <Space>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: '#1aa25a',
                    borderColor: '#1aa25a',
                    marginLeft: 10,
                  }}
                >
                  Cash Payment
                </Button>
                <Button disabled>Card Payment</Button>
                <Button disabled>Mobile Payment</Button>
                <Button disabled>SSL Commerz</Button>
                <Button disabled>Two Checkout</Button>
                <Button disabled>Food Panda</Button>
              </Space>

              <div
                style={{
                  minHeight: '265px',
                  marginTop: '2.2rem',
                  marginLeft: '1.5rem',
                }}
              >
                <Title level={4}>Total Payable Amount</Title>
                <h3>
                  {settings?.position === 'left' && settings.currency_icon}{' '}
                  {grandTotal}{' '}
                  {settings?.position === 'right' && settings.currency_icon}
                </h3>
              </div>

              <div
                style={{
                  background: '#ddd',
                  minHeight: '290px',
                  padding: '1.5rem',
                }}
              >
                <Row gutter={20}>
                  <Col lg={15}></Col>
                  <Col lg={9}>
                    <Space className="flex" style={{ flexDirection: 'column' }}>
                      <Button
                        className="premium_btn"
                        style={{ padding: '0 3.4rem' }}
                        type="primary"
                      >
                        Due Invoice
                      </Button>
                      <Button
                        className="premium_btn"
                        style={{ padding: '0 3.2rem' }}
                        type="primary"
                      >
                        Change Due:
                      </Button>
                      <Button
                        className="premium_btn"
                        style={{ padding: '0 2.4rem' }}
                        type="primary"
                      >
                        Payable Amount:
                      </Button>
                      <Button type="primary" onClick={handlePayBtn}>
                        Pay Now &amp; Print Invoice
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>

      <InVoiceGenerate
        settings={settings}
        foodItems={onGoingOrderData}
        foodData={invoiceData}
        setInvoicePrintDivId={setInvoicePrintDivId}
        customerName={customerName}
        grandTotal={grandTotal}
        customDiscountAmount={customDiscountAmount}
        serviceCharge={invoiceData?.serviceCharge | 0}
      />
    </>
  );
};

export default QuickOrderModal;
