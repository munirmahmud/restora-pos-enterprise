import { Button, Form, Input, message, Modal, Space } from 'antd';
import { FC, useEffect, useState } from 'react';

type DesignationProps = {
  isOpenDesignationModal: boolean;
  setOpenDesignationModal: (param: boolean) => void;
  designationEditData: any;
  reRender: boolean;
  setReRender: (param: boolean) => void;
};

const DesignationAddModal: FC<DesignationProps> = ({
  isOpenDesignationModal,
  setOpenDesignationModal,
  designationEditData,
  reRender,
  setReRender,
}) => {
  const [form] = Form.useForm();
  const [addDesignation, setAddDesignation] = useState([]);

  useEffect(() => {
    setAddDesignation([
      {
        name: ['position'],
        value: designationEditData?.position,
      },
      {
        name: ['details'],
        value: designationEditData?.details,
      },
    ]);
  }, [reRender]);

  const handleSubmit = () => {
    const addNewDesignation = {};

    for (const data of addDesignation) {
      addNewDesignation[data.name[0]] =
        typeof data.value === 'string' ? data?.value?.trim() : data?.value;
    }

    // addNewDesignation.id = designationEditData?.id;

    console.log('addNewDesignation', addNewDesignation);

    // window.add_addons.once('add_addons_response', ({ status }) => {
    //   if (status === 'updated') {
    //     message.success({
    //       content: 'Designation has been updated successfully',
    //       className: 'custom-class',
    //       duration: 1,
    //       style: {
    //         marginTop: '5vh',
    //         float: 'right',
    //       },
    //     });
    //     navigate('/addons_list');
    //   } else {
    message.success({
      content: 'Designation added successfully',
      className: 'custom-class',
      duration: 1,
      style: {
        marginTop: '5vh',
        float: 'right',
      },
    });
    form.resetFields();
    //   }
    // });

    setReRender((prevState) => !prevState);
    // setOpenDesignationModal(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Add Designation"
      visible={isOpenDesignationModal}
      onOk={() => setOpenDesignationModal(false)}
      onCancel={() => setOpenDesignationModal(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        fields={addDesignation}
        onFieldsChange={(_, allFields) => {
          setAddDesignation(allFields);
        }}
        autoComplete="off"
      >
        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, message: 'Position is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="details"
          label="Details"
          rules={[{ required: true, message: 'Details is required' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Space>
          <Button type="primary" danger onClick={handleReset}>
            Reset
          </Button>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default DesignationAddModal;
