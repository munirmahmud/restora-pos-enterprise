import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Image, InputNumber } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import TableImage from '../../../../assets/table_icon.png';
import './PersonSelectiveModal.style.scss';

const TableCard = ({
  table,
  floorId,
  setPersonSelectedData,
  personSelectedData,
  setTableInfo,
  tableInfo,
}: any) => {
  const format = 'YYYY-MM-DD';
  const today = new Date();
  const [addPerson, setAddPerson] = useState(0);

  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }

  const handleChangeTablePerson = () => {
    const floor_id = [];
    const table_id = [];
    const booked_person = [];

    floor_id.push(floorId);
    table_id.push(table?.id);
    booked_person.push(addPerson);

    console.log('booked_person', booked_person);

    setTableInfo({
      floor_id: floor_id,
      table_id: table_id,
      booked: booked_person,
    });

    // setPersonSelectedData([
    //   ...personSelectedData,
    //   {
    //     total_person: addPerson,
    //     table_id: table?.id,
    //     floorId: floorId,
    //   },
    // ]);
  };

  const [selectPerson, setSelectPerson] = useState([
    {
      id: 1,
      order_id: 2,
      order_time: moment(today).format(format),
      person: 5,
    },
    {
      id: 2,
      order_id: 6,
      order_time: moment(today).format(format),
      person: 4,
    },
    {
      id: 3,
      order_id: 5,
      order_time: moment(today).format(format),
      person: 6,
    },
  ]);

  const handleDelete = (tableData: any) => {
    const selectData = selectPerson.filter(
      (item) => item?.id !== tableData?.id
    );
    setSelectPerson(selectData);
  };

  const handleRemoveSelectPerson = () => {
    setSelectPerson([]);
  };

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
            {selectPerson?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.order_id}</td>
                <td>{item?.order_time}</td>
                <td>{item?.person}</td>
                <td>
                  <DeleteOutlined onClick={() => handleDelete(item)} />
                </td>
              </tr>
            ))}
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
          <Button type="primary" danger onClick={handleRemoveSelectPerson}>
            Clear
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default TableCard;
