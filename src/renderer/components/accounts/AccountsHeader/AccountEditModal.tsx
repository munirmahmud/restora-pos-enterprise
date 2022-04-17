import { Modal } from 'antd';
import { FC } from 'react';
type EditAccountsType = {
  accountEditModal: boolean;
  setAccountEditModal: boolean;
};

const AccountEditModal: FC<EditAccountsType> = ({
  accountEditModal,
  setAccountEditModal,
}) => {
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
