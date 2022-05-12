import { Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import './PersonSelectiveModal.style.scss';
import TableCard from './TableCard';

const TableCards = ({
  floorId,
  personSelectedData,
  setPersonSelectedData,
  setTableInfo,
  tableInfo,
}: {
  floorId: number;
}) => {
  window.fetch_table_based_on_floor_id.send('fetch_table_based_on_floor_id', {
    floorId: floorId,
  });

  const [floorTableLists, setFloorTableLists] = useState([]);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_table_based_on_floor_id_response',
      window.fetch_table_based_on_floor_id
    ).then((data) => {
      setFloorTableLists(data);
    });

    getDataFromDatabase(
      'get_table_data_response',
      window.get_table_data
    ).then((data) => {
      console.log(data);
    })

  }, [floorId]);

  return (
    <div>
      <Row gutter={[20, 25]}>
        {floorTableLists?.map((table) => (
          <TableCard
            setPersonSelectedData={setPersonSelectedData}
            personSelectedData={personSelectedData}
            table={table}
            floorId={floorId}
            key={table?.id}
            setTableInfo={setTableInfo}
            tableInfo={tableInfo}
          />
        ))}
      </Row>
    </div>
  );
};

export default TableCards;
