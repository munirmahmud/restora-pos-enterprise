import { Row } from 'antd';
import './PersonSelectiveModal.style.scss';
import TableCard from './TableCard';

const MainFloor = () => {
  return (
    <div>
      <Row gutter={[20, 25]}>
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
      </Row>
    </div>
  );
};

export default MainFloor;
