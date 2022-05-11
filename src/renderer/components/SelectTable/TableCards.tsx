import { Row } from 'antd';
import './PersonSelectiveModal.style.scss';
import TableCard from './TableCard';

const TableCards = ({ defaultFloor }: any) => {
  console.log('vdefaultFloor', defaultFloor);

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
