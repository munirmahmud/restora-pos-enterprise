import { Modal } from 'antd';
import { FC } from 'react';
type EditAccountsType = {
  isOpenAccountEditModal: boolean;
  setOpenAccountEditModal: (accountEditModal: boolean) => void;
};

const AccountEditModal: FC<EditAccountsType> = ({
  isOpenAccountEditModal,
  setOpenAccountEditModal,
}): JSX.Element => {
  return (
    <Modal
      title="Account Head"
      centered
      visible={isOpenAccountEditModal}
      onOk={() => setOpenAccountEditModal(false)}
      onCancel={() => setOpenAccountEditModal(false)}
      width={500}
      footer={null}
    >
      <p>Account Edit Modal</p>
    </Modal>
  );
};

export default AccountEditModal;
