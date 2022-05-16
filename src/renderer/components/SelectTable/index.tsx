import { Button, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getDataFromDatabase } from '../../../helpers';
import './PersonSelectiveModal.style.scss';
import TableCards from './TableCards';

type FloorTypes = {
  id: number;
  floorName: string;
};

const SelectTable = ({
  personSelectModal,
  setPersonSelectModal,
  personSelectedData,
  setPersonSelectedData,
  setReRender,
}: any) => {
  window.fetch_floor.send('fetch_floor', { status: true });

  const [floorListsData, setFloorListsData] = useState<FloorTypes[]>([]);
  const [tableInfo, setTableInfo] = useState({
    floor_id: [],
    table_id: [],
    booked: [],
  });

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
    setFloorId(table?.id);
    // setPersonSelectedData([]);
  };

  const handleSubmitTablePerson = () => {
    console.log('tableInfo', tableInfo);

    const floorIDs = [...new Set(tableInfo.floor_id)];
    const tableIDs = [...new Set(tableInfo.table_id)];

    console.log('floorIDs', floorIDs);
    console.log('tableIDs', tableIDs);

    setReRender((prevState: boolean) => !prevState);
    // setPersonSelectModal(false);
  };

  return (
    <Modal
      visible={personSelectModal}
      onOk={() => setPersonSelectModal(false)}
      onCancel={() => setPersonSelectModal(false)}
      footer={null}
      width={1200}
    >
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

        {floorId && (
          <TableCards
            floorId={floorId}
            setTableInfo={setTableInfo}
            tableInfo={tableInfo}
          />
        )}

        <Space className="flex content_end" style={{ marginTop: '2rem' }}>
          <Button type="primary" onClick={() => handleSubmitTablePerson()}>
            Add
          </Button>
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
