import { Button, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getDataFromDatabase } from '../../../helpers';
import './PersonSelectiveModal.style.scss';
import TableCards from './TableCards';

type FloorTypes = {
  id: number;
  floorName: string;
};

const SelectTable = ({ personSelectModal, setPersonSelectModal }: any) => {
  window.fetch_floor.send('fetch_floor', { status: true });

  const [floorListsData, setFloorListsData] = useState<FloorTypes[]>([]);
  const [floorId, setFloorId] = useState(0);

  useEffect(() => {
    getDataFromDatabase('fetch_floor_response', window.fetch_floor).then(
      (response) => {
        setFloorId(response[0].id);
        setFloorListsData(response);
      }
    );
  }, []);

  const handleFloorButton = (table: any) => {
    console.log('table', table);
    setFloorId(table.id);
  };

  return (
    <Modal
      visible={personSelectModal}
      onOk={() => setPersonSelectModal(false)}
      onCancel={() => setPersonSelectModal(false)}
      footer={null}
      width={1200}
    >
      {/* TODO: Person select table */}
      <div className="table_wrapper">
        <Space style={{ marginBottom: '1rem' }}>
          {floorListsData.map((table) => (
            <Button
              type="primary"
              key={`floor-${table?.id}`}
              onClick={() => handleFloorButton(table)}
            >
              {table?.floorName}
            </Button>
          ))}
        </Space>

        {floorId && <TableCards floorId={floorId} />}

        <Space className="flex content_end">
          <Button type="primary">Add</Button>
          <Button
            type="primary"
            danger
            onClick={() => setPersonSelectModal(false)}
          >
            Cancel
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default SelectTable;
