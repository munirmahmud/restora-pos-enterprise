import { Col, ConfigProvider, Row } from 'antd';
import { FC } from 'react';
import AddLeaveType from 'renderer/components/hrm/AddLeaveType';
import Sidebar from 'renderer/components/partials/Sidebar';
import { SettingsProps } from '../../../types';
import Heading from './../../../components/Heading/index';

type LeaveTypeProps = {
  setting: SettingsProps;
};

const LeaveType: FC<LeaveTypeProps> = ({ settings }: any) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Add Leave Type" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <AddLeaveType />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default LeaveType;
