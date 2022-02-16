import { Button, ConfigProvider, Row } from 'antd';
// import cashRegisterIcon from '../../../../../assets/icons/cash-register.png';
import './Header.style.scss';

// const { SubMenu } = Menu;
// const { Option } = Select;

const Header = ({ settings }) => {
  // const [form] = Form.useForm();
  // const [openModal, setOpenModal] = useState(false);
  // const [cashRegister, setCashRegister] = useState([]);
  // const [reRender, setReRender] = useState(false);

  // useEffect(() => {
  //   setCashRegister([
  //     {
  //       name: 'counter_number',
  //       // value: ,
  //     },
  //     {
  //       name: 'total_amount',
  //       // value: ,
  //     },
  //     {
  //       name: 'notes',
  //       // value: ,
  //     },
  //   ]);
  // }, []);

  // const handleSubmit = () => {
  //   const userCashRegister = {};

  //   for (const data of cashRegister) {
  //     userCashRegister[data.name[0]] =
  //       typeof data.value === 'string' ? data?.value.trim() : data?.value;
  //   }

  //   console.log('userCashRegister', userCashRegister);
  //   setOpenModal(false);
  //   form.resetFields();
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <>
      <ConfigProvider direction={settings.direction}>
        <Row>
          <div className="pos_header">
            <div>
              <Button type="primary" size="large" className="pos_btn new_order">
                New Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn on_going_order"
              >
                On Going Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn kitchen_status"
              >
                Kitchen Status
              </Button>
              <Button type="primary" size="large" className="pos_btn qr_order">
                QR Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn online_order"
              >
                Online Order
              </Button>
              <Button
                type="primary"
                size="large"
                className="pos_btn today_order"
              >
                Today Order
              </Button>
            </div>

            {/* <div className="right_panel_wrapper">
              <div
                onClick={() => setOpenModal(true)}
                title="Cash Register"
                className="image_icon"
              >
                <img src={cashRegisterIcon} alt="Cash Register" />
              </div>
            </div> */}
          </div>
        </Row>

        {/* <Modal
          title="Cash Register"
          centered
          visible={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          footer={null}
          width={650}
        >
          <Row>
            <Col lg={24}>
              <Form
                form={form}
                fields={cashRegister}
                onFinish={handleSubmit}
                onFieldsChange={(_, allFields) => {
                  setCashRegister(allFields);
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item name="counter_number" label="Counter Number">
                  <Select
                    placeholder="Select Counter No"
                    size="large"
                    allowClear
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Total Amount" name="total_amount">
                  <Input placeholder="Amount" size="large" />
                </Form.Item>

                <Form.Item label="Notes" name="notes">
                  <Input.TextArea placeholder="Opening Note" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginRight: '1rem' }}
                    onClick={() => setOpenModal(false)}
                  >
                    <Link className="dashboard" to="/">
                      Dashboard
                    </Link>
                  </Button>
                  <Button className="add-opening-balance-btn" htmlType="submit">
                    Add Opening Balance
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal> */}
      </ConfigProvider>
    </>
  );
};

export default Header;
