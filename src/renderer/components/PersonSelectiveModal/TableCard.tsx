import { DeleteOutlined } from '@ant-design/icons';
import { Checkbox, Col, Image } from 'antd';
import TableImage from '../../../../assets/006-terrace.png';
import './PersonSelectiveModal.style.scss';

const TableCard = () => {
  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <Col lg={8}>
      <div className="flex content_between item_center">
        <div className="select_table">
          <Checkbox onChange={onChange}>Select This Table</Checkbox>
          <div className="table_info">
            <p>
              Table <span>VIP-2</span>
            </p>
            <p>
              Seat <span>6</span>
            </p>
            <p>
              Available <span>4</span>
            </p>
          </div>
        </div>

        <div className="table_image">
          <Image src={TableImage} preview={false} width={50} />
        </div>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Time</th>
              <th scope="col">Peron</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>215</td>
              <td>2022-05-05</td>
              <td>2</td>
              <td>
                <DeleteOutlined />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Col>
  );
};

export default TableCard;
