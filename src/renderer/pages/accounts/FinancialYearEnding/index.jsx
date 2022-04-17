import { Button, Col, ConfigProvider, Row } from 'antd';
import Sidebar from 'renderer/components/partials/Sidebar';
import Heading from './../../../components/Heading/index';

const FinancialYearEnding = ({ settings }) => {
  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Heading title="Financial Year Ending" />

              <div
                className="flex content_center item_center"
                style={{ height: '80%' }}
              >
                <div
                  style={{
                    margin: '0rem 1.5rem',
                    padding: '5rem 1.5rem',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    textAlign: 'center',
                  }}
                >
                  <p>
                    You can end Financial Year at the end of Financial Year. If
                    you end Financial year Your all closing balance will be
                    added in opening Balance for new Financial year
                  </p>

                  <Button type="primary">End Your Financial Year</Button>
                </div>
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FinancialYearEnding;
