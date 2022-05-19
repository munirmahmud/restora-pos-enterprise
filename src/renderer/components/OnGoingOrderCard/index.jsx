import { Col } from 'antd';
import './OnGoingOrderCard.style.scss';

const OnGoingOrderCard = ({
  orderCard,
  setOrderComplete,
  selectedItem,
  setActiveInactiveBtn,
}) => {
  const handleCartItem = (foodData) => {
    selectedItem(foodData);
    setOrderComplete(foodData);
    setActiveInactiveBtn(foodData);
  };

  return (
    <Col lg={6} xl={4} xxl={4}>
      <div className="on_going_menu_item">
        <div
          className="menu_info_content"
          onClick={() => handleCartItem(orderCard)}
          style={{
            borderColor: orderCard.isSelected ? '#0088f2' : '#caf6f7',
          }}
        >
          <li>Waiter: {orderCard?.waiter_name}</li>
          <li>Order Number: {orderCard?.order_id}</li>
          <li>Cocking Time: {orderCard?.cooking_time} Minutes</li>
          <li>Customer Type: {orderCard?.customer_type}</li>
          {orderCard?.is_active === 1 && <li>Status: Pending</li>}
        </div>
      </div>
    </Col>
  );
};

export default OnGoingOrderCard;
