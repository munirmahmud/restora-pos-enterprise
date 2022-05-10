import { Button, Modal, Space } from 'antd';

const PersonSelectiveModal = ({
  personSelectiveModal,
  setPersonSelectiveModal,
}) => {
  return (
    <Modal
      title="Select Table"
      visible={personSelectiveModal}
      onOk={() => setPersonSelectiveModal(false)}
      onCancel={() => setPersonSelectiveModal(false)}
      footer={null}
      width={1000}
    >
      <Space className="btn_group">
        <Button type="primary">VIP Block</Button>
        <Button type="primary">Family Corner</Button>
        <Button type="primary">2nd Floor</Button>
      </Space>

      <div className="table_wrapper"></div>
    </Modal>
  );
};

export default PersonSelectiveModal;
