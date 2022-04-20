import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';

const EmployeeDetails = ({
  isOpenEmployeeInfoModal,
  setIsOpenEmployeeInfoModal,
}) => {
  return (
    <Modal
      title="Employee Info"
      visible={isOpenEmployeeInfoModal}
      onOk={() => setIsOpenEmployeeInfoModal(false)}
      onCancel={() => setIsOpenEmployeeInfoModal(false)}
      footer={null}
    >
      <ul className="details-list">
        <li>
          <span className="dtr-title">Termination Reason</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Voluntary Termination</span>{' '}
          <span className="dtr-data">1</span>
        </li>
        <li>
          <span className="dtr-title">Re Hire Date</span>{' '}
          <span className="dtr-data">2022-04-13</span>
        </li>
        <li>
          <span className="dtr-title">Rate Type</span>{' '}
          <span className="dtr-data">Hourly</span>
        </li>
        <li>
          <span className="dtr-title">Rate</span>{' '}
          <span className="dtr-data">584653</span>
        </li>
        <li>
          <span className="dtr-title">Pay Frequency</span>{' '}
          <span className="dtr-data">Annual</span>
        </li>
        <li>
          <span className="dtr-title">Pay Frequency Text</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Hourly Rate2</span>{' '}
          <span className="dtr-data">0</span>
        </li>
        <li>
          <span className="dtr-title">Hourly Rate3</span>{' '}
          <span className="dtr-data">0</span>
        </li>
        <li>
          <span className="dtr-title">Home Department</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Department Text</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Supervisor Name</span>{' '}
          <span className="dtr-data">1</span>
        </li>
        <li>
          <span className="dtr-title">Is Supervisor</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Supervisor Report</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Date of Birth</span>{' '}
          <span className="dtr-data">2022-04-15</span>
        </li>
        <li>
          <span className="dtr-title">Gender</span>{' '}
          <span className="dtr-data">Male</span>
        </li>
        <li>
          <span className="dtr-title">Marital Status</span>{' '}
          <span className="dtr-data">Single</span>
        </li>
        <li>
          <span className="dtr-title">Ethnic Group</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">EEO className</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">SSN</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Work in State</span>{' '}
          <span className="dtr-data">1</span>
        </li>
        <li>
          <span className="dtr-title">Live in State</span>{' '}
          <span className="dtr-data">1</span>
        </li>
        <li>
          <span className="dtr-title">Home Email</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Business Email</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Home Phone</span>{' '}
          <span className="dtr-data">4456456</span>
        </li>
        <li>
          <span className="dtr-title">Business Phone</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Cell Phone</span>{' '}
          <span className="dtr-data">455634534</span>
        </li>
        <li>
          <span className="dtr-title">Emergency Contact</span>{' '}
          <span className="dtr-data">adsfasdf</span>
        </li>
        <li>
          <span className="dtr-title">Emergency Home Phone</span>{' '}
          <span className="dtr-data">asdfasdfads</span>
        </li>
        <li>
          <span className="dtr-title">Emergency Work Phone</span>{' '}
          <span className="dtr-data">asdfasdf</span>
        </li>
        <li>
          <span className="dtr-title">Emergency Contact Relation</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Alter Emergency Contact</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Alt Emergency Home Phone</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Alt Emergency Work Phone</span>{' '}
          <span className="dtr-data"></span>
        </li>
        <li>
          <span className="dtr-title">Action</span>{' '}
          <span className="dtr-data">
            <a
              href="https://restorapos.com/newrpos/hrm/Employees/update_employee_form/EUH68XDU"
              className="action-btn"
            >
              <EditOutlined />
            </a>
            <a
              href="https://restorapos.com/newrpos/hrm/Employees/delete_employhistory/EUH68XDU"
              className="action-btn"
              // onClick="return confirm('Are You Sure ? ') "
            >
              <DeleteOutlined />
            </a>
            <a
              href="https://restorapos.com/newrpos/hrm/Employees/cv/EUH68XDU"
              className="action-btn"
            >
              <UserAddOutlined />
            </a>
          </span>
        </li>
      </ul>
    </Modal>
  );
};

export default EmployeeDetails;
