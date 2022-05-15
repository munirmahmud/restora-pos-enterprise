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
      console.log('data', data);

      setFloorTableLists(data);
    });
  }, [floorId]);

  return (
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
  );
};

export default TableCards;
