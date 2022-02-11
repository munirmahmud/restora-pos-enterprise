import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
import Heading from 'renderer/components/Heading';
import Sidebar from './../../components/partials/Sidebar';
import './Currency.styles.scss';
import CurrencyList from './CurrencyList';

const { Option } = Select;

const Currency = ({ direction }) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const changePosition = (value) => {
    console.log('position', value);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <ConfigProvider direction={direction}>
        <div className="main_wrapper">
          <div className="pos_system">
            <Row>
              <Col lg={3}>
                <Sidebar />
              </Col>
              <Col md={21}>
                <div className="flex item_center content_between">
                  <Heading title="Currency" />
                  <Button
                    type="primary"
                    className="bulk_upload_btn"
                    onClick={() => setOpenModal(true)}
                  >
                    <PlusCircleOutlined />
                    Add Currency
                  </Button>
                </div>
                <CurrencyList />
              </Col>
            </Row>
          </div>
        </div>

        <Modal
          title="Add Currency"
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
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="Currency Name"
                  name="currencyName"
                  rules={[
                    {
                      required: true,
                      message: 'Currency Name is required',
                    },
                  ]}
                  required
                >
                  <Input placeholder="Currency Name" size="large" />
                </Form.Item>

                <Form.Item
                  label="Currency Icon"
                  name="currencyIcon"
                  rules={[
                    {
                      required: true,
                      message: 'Currency Icon is required',
                    },
                  ]}
                  required
                >
                  <Input placeholder="Currency Icon" size="large" />
                </Form.Item>

                <Form.Item
                  label="Conversion Rate"
                  name="conversionRate"
                  rules={[
                    {
                      required: true,
                      message: 'Conversion Rate is required',
                    },
                  ]}
                  required
                >
                  <Input placeholder="Conversion Rate" size="large" />
                </Form.Item>
                <Form.Item
                  label="Position"
                  name="position"
                  rules={[
                    { required: true, message: 'Please input your Position!' },
                  ]}
                >
                  <Select
                    placeholder="Select Option"
                    size="large"
                    onChange={changePosition}
                    // value={position}
                    allowClear
                  >
                    <Option value="left">Left</Option>
                    <Option value="right">Right</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="danger"
                    style={{
                      marginRight: '1rem',
                    }}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Currency;
