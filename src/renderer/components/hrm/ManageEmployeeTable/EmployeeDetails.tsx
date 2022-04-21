import { Col, Image, Modal, Row, Typography } from 'antd';
import { FC } from 'react';
import defaultImage from '../../../../../assets/default_image.png';
import './ManageEmployee.style.scss';

const { Title } = Typography;

type EmployeeDetailsProps = {
  manageEmployeeInfo: object;
  isOpenEmployeeInfoModal: boolean;
  setIsOpenEmployeeInfoModal: (params: {}) => void;
};

const EmployeeDetails: FC<EmployeeDetailsProps> = ({
  manageEmployeeInfo,
  isOpenEmployeeInfoModal,
  setIsOpenEmployeeInfoModal,
}) => {
  console.log('manageEmployeeInfo modal', manageEmployeeInfo);

  return (
    <Modal
      title="Employee Info"
      visible={isOpenEmployeeInfoModal}
      onOk={() => setIsOpenEmployeeInfoModal(false)}
      onCancel={() => setIsOpenEmployeeInfoModal(false)}
      footer={null}
      width={1000}
    >
      <div className="employee_information">
        <Row gutter={20}>
          <Col lg={9}>
            <div className="profile_info">
              <div className="personal_info">
                <div className="profile_img flex content_center item_center">
                  <Image
                    src={''}
                    preview={false}
                    width="80px"
                    height="80px"
                    fallback={`${defaultImage}`}
                  />
                </div>

                <div className="personal_info_content margin_top">
                  <Title level={4} className="text_center profile_heading">
                    Personal Information
                  </Title>

                  <p className="flex content_between item_center">
                    Name <span>Pranto Shikder</span>
                  </p>
                  <p className="flex content_between item_center">
                    DepartMent <span>Technical</span>
                  </p>
                  <p className="flex content_between item_center">
                    Phone <span>02451321654</span>
                  </p>
                  <p className="flex content_between item_center">
                    Email Address <span>pranto@bdtask.net</span>
                  </p>
                  <p className="flex content_between item_center">
                    Country <span>Bangladesh</span>
                  </p>
                  <p className="flex content_between item_center">
                    City <span>Dhaka</span>
                  </p>
                  <p className="flex content_between item_center">
                    Zip Code <span>Dhaka-7800</span>
                  </p>
                </div>
              </div>

              <div className="personal_bio_graphical_info margin_top">
                <Title level={4} className="text_center profile_heading">
                  Bio-Graphical Information
                </Title>

                <div className="personal_bio_graphical_info_content">
                  <p className="flex content_between item_center">
                    Date of Birth <span>2022-04-03</span>
                  </p>
                  <p className="flex content_between item_center">
                    Gender <span>Male</span>
                  </p>
                  <p className="flex content_between item_center">
                    Marital Status <span>Single</span>
                  </p>
                  <p className="flex content_between item_center">
                    Ethnic Group <span></span>
                  </p>
                  <p className="flex content_between item_center">
                    EEO Class <span></span>
                  </p>
                  <p className="flex content_between item_center">
                    SOS <span>ss56546</span>
                  </p>
                  <p className="flex content_between item_center">
                    Work in State <span>Yes</span>
                  </p>
                  <p className="flex content_between item_center">
                    Live in State <span>Yes</span>
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={15}>
            <div className="employee_details">
              <div className="position_information">
                <Title level={4} className="text_center profile_heading">
                  Position Information
                </Title>

                <div className="position_info_content">
                  <p className="flex content_between item_center">
                    Sub Department <span>Backend</span>
                  </p>
                  <p className="flex content_between item_center">
                    Position <span>React JS Developer</span>
                  </p>
                  <p className="flex content_between item_center">
                    Duty Type <span>Full Time</span>
                  </p>
                  <p className="flex content_between item_center">
                    Hire Date <span>2022-04-10</span>
                  </p>
                  <p className="flex content_between item_center">
                    Original Hire Date <span>2022-04-10</span>
                  </p>
                  <p className="flex content_between item_center">
                    Rate Type <span>Salary</span>
                  </p>
                  <p className="flex content_between item_center">
                    Rate <span>0</span>
                  </p>
                  <p className="flex content_between item_center">
                    Pay Frequency <span>Monthly</span>
                  </p>
                  <p className="flex content_between item_center">
                    Home Department <span></span>
                  </p>
                  <p className="flex content_between item_center">
                    Supervisor Name <span>Self</span>
                  </p>
                  <p className="flex content_between item_center">
                    Is Supervisor <span>No</span>
                  </p>
                </div>
              </div>

              <div className="benefits_info margin_top">
                <Title level={4} className="text_center profile_heading">
                  Benefits
                </Title>

                <div className="benefits_info_content">
                  <p className="flex content_between item_center">
                    Benefit Class code <span>15</span>
                  </p>
                  <p className="flex content_between item_center">
                    Benefit Description <span>Lorem ipsum dolor sit amet.</span>
                  </p>
                  <p className="flex content_between item_center">
                    Benefit Accrual Date <span>2022-04-03</span>
                  </p>
                  <p className="flex content_between item_center">
                    Benefit Status <span>Active</span>
                  </p>
                </div>
              </div>

              <div className="emergency_contact_info margin_top">
                <Title level={4} className="text_center profile_heading">
                  Emergency Contact
                </Title>

                <div className="emergency_contact_info_content">
                  <p className="flex content_between item_center">
                    Emergency Contact <span>034903342</span>
                  </p>
                  <p className="flex content_between item_center">
                    Emergency Home Phone <span>034903342</span>
                  </p>
                  <p className="flex content_between item_center">
                    Emergency Work Phone <span>034903342</span>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default EmployeeDetails;
