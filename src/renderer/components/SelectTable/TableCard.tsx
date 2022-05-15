import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Image, InputNumber, message } from 'antd';
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
  const [countPerson, setCountPerson] = useState(0);

  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }

  // console.log('tableInfo', tableInfo);

  const handleChangeTablePerson = () => {
    console.log('table', table);
    console.log('count Person', countPerson);

    if (countPerson > table.person_capacity) {
      message.warning({
        content: 'Table capacity overflow',
        className: 'custom-class',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });

      return;
    }
    if (countPerson === 0) {
      message.warning({
        content: 'No person capacity added',
        className: 'custom-class',
        duration: 1,
        style: { marginTop: '5vh', float: 'right' },
      });

      return;
    }

    // setTableInfo((prevTableData: any) => {
    //   console.log('prevTableData', prevTableData);

    //   if (prevTableData.table_id.find((item) => item === table.id)) {
    //     console.log('find');
    //   } else {
    //     console.log('not found');
    //   }
    //   console.log(table_id);

    //   console.log('table_id asdfasd', table_id);

    //   return {
    //     ...prevTableData,
    //     table_id,
    //   };

    // });

    // prevTableData.booked
    // prevTableData.floor_id
    // table_id

    // setPersonSelectedData([
    //   ...personSelectedData,
    //   {
    //     total_person: countPerson,
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
                {countPerson
                  ? table?.person_capacity - countPerson
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
            onChange={(value) => setCountPerson(value)}
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
