import { Col, ConfigProvider, Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from 'renderer/components/Cart';
import FoodLists from 'renderer/components/FoodLists';
import Header from 'renderer/components/partials/Header';
import Search from 'renderer/components/Search';
import InsertSettingsModal from './../../components/InsertSettingsModal';
import PosSidebar from './../../components/PosSidebar';
import { ContextData } from './../../contextApi';
import './Home.style.scss';

const Home = ({ settings }) => {
  window.get_settings.send('get_settings', { status: true });

  // Get all food list as an array
  window.get_food_list_pos.send('get_food_list_pos', { status: true });

  // Get all food variant lists as an array
  window.variant_lists_channel.send('variant_lists_channel', { status: true });

  // Food lists (Only ID)
  window.get_food_name_lists_channel.send('get_food_name_lists_channel', {
    status: true,
  });

  // Addons lists (Only ID)
  window.get_addons_name_list.send('get_addons_name_list', { status: true });
  window.get_addons_list_for_pos.send('get_addons_list_for_pos', {
    status: true,
  });

  let navigate = useNavigate();
  const { state } = useLocation();

  const [insertSettingsModal, setInsertSettingsModal] = useState(false);
  const { cartItems, setCartItems } = useContext(ContextData);
  const [addonNames, setAddonNames] = useState(null);
  const [addonsList, setAddonsList] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState();
  const [foodNames, setFoodNames] = useState(null);
  const [foodLists, setFoodLists] = useState([]);

  useEffect(() => {
    Promise.all([
      getDataFromDatabase(
        'get_food_list_pos_response',
        window.get_food_list_pos
      ),
      getDataFromDatabase(
        'variant_lists_response',
        window.variant_lists_channel
      ),
      getDataFromDatabase(
        'get_addons_list_for_pos_response',
        window.get_addons_list_for_pos
      ),
    ])
      .then(([foodNames, variants, addons]) => {
        let newFoods = [];

        foodNames?.forEach((food, index) => {
          const newAddons = addons
            .filter((addon) => addon.food_id === food.id)
            .map((item) => ({ ...item, quantity: 1 }));

          const newVariants = variants.filter(
            (variant) => variant.food_id === food.id
          );

          newFoods.push({
            id: food.id,
            category_id: food.category_id,
            product_name: food.product_name,
            product_image: food.product_image,
            date_inserted: food.date_inserted,
            quantity: 1,
            variants: [...newVariants],
            addons: [...newAddons],
          });
        });

        const foods = newFoods.map((food) => {
          return {
            ...food,
            variants: [
              ...food.variants.map((variant) => ({ ...variant, quantity: 1 })),
            ],
          };
        });

        setFoodLists(foods);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getDataFromDatabase('get_settings_response', window.get_settings).then(
      (result) => {
        if (!result.storename) {
          setInsertSettingsModal(true);
        }
      }
    );
  }, []);

  return (
    <>
      <div className="main_wrapper">
        <Header settings={settings} />

        <div className="pos_wrapper">
          <ConfigProvider direction={settings.site_align}>
            <Row className="pos_system">
              <Col md={5} lg={5} xl={4} xxl={4}>
                <PosSidebar
                  foodLists={foodLists}
                  setFoodLists={setFoodLists}
                  settings={settings}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={setSelectedMenu}
                />
              </Col>

              <Col md={19} lg={19} xl={20} xxl={20}>
                <Row>
                  <Col md={14} lg={14} xl={14} xxl={14}>
                    <Row className="search_food_wrapper">
                      <Col lg={18} push={3}>
                        <Search foodLists={foodLists} />
                      </Col>
                    </Row>

                    <div className="foodItems_wrapper">
                      <Row className="foodList_wrapper">
                        <FoodLists
                          setCartItems={setFoodLists}
                          foodLists={foodLists}
                          selectedMenu={selectedMenu}
                          setSelectedMenu={setSelectedMenu}
                        />
                      </Row>
                    </div>
                  </Col>

                  <Col md={10} lg={10} xl={10} xxl={10}>
                    <Cart
                      settings={settings}
                      setCartItems={setCartItems}
                      cartItems={cartItems}
                      state={state}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </ConfigProvider>
        </div>
      </div>

      <InsertSettingsModal
        insertSettingsModal={insertSettingsModal}
        setInsertSettingsModal={setInsertSettingsModal}
      />
    </>
  );
};

export default Home;
