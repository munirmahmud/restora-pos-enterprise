import { Row } from 'antd';
import './PersonSelectiveModal.style.scss';
import TableCard from './TableCard';

const FamilyTable = () => {
  return (
    <div>
      <Row gutter={[20, 25]}>
        <TableCard />
        <TableCard />
      </Row>
    </div>
  );
};

export default FamilyTable;
