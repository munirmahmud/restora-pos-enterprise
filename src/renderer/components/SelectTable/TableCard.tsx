import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Image, InputNumber } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import TableImage from '../../../../assets/table_icon.png';
import './PersonSelectiveModal.style.scss';

const TableCard = ({ table }: any) => {
  const [addPerson, setAddPerson] = useState();

  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }

  const handleChangeTablePerson = () => {
    console.log('changed', addPerson);
  };

  const format = 'YYYY-MM-DD';
  const today = new Date();

  return (
    <Col lg={8}>
      <div className="flex content_between item_center">
        <div className="select_table">
          <Checkbox onChange={onChange}>Select This Table</Checkbox>

          <div className="table_info">
            <p>
              Table <span>{table?.tablename}</span>
            </p>
            <p>
              Seat <span>{table?.person_capacity}</span>
            </p>
            <p>
              Available{' '}
              <span>
                {addPerson
                  ? table?.person_capacity - addPerson
                  : table?.person_capacity}
              </span>
            </p>
          </div>
        </div>

        <div className="table_image">
          <Image src={TableImage} preview={false} width={70} />
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
              <td>{moment(today).format(format)}</td>
              <td>2</td>
              <td>
                <DeleteOutlined />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="input_number flex content_between">
        <div>
          <InputNumber
            min={0}
            onChange={(value) => setAddPerson(value)}
            placeholder="Add person"
            style={{ width: '150px' }}
          />

          <Button
            type="primary"
            style={{ marginLeft: '0.5rem' }}
            onClick={handleChangeTablePerson}
          >
            <PlusOutlined />
          </Button>
        </div>

        <div>
          <Button type="primary" danger>
            Clear
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default TableCard;
