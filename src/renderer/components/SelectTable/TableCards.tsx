import { Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import './PersonSelectiveModal.style.scss';
import TableCard from './TableCard';

const TableCards = ({
  floorId,
  setTableInfo,
  tableInfo,
}: {
  floorId: number;
}) => {
  window.fetch_table_based_on_floor_id.send('fetch_table_based_on_floor_id', {
    floorId: floorId,
  });

  const [floorsList, setFloorsList] = useState([]);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_table_based_on_floor_id_response',
      window.fetch_table_based_on_floor_id
    ).then((data) => {
      setFloorsList(data);
    });

    getDataFromDatabase(
      'get_table_data_response',
      window.get_table_data
    ).then((data) => {
      console.log(data);
    })

  }, [floorId]);

  return (
    <Row gutter={[20, 25]}>
      {floorsList?.map((table) => (
        <TableCard
          key={table?.id}
          table={table}
          floorId={floorId}
          setTableInfo={setTableInfo}
          tableInfo={tableInfo}
        />
      ))}
    </Row>
  );
};

export default TableCards;
