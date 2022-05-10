import {
  FileAddOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { faCalculator, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  TimePicker,
} from 'antd';
import { useEffect, useState } from 'react';
import AddCustomerModal from '../AddCustomerModal';
import Calculator from '../Calculator';
import FoodNoteModal from '../FoodNoteModal';
import PremiumVersion from '../partials/PremiumVersion';
import {
  CalculatePrice,
  getDataFromDatabase,
  getDiscountAmount,
  getServiceCharge,
} from './../../../helpers';
import './cart.styles.scss';
import ConfirmOrderModal from './ConfirmOrderModal';
import WarmingModal from './WarmingModal';

const { Option } = Select;
const { TextArea } = Input;

const Cart = ({ settings, cartItems, setCartItems, state }) => {
  const [customerTypes, setCustomerTypes] = useState([]);

  window.fetch_customer_table.send('fetch_customer_table', { status: true });
  window.get_customer_names.send('get_customer_names', { status: true });
  window.get_waiter_names.send('get_waiter_names', { status: true });
  window.create_customer_type.send('create_customer_type', { status: true });

  window.create_customer_type.once(
    'create_customer_type_response',
    (event, args) => {
      console.log('data read', event);
      setCustomerTypes(args);
    }
  );

  const format = 'HH:mm';
  const [form] = Form.useForm();
  const [addCustomerName] = Form.useForm();
  const calcPrice = new CalculatePrice(settings, cartItems);
  const [warmingModal, setWarmingModal] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [foodNoteModal, setFoodNoteModal] = useState(false);
  const [premiumVersion, setPremiumVersion] = useState(false);
  const [openCalculator, setOpenCalculator] = useState(false);
  const [addCustomerModal, setAddCustomerModal] = useState(false);

  const [cartData, setCartData] = useState({ cartItems });
  const [quickOrderAdditionalData, setQuickOrderAdditionalData] =
    useState(null);

  const [customServiceCharge, setCustomServiceCharge] = useState(0);
  const [addFoodNoteToItem, setAddFoodNoteToItem] = useState({});
  const [tableDataLists, setTableDataLists] = useState([]);
  const [customDiscount, setCustomDiscount] = useState(0);
  const [quantityValue, setQuantityValue] = useState(1);
  const [customerList, setCustomerList] = useState([]);
  const [waiterLists, setWaiterLists] = useState([]);
  const [addCustomer, setAddCustomer] = useState([]);
  const [confirmBtn, setConfirmBtn] = useState('');
  const [customerId, setCustomerId] = useState(0);

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    if (settings?.discountrate) {
      setCustomDiscount(settings?.discountrate);
    } else {
      setCustomDiscount(0);
    }

    if (settings?.servicecharge) {
      setCustomServiceCharge(settings?.servicecharge);
    } else {
      setCustomServiceCharge(0);
    }

    getDataFromDatabase(
      'get_customer_names_response',
      window.get_customer_names
    ).then((data = []) => {
      setCustomerList(data);
    });

    setAddCustomer([
      {
        name: ['customer_name'],
      },
      {
        name: ['customer_email'],
      },
      {
        name: ['customer_phone'],
      },
      {
        name: ['customer_address'],
      },
    ]);
  }, [reRender, settings]);

  useEffect(() => {
    setCartData({ ...cartData, cartItems });
  }, [cartItems]);

  useEffect(() => {
    getDataFromDatabase(
      'get_waiter_names_response',
      window.get_waiter_names
    ).then((args = []) => {
      setWaiterLists(args);
    });

    getDataFromDatabase(
      'fetch_customer_table_response',
      window.fetch_customer_table
    ).then((response) => {
      setTableDataLists(response);
    });
  }, []);

  const handleDiscount = (e) => {
    const { value } = e.target;
    if (value < 0) return;

    setCustomDiscount(value);
  };

  const handleServiceCharge = (e) => {
    const { value } = e.target;
    if (value < 0) return;

    setCustomServiceCharge(value);
  };

  const selectTime = (time, timeString) => {
    console.log('Cooking time', timeString);
  };

  const handleDeleteItem = (item) => {
    // CartItems is array
    const updateCart = cartItems.filter(
      (cartItem) => cartItem.cartId !== item.cartId
    );

    setCartItems(updateCart);

    if (updateCart) {
      message.success({
        content: 'Successfully deleted the item.',
        className: 'custom-class',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });
    }
  };

  const handleResetAll = () => {
    form.resetFields();
    setCartItems([]);

    if (localStorage.getItem('order_id')) {
      localStorage.removeItem('order_id');
    }

    message.success({
      content: 'Reset successfully',
      className: 'custom-class',
      duration: 1,
      style: { marginTop: '5vh', float: 'right' },
    });
  };

  const handleCalculation = () => {
    setOpenCalculator(true);
  };

  const handleSubmitOrder = (data) => {
    if (cartItems?.length === 0) {
      setWarmingModal(true);
    } else {
      const orderCalculateInfo = {
        grandTotal: getGrandTotalAmount(),
        discount: getDiscountAmount(
          settings,
          customDiscount,
          calcPrice.getTotalPrice()
        ),
        serviceCharge: getServiceCharge(
          settings,
          customServiceCharge,
          calcPrice.getTotalPrice()
        ),
        vat: calcPrice.getVat(),
      };

      if (data === 'quickOrder') {
        setConfirmBtn(data);
        setConfirmOrder(true);

        const customerOrder = {
          confirmBtn,
          customerId,
          ...orderCalculateInfo,
        };

        setQuickOrderAdditionalData(customerOrder);

        localStorage.setItem('order', JSON.stringify(customerOrder));

        if (localStorage.getItem('order_id')) {
          localStorage.removeItem('order_id');
        }
      } else if (data === 'placeOrder') {
        window.insert_order_info.send('insert_order_info', {
          cartItems,
          customer_id: customerId,
          ...orderCalculateInfo,
        });

        setConfirmBtn(data);
        setConfirmOrder(true);
      }
    }
  };

  const handleUpdateOrder = (orderBtn) => {
    if (localStorage.getItem('order_id')) {
      setConfirmBtn(orderBtn);
      setConfirmOrder(true);
      const orderCalculateInfo = {
        grand_total: getGrandTotalAmount(),
        discount: getDiscountAmount(
          settings,
          customDiscount,
          calcPrice.getTotalPrice()
        ),
        serviceCharge: getServiceCharge(
          settings,
          customServiceCharge,
          calcPrice.getTotalPrice()
        ),
        vat: calcPrice.getVat(),
      };

      window.update_order_info_after_edit.send('update_order_info_after_edit', {
        ...state,
        order_info: cartItems,
        ...orderCalculateInfo,
      });
      localStorage.removeItem('order_id');
    }
  };

  const handleAddCustomer = () => {
    setAddCustomerModal(true);
  };

  const handleSubmit = () => {
    console.log('submitted');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleFoodQuantity = (quantity, item) => {
    const index = cartItems.findIndex(
      (cartItem) => cartItem.cartId === item.cartId
    );

    setCartItems([
      ...cartItems.slice(0, index),
      { ...item, quantity, total_price: quantity * item.price },
      ...cartItems.slice(index + 1),
    ]);
  };

  const handleSelectCustomer = (value) => {
    setCustomerId(value);
  };

  const handleFoodNoteModal = (foodItem) => {
    setAddFoodNoteToItem(foodItem);
    setFoodNoteModal(true);
  };

  function getGrandTotalAmount() {
    return (
      calcPrice.getGrandTotal() -
      getDiscountAmount(settings, customDiscount, calcPrice.getTotalPrice()) +
      getServiceCharge(settings, customServiceCharge, calcPrice.getTotalPrice())
    );
  }

  return (
    <div className="cart_wrapper">
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
      >
        <div className="form_content">
          <div className="banner_card">
            <Row gutter={30}>
              <Col lg={window.innerWidth < 1315 ? 20 : 10} xl={11} xxl={11}>
                <Form.Item
                  label="Customer Name"
                  className="custom_level"
                  name="customer_name"
                >
                  <Select
                    placeholder="Select a Customer Name"
                    size="large"
                    allowClear
                    defaultValue={'Walk In'}
                    onChange={handleSelectCustomer}
                  >
                    <Option value="0">Walk In</Option>
                    {customerList?.map((customer) => (
                      <Option key={customer?.id} value={customer?.id}>
                        {customer?.customer_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={window.innerWidth < 1315 ? 4 : 4} xl={2} xxl={2}>
                <Button
                  className="add_customer"
                  onClick={() => handleAddCustomer()}
                >
                  <PlusCircleOutlined />
                </Button>
              </Col>

              {window.innerWidth > 1315 && (
                <Col lg={10} xl={11} xxl={11}>
                  <Form.Item
                    label="Customer Type"
                    className="custom_level"
                    name="customer_type"
                  >
                    <Select
                      placeholder="Select a Customer Type"
                      size="large"
                      allowClear
                    >
                      {customerTypes?.length > 0 &&
                        customerTypes.map((type) => (
                          <Option key={`type-${type.id}`} value={type.id}>
                            {type.customertype}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>

            {window.innerWidth > 1315 && (
              <Row gutter={30}>
                <Col lg={8} xl={7} xxl={7}>
                  <Form.Item
                    label="Waiter"
                    className="custom_level"
                    name="waiter"
                  >
                    <Select placeholder="Select Waiter" size="large" allowClear>
                      {waiterLists?.map((waiter) => (
                        <Option key={waiter?.id} value={waiter?.id}>
                          {waiter?.first_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={4} xl={3} xxl={3}>
                  <Button size="large" type="primary" className="add_customer">
                    Person
                  </Button>
                </Col>

                <Col lg={6} xl={7} xxl={7}>
                  <Form.Item
                    label="Table"
                    className="custom_level"
                    name="table_no"
                  >
                    <Select
                      placeholder="Select Table No"
                      size="large"
                      allowClear
                    >
                      {tableDataLists?.map((tableData) => (
                        <Option key={tableData?.id} value={tableData?.id}>
                          {tableData?.tablename}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={6} xl={7} xxl={7}>
                  <Form.Item
                    label="Cooking Time"
                    className="custom_level"
                    name="cookingTime"
                  >
                    <TimePicker
                      size="large"
                      onChange={selectTime}
                      format={format}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </div>
        </div>

        <div className="select_product_item">
          <div className="product_item_table">
            {cartItems?.length === 0 ? (
              <div className="empty_cart">
                <div className="empty_cart_item">
                  <ShoppingCartOutlined />
                </div>
              </div>
            ) : (
              <div className="product_list_table">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Variant Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.length &&
                      cartItems.map((item, index) => {
                        return (
                          <tr key={index}>
                            {item?.add_on_id ? (
                              <th style={{ paddingLeft: 60 }}>
                                {item.product_name}
                              </th>
                            ) : (
                              <th>
                                <FileAddOutlined
                                  style={{
                                    padding: '0rem 0.4rem 0rem 1rem',
                                    color: '#0037ff',
                                    fontSize: '20px',
                                  }}
                                  onClick={() => handleFoodNoteModal(item)}
                                />
                                {item.product_name}
                              </th>
                            )}
                            <th>{item.foodVariant}</th>
                            <th>{item.price}</th>

                            <th>
                              <InputNumber
                                value={item.quantity}
                                min={1}
                                max={100}
                                onChange={(e) => handleFoodQuantity(e, item)}
                                className="quantity_value"
                              />
                            </th>
                            <th>{item.total_price}</th>
                            <th>
                              <Space size="middle" className="delete_icon">
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  onClick={() => handleDeleteItem(item)}
                                />
                              </Space>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="cart_footer">
          <div className="service_charge">
            <Row>
              <Col lg={settings?.discount_type ? 9 : 12}>
                <b>Vat/Tax: </b>
                {settings?.vat ? settings?.vat : 0}%
              </Col>
              <Col lg={settings?.discount_type ? 9 : 12}>
                <b>Service Charge: </b>
                {settings?.position === 'left' && settings.currency_icon}{' '}
                <input
                  type="number"
                  value={customServiceCharge}
                  onChange={handleServiceCharge}
                  style={{
                    width: '55px',
                    border: '1px solid #ddd',
                    padding: 4,
                  }}
                />
                {/* <span
                  contentEditable
                  style={{
                    width: '35px',
                    display: 'inline-block',
                    textAlign: 'center',
                    border: '1px solid #ddd',
                  }}
                > */}
                {/* {settings?.servicecharge ? settings?.servicecharge : 0} */}
                {/* </span> */}
                {settings?.position === 'right' && settings.currency_icon}{' '}
                {settings?.service_chargeType !== 'amount' && '(%)'}
              </Col>

              {/* Discount type 2 = percent & Discount type 1 = amount */}
              {settings?.discount_type && (
                <Col lg={6}>
                  <b>Discount: </b>
                  {settings?.discount_type === 1 && settings.currency_icon}{' '}
                  <input
                    type="number"
                    value={customDiscount}
                    onChange={handleDiscount}
                    style={{
                      width: '55px',
                      border: '1px solid #ddd',
                      padding: 4,
                    }}
                  />
                  {settings?.discount_type === 2 && '(%)'}
                </Col>
              )}
            </Row>
          </div>

          <div className="grand_total">
            <div>
              <span>Grand Total</span>
            </div>
            <div>
              {cartItems?.length !== 0 ? (
                <span>
                  {settings?.position === 'left' && settings.currency_icon}
                  {getGrandTotalAmount()}
                  {settings?.position === 'right' && settings.currency_icon}
                </span>
              ) : (
                <span>
                  {settings?.position === 'left' && settings.currency_icon} 0.00{' '}
                  {settings?.position === 'right' && settings.currency_icon}
                </span>
              )}
            </div>
          </div>

          <div className="cartBtn_wrapper">
            {state?.order_id ? (
              <Button
                onClick={() => handleUpdateOrder('updateOrder')}
                type="primary"
                className="update_order_btn cartGroup_btn"
              >
                Update Order
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleCalculation}
                  className="calculator_btn cartGroup_btn flex content_center"
                  size="large"
                >
                  <FontAwesomeIcon icon={faCalculator} />
                </Button>

                <Button
                  size="large"
                  className="delete_selected_item cartGroup_btn"
                  onClick={handleResetAll}
                >
                  Cancel
                </Button>

                <Button
                  size="large"
                  className="quick_order_btn cartGroup_btn"
                  onClick={() => handleSubmitOrder('quickOrder')}
                >
                  Quick Order
                </Button>

                <Button
                  size="large"
                  className="place_order_btn cartGroup_btn"
                  onClick={() => handleSubmitOrder('placeOrder')}
                >
                  Place Order
                </Button>
              </>
            )}
          </div>
        </div>
      </Form>

      <AddCustomerModal
        customerInfo={{
          addCustomerModal: addCustomerModal,
          setAddCustomerModal: setAddCustomerModal,
          addCustomer: addCustomer,
          setAddCustomer: setAddCustomer,
          setReRender: setReRender,
        }}
      />

      <WarmingModal
        setWarmingModal={setWarmingModal}
        warmingModal={warmingModal}
      />

      {/* {confirmOrder && ( */}
      <ConfirmOrderModal
        confirmOrder={confirmOrder}
        setConfirmOrder={setConfirmOrder}
        confirmBtn={confirmBtn}
        settings={settings}
        printId={'printId'}
        quickOrderAdditionalData={quickOrderAdditionalData}
        state={state}
      />
      {/* )} */}

      <PremiumVersion
        premiumVersion={premiumVersion}
        setPremiumVersion={setPremiumVersion}
      />

      {foodNoteModal && (
        <FoodNoteModal
          foodNoteModal={foodNoteModal}
          setFoodNoteModal={setFoodNoteModal}
          addFoodNoteToItem={addFoodNoteToItem}
        />
      )}

      <Modal
        visible={openCalculator}
        onOk={() => setOpenCalculator(false)}
        onCancel={() => setOpenCalculator(false)}
        footer={null}
        closable={false}
        width={0}
      >
        <Calculator setOpenCalculator={setOpenCalculator} />
      </Modal>
    </div>
  );
};

export default Cart;
