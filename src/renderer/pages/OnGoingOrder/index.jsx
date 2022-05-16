import { Col, Input, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import InVoiceGenerate from 'renderer/components/InVoiceGenerate';
import OnGoingOrderItems from 'renderer/components/OnGoingOrderItems';
import { ContextData } from 'renderer/contextApi';
import { getDataFromDatabase } from '../../../helpers';
import OnGoingFooter from '../../components/OnGoingFooter';
import Header from '../../components/partials/Header';

const OnGoingOrder = ({ settings }) => {
  window.get_all_order_info_ongoing.send('get_all_order_info_ongoing', {
    status: true,
  });

  const { cartItems, setCartItems } = useContext(ContextData);

  const [activeInactiveBtn, setActiveInactiveBtn] = useState({});
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [orderComplete, setOrderComplete] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [invoicePrintDivId, setInvoicePrintDivId] = useState(null);
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    getDataFromDatabase(
      'get_all_order_info_ongoing_response',
      window.get_all_order_info_ongoing
    ).then((data) => {
      if (Array.isArray(data) && data?.length > 0) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', data);
        setOngoingOrders(data);
      }
    });
  }, [reRender]);

  const handleSearchOnGoingOrder = (e) => {
    setSearchValue(e.target.value);

    const searchData = ongoingOrders.filter((orderItem) =>
      orderItem.order_id.toString().match(new RegExp(e.target.value, 'g'))
    );

    if (searchData?.length > 0 && e.target.value.length > 0) {
      setOngoingOrders(searchData);
    } else {
      setReRender((prevState) => !prevState);
    }
  };

  return (
    <div className="main_wrapper">
      <Header settings={settings} />

      <div
        className="on_going_order_menu"
        style={{
          margin: '0rem 1.2rem 1.2rem',
          minHeight: '74vh',
        }}
      >
        {openSearchInput === true && (
          <Row className="search_food_wrapper">
            <Col lg={14} push={5}>
              <Input
                type="text"
                placeholder="Search"
                size="large"
                style={{ margin: '1rem 0rem', transition: 'all 0.5s linear' }}
                value={searchValue}
                onChange={(e) => handleSearchOnGoingOrder(e)}
              />
            </Col>
          </Row>
        )}

        <OnGoingOrderItems
          setActiveInactiveBtn={setActiveInactiveBtn}
          ongoingOrders={ongoingOrders}
          setOngoingOrders={setOngoingOrders}
          setOrderComplete={setOrderComplete}
        />
      </div>

      <InVoiceGenerate
        settings={settings}
        foodItems={cartItems}
        setInvoicePrintDivId={setInvoicePrintDivId}
      />

      <OnGoingFooter
        openSearchInput={openSearchInput}
        setOpenSearchInput={setOpenSearchInput}
        orderComplete={orderComplete}
        settings={settings}
        activeInactiveBtn={activeInactiveBtn}
        setReRender={setReRender}
        ongoingOrders={ongoingOrders}
        setOngoingOrders={setOngoingOrders}
      />
    </div>
  );
};

export default OnGoingOrder;
