import { Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect } from 'react';
import './PersonSelectiveModal.style.scss';
import TableCard from './TableCard';

const TableCards = ({ floorId }: { floorId: number }) => {
  window.fetch_table_based_on_floor_id.send('fetch_table_based_on_floor_id', {
    floorId: floorId,
  });

  console.log('vfloorId', floorId);

  useEffect(() => {
    getDataFromDatabase(
      'fetch_table_based_on_floor_id_response',
      window.fetch_table_based_on_floor_id
    ).then((data) => console.log('data', data));
  }, [floorId]);

  return (
    <div>
      <Row gutter={[20, 25]}>
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
      </Row>
    </div>
  );
};

export default TableCards;
