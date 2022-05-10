import { Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { getDataFromDatabase } from './../../../helpers';
import FamilyTable from './FamilyTable';
import MainFloor from './MainFloor';
import './PersonSelectiveModal.style.scss';
import VIPTable from './VIPTable';

const { TabPane } = Tabs;

const PersonSelectiveModal = ({
  personSelectiveModal,
  setPersonSelectiveModal,
}: any) => {
  window.fetch_floor.send('fetch_floor', { status: true });
  const [floorListsData, setFloorListsData] = useState([]);

  // TODO: Person select table
  const tableWrapper = [
    { title: 'VIP Block', content: <VIPTable />, key: 1 },
    { title: 'Family Corner', content: <FamilyTable />, key: 2 },
    { title: 'Main Floor', content: <MainFloor />, key: 3 },
  ];

  useEffect(() => {
    getDataFromDatabase('fetch_floor_response', window.fetch_floor).then(
      (response: any) => {
        setFloorListsData(response);
      }
    );
  }, []);

  console.log('floorListsData modal', floorListsData);

  return (
    <Modal
      visible={personSelectiveModal}
      onOk={() => setPersonSelectiveModal(false)}
      onCancel={() => setPersonSelectiveModal(false)}
      footer={null}
      width={1200}
    >
      <div className="table_wrapper">
        <Tabs defaultActiveKey="1" type="card">
          {tableWrapper.map((table) => (
            <TabPane tab={table?.title} key={table?.key}>
              {table?.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </Modal>
  );
};

export default PersonSelectiveModal;
