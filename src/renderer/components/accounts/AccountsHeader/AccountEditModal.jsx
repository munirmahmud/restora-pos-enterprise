import { Modal } from 'antd';

const AccountEditModal = ({ accountEditModal, setAccountEditModal }) => {
  return (
    <Modal
      title="Account Head"
      centered
      visible={accountEditModal}
      onOk={() => setAccountEditModal(false)}
      onCancel={() => setAccountEditModal(false)}
      width={500}
      footer={null}
    >
      <p>Account Edit Modal</p>
    </Modal>
  );
};

export default AccountEditModal;
