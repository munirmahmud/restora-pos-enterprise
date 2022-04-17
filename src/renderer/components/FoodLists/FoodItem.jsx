import {
  Button,
  Checkbox,
  Col,
  Image,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { useContext, useState } from 'react';
import foodItemFallback from '../../../../assets/fallback-food-item.jpg';
import { ContextData } from './../../contextApi';
import './food.item.styles.scss';

const { Title } = Typography;

const FoodItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [variantPrice, setVariantPrice] = useState(0);
  const [variantFixedPrice, setVariantFixedPrice] = useState(0);
  const [foodVariantName, setFoodVariantName] = useState('');

  // Only for addons
  const [addonForCartItem, setAddonForCartItem] = useState([]);
  const [addonsQuantity, setAddonsQuantity] = useState(1);
  const [addonsPrice, setAddonsPrice] = useState(0);

  const [variantForCartItem, setVariantForCartItem] = useState([]);

  const { cartItems, setCartItems } = useContext(ContextData);

  // Onclick opens a modal
  const handleFoodItem = (e, item) => {
    setClickedItem(null);
    const isCartItemExist = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    setAddonsQuantity(1);

    if (Array.isArray(item?.variants) && item?.variants?.length > 1) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setClickedItem(item);
      setOpenModal(true);

      setFoodQuantity(item?.variants[0]?.quantity);

      if (foodVariantName) {
        setFoodVariantName((prevState) => ({ ...prevState }));
      } else {
        setFoodVariantName(item?.variants[0]);
      }
    } else if (Array.isArray(item?.addons) && item?.addons?.length > 0) {
      setVariantPrice(item.variants[0].price);
      setVariantFixedPrice(item.variants[0].price);
      setClickedItem(item);
      setOpenModal(true);

      if (foodVariantName) {
        setFoodVariantName((prevState) => ({ ...prevState }));
      } else {
        setFoodVariantName(item?.variants[0]);
      }
    } else {
      if (!isCartItemExist) {
        const cartItem = {
          id: item.id,
          isSelected: true,
          product_name: item.product_name,
          foodVariant: item.variants[0].variant_name,
          price: item.variants[0].price,
          total_price: item.variants[0].price,
          quantity: item.variants[0].quantity,
          date_inserted: item.variants[0].date_inserted,
        };

        e.currentTarget.style.borderColor = '#297600';
        setCartItems([...cartItems, cartItem]);
      } else {
        const index = cartItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        const newCartItems = [
          ...cartItems.slice(0, index),
          {
            ...isCartItemExist,
            quantity: (isCartItemExist.quantity += 1),
            total_price: isCartItemExist.quantity * isCartItemExist.price,
          },
          ...cartItems.slice(index + 1),
        ];

        setCartItems([...newCartItems]);

        // if (item.id) {
        //   message.info({
        //     content: `${isCartItemExist.product_name} has already been added. That's why we just increased the amount & price.`,
        //     duration: 1,
        //     style: {
        //       marginTop: '5vh',
        //       float: 'right',
        //     },
        //   });
        // }
      }
    }
  };

  const handleAddToCart = (e, item) => {
    const isVariantExist = cartItems.find(
      (cartItem) => cartItem.cartId === foodVariantName.date_inserted
    );

    const isAddonExist = cartItems.find(
      (cartItem) => cartItem.cartId === addonForCartItem.date_inserted
    );

    let checkedAddons = addonForCartItem.filter((item) => item.isSelected);

    if (!isVariantExist) {
      const cartItem = {
        id: item.id,
        isSelected: true,
        cartId: foodVariantName.date_inserted,
        product_name: item.product_name,
        foodVariant: foodVariantName.variant_name,
        price: variantFixedPrice,
        total_price: variantPrice,
        quantity: foodQuantity ? foodQuantity : item.quantity,
      };

      const foundAddon = cartItems.find((cartItem) => {
        const isAddonExist = checkedAddons.find(
          (addonItem) => addonItem.food_id === cartItem.food_id
        );

        return isAddonExist;
      });

      if (foundAddon) {
        const addonIndex = cartItems.findIndex(
          (addonItem) => addonItem.cartId === foundAddon.cartId
        );

        setCartItems([
          ...cartItems.slice(0, addonIndex),
          { ...foundAddon },
          ...cartItems.slice(addonIndex + 1),
          cartItem,
        ]);
      } else {
        setCartItems([...cartItems, { ...cartItem }, ...checkedAddons]);
      }

      setOpenModal(false);
    } else {
      let updateExistingCart = [];

      if (isVariantExist) {
        const variantIndex = cartItems.findIndex(
          (cartItem) => cartItem.cartId === foodVariantName.date_inserted
        );

        updateExistingCart = [
          ...cartItems.slice(0, variantIndex),
          {
            ...isVariantExist,
            quantity: isVariantExist.quantity + foodQuantity,
            total_price: isVariantExist.total_price + variantPrice,
          },
          ...cartItems.slice(variantIndex + 1),
        ];
      } else {
        updateExistingCart = [
          ...cartItems,
          {
            ...foodVariantName,
            foodVariant: foodVariantName.variant_name,
            quantity: foodQuantity,
            total_price: variantPrice,
          },
        ];
      }

      let newAddons = [];

      const newCartItems = updateExistingCart.map((cartItem, index) => {
        const isAddonExist = checkedAddons.find(
          (addonItem) => addonItem.cartId === cartItem.cartId
        );

        const addonIndex = checkedAddons.findIndex(
          (addonItem) => addonItem.cartId === cartItem.cartId
        );

        let modifiedAddons = [];
        if (isAddonExist && isAddonExist.food_id === cartItem.food_id) {
          checkedAddons = [
            ...checkedAddons.slice(0, addonIndex),

            {
              ...isAddonExist,
              quantity: isAddonExist.quantity + addonsQuantity,
              total_price: isAddonExist.total_price + isAddonExist.price,
            },
            ...checkedAddons.slice(addonIndex + 1),
          ];

          if (isAddonExist.food_id === foodVariantName.date_inserted) {
            // updateExistingCart.splice(index, 1);
          }
        } else {
          newAddons.push(cartItem);
        }
      });

      setCartItems([...newAddons, ...checkedAddons]);
      setOpenModal(false);

      // message.info({
      //   content: `${foodVariantName.variant_name} variant has already been added, we just increased the amount.`,
      //   duration: 1,
      //   style: {
      //     marginTop: '5vh',
      //     float: 'right',
      //   },
      // });
    }
  };

  const handleMultipleItemAdd = (e, item) => {
    const isCartItemExist = cartItems.find(
      (cartItem) => cartItem.cartId === foodVariantName.date_inserted
    );

    const isVariantExist = cartItems.find(
      (cartItem) => cartItem.foodVariant === foodVariantName.variant_name
    );

    let checkedAddons = addonForCartItem.filter((item) => item.isSelected);

    if (!isCartItemExist) {
      const cartItem = {
        id: item.id,
        isSelected: true,
        cartId: foodVariantName.date_inserted,
        product_name: item.product_name,
        foodVariant: foodVariantName.variant_name,
        price: variantFixedPrice,
        total_price: variantPrice,
        quantity: foodQuantity ? foodQuantity : item.quantity,
      };

      const foundAddon = cartItems.find((cartItem) => {
        const isAddonExist = checkedAddons.find(
          (addonItem) => addonItem.food_id === cartItem.food_id
        );

        return isAddonExist;
      });

      if (foundAddon) {
        const addonIndex = cartItems.findIndex(
          (addonItem) => addonItem.cartId === foundAddon.cartId
        );

        setCartItems([
          ...cartItems.slice(0, addonIndex),
          { ...foundAddon },
          ...cartItems.slice(addonIndex + 1),
          cartItem,
        ]);
      } else {
        setCartItems([...cartItems, { ...cartItem }, ...checkedAddons]);
      }
    } else {
      let updateExistingCart = [];

      if (isVariantExist) {
        const variantIndex = cartItems.findIndex(
          (cartItem) => cartItem.cartId === foodVariantName.date_inserted
        );

        updateExistingCart = [
          ...cartItems.slice(0, variantIndex),
          {
            ...isVariantExist,
            quantity: isVariantExist.quantity + foodQuantity,
            total_price: isVariantExist.total_price + variantPrice,
          },
          ...cartItems.slice(variantIndex + 1),
        ];
      } else {
        updateExistingCart = [
          ...cartItems,
          {
            ...foodVariantName,
            foodVariant: foodVariantName.variant_name,
            quantity: foodQuantity,
            total_price: variantPrice,
          },
        ];
      }

      let newAddons = [];

      const newCartItems = updateExistingCart.map((cartItem, index) => {
        const isAddonExist = checkedAddons.find(
          (addonItem) => addonItem.cartId === cartItem.cartId
        );

        const addonIndex = checkedAddons.findIndex(
          (addonItem) => addonItem.cartId === cartItem.cartId
        );

        let modifiedAddons = [];
        if (isAddonExist && isAddonExist.food_id === cartItem.food_id) {
          checkedAddons = [
            ...checkedAddons.slice(0, addonIndex),

            {
              ...isAddonExist,
              quantity: isAddonExist.quantity + addonsQuantity,
              total_price: isAddonExist.total_price + isAddonExist.price,
            },
            ...checkedAddons.slice(addonIndex + 1),
          ];

          if (isAddonExist.food_id === foodVariantName.date_inserted) {
            // updateExistingCart.splice(index, 1);
          }
        } else {
          newAddons.push(cartItem);
        }
      });

      setCartItems([...newAddons, ...checkedAddons]);

      // message.info({
      //   content: `${foodVariantName.variant_name} variant has already been added we just increased the amount`,
      //   duration: 1,
      //   style: {
      //     marginTop: '5vh',
      //     float: 'right',
      //   },
      // });
    }
  };

  // Addons list if check & uncheck
  function handleAddonsCheck(e, addonItem) {
    const addonObj = {
      id: addonItem.add_on_id,
      add_on_id: addonItem.add_on_id,
      food_id: addonItem.date_inserted,
      price: addonItem.price,
      total_price:
        addonsPrice === 0 ? addonsQuantity * addonItem.price : addonsPrice,
      tax0: addonItem.tax0,
      tax1: addonItem.tax1,
      foodId: addonItem.food_id,
      product_name: addonItem.add_on_name,
      isSelected: addonItem.isChecked,
      quantity: addonsQuantity,
      foodVariant: '',
      cartId: addonItem.date_inserted,
    };

    if (e.target.checked) {
      setAddonForCartItem([...addonForCartItem, addonObj]);

      const updateAddons = addonForCartItem.find(
        (item) => item.id === addonItem.add_on_id
      );

      const index = addonForCartItem.findIndex(
        (item) => item.id === addonItem.add_on_id
      );

      if (updateAddons) {
        setAddonForCartItem([
          ...addonForCartItem.slice(0, index),
          {
            ...updateAddons,
            total_price: addonsPrice,
            quantity: addonsQuantity,
            isSelected: addonItem.isChecked,
          },
          ...addonForCartItem.slice(index + 1),
        ]);
      } else {
        setAddonForCartItem([...addonForCartItem, addonObj]);
      }
    } else {
      const filterAddonsListIfUncheck = addonForCartItem.filter(
        (addonsItem) => addonsItem.add_on_id !== addonItem.add_on_id
      );

      setAddonForCartItem(filterAddonsListIfUncheck);
    }
  }

  const handleVariantPrice = (variant) => {
    const variantObj = JSON.parse(variant);
    const fixedPrice = variantObj.price;

    setVariantFixedPrice(fixedPrice);
    setFoodVariantName(variantObj);
    setVariantPrice(variantObj.price);
  };

  // TODO: Quantity value & price changes
  const calculateVariantQuantity = (quantity) => {
    setFoodQuantity(quantity);
    setVariantPrice(variantFixedPrice * quantity);
  };

  const handleAddons = (quantity, addonsItem) => {
    setAddonsQuantity(quantity);
    setAddonsPrice(quantity * addonsItem.price);

    const totalPrice = quantity * addonsItem.price;

    const isExistAddon = addonForCartItem.find(
      (item) => item?.id === addonsItem?.add_on_id
    );

    // add_on_id
    if (!isExistAddon) {
      setAddonForCartItem([
        ...addonForCartItem,
        {
          ...addonsItem,
          id: addonsItem.add_on_id,
          food_id: addonsItem.date_inserted,
          product_name: addonsItem.add_on_name,
          total_price: totalPrice,
          quantity,
        },
      ]);
    } else {
      const index = addonForCartItem.findIndex(
        (item) => item.id === addonsItem.add_on_id
      );

      setAddonForCartItem([
        ...addonForCartItem.slice(0, index),
        { ...isExistAddon, total_price: totalPrice, quantity },
        ...addonForCartItem.slice(index + 1),
      ]);
    }

    const updateItemPrice = clickedItem?.addons.find(
      (item) => item.add_on_id === addonsItem.add_on_id
    );

    const index = clickedItem?.addons.findIndex(
      (item) => item.add_on_id === updateItemPrice.add_on_id
    );

    const newAddons = [
      ...clickedItem?.addons.slice(0, index),
      { ...updateItemPrice, total_price: totalPrice, quantity },
      ...clickedItem?.addons.slice(index + 1),
    ];

    setClickedItem((prevState) => ({
      ...prevState,
      addons: newAddons,
    }));
  };

  return (
    <>
      <Col md={12} lg={6} xl={4} xxl={4}>
        <div className="food_card" onClick={(e) => handleFoodItem(e, item)}>
          <div className="food_image">
            {item?.product_image ? (
              <Image
                variant="top"
                src={item.product_image}
                alt={item.product_name}
                preview={false}
                fallback={foodItemFallback}
              />
            ) : (
              <div style={{ backgroundColor: '#ddd', height: '90px' }}>
                <Title
                  style={{
                    marginBottom: '0',
                    padding: '2rem 0.5rem',
                    color: '#818181',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  level={5}
                >
                  {item.product_name}
                </Title>
              </div>
            )}
          </div>

          <div className="card_body">
            <p>{item.product_name}</p>
          </div>
        </div>
      </Col>

      <Modal
        title="Add food variant or addons"
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={650}
      >
        <Row>
          <Col lg={24}>
            {clickedItem?.variants?.length > 0 && (
              <div className="select_item">
                <table>
                  <thead>
                    <tr>
                      <th>Item Information</th>
                      <th>Variant</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{clickedItem?.product_name}</td>
                      <td>
                        <select
                          name=""
                          onChange={(e) => handleVariantPrice(e.target.value)}
                          style={{
                            height: '1.9rem',
                            width: '5.5rem',
                            borderColor: '#ddd',
                          }}
                        >
                          {clickedItem?.variants?.map((addonItem, index) => (
                            <option
                              key={addonItem.id}
                              value={JSON.stringify(addonItem)}
                            >
                              {addonItem?.variant_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <InputNumber
                          min={1}
                          max={100}
                          value={foodQuantity}
                          bordered={true}
                          onChange={calculateVariantQuantity}
                        />
                      </td>
                      {/* <td>{clickedItem?.price}</td> */}
                      <td>{variantPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {clickedItem?.addons?.length > 0 && (
              <div className="select_item" style={{ marginTop: '1rem' }}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Add-ons Name</th>
                      <th>Add-ons Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clickedItem?.addons?.map((addonsItem) => (
                      <tr key={addonsItem?.add_on_name}>
                        <td>
                          <Checkbox
                            onChange={(e) =>
                              handleAddonsCheck(e, {
                                ...addonsItem,
                                isChecked: e.target.checked,
                              })
                            }
                          />
                        </td>

                        <td>{addonsItem?.add_on_name}</td>

                        <td>
                          <InputNumber
                            min={1}
                            max={100}
                            value={addonsItem?.quantity}
                            // value={addonsItem.quantity}
                            bordered={true}
                            onChange={(quantity) =>
                              handleAddons(quantity, addonsItem)
                            }
                          />
                        </td>
                        <td>{addonsItem?.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Space className="group_addToCart_btn flex ">
              <Button type="primary" onClick={(e) => handleAddToCart(e, item)}>
                Add to Cart
              </Button>
              <Button
                type="primary"
                onClick={(e) => handleMultipleItemAdd(e, item)}
              >
                Add Multiple Variant
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default FoodItem;
