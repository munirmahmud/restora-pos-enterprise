import { InboxOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, Row, Select, Upload } from 'antd';
import './AddEmployeeInfo.style.scss';
const { Option } = Select;

const { Dragger } = Upload;

const BiographicalInfo = ({ employeeInfo, setEmployeeInfo }) => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleChangeWorkInState = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, work_in_state: value });
  };

  const handleChangeGender = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, gender: value });
  };

  const handleChangeLiveInStatus = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, live_in_state: value });
  };

  const handleChangeMaritalStatus = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, marital_status: value });
  };

  const handleChangeCitizenship = (value: string) => {
    setEmployeeInfo({ ...employeeInfo, citizenship: value });
  };

  return (
    <div className="information_wrapper">
      <Row gutter={20}>
        <Col lg={8} xl={8} xxl={8}>
          <Form.Item label="Date of Birth" name="date_of_birth">
            <DatePicker
              style={{ width: '100%' }}
              onChange={(_date, dateString) =>
                setEmployeeInfo({ ...employeeInfo, date_of_birth: dateString })
              }
              placeholder="Date of Birth"
              size="large"
              showToday={false}
            />
          </Form.Item>

          <Form.Item
            label="EEO Class"
            name="eeo_class"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.eeo_class}
              onChange={(e) =>
                setEmployeeInfo({ ...employeeInfo, eeo_class: e.target.value })
              }
              size="large"
              placeholder="EEO Class"
            />
          </Form.Item>

          <Form.Item
            label="Work in State"
            name="work_in_state"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              placeholder="Select  State"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeWorkInState}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Row gutter={10}>
              <Col lg={18}>
                <Dragger {...props} style={{ height: '100px' }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit
                  </p>
                </Dragger>
              </Col>

              <Col lg={6}>
                <p>preview</p>
              </Col>
            </Row>
          </Form.Item>
        </Col>

        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              placeholder="Select  Gender"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeGender}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ethnic Group"
            name="ethnic_group"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.ethnic_group}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  ethnic_group: e.target.value,
                })
              }
              size="large"
              placeholder="Ethnic Group"
            />
          </Form.Item>

          <Form.Item
            label="Live in State"
            name="live_in_state"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              placeholder="Select  Live state"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeLiveInStatus}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col lg={8} xl={8} xxl={8}>
          <Form.Item
            label="Marital Status"
            name="marital_status"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              placeholder="Select Marital Status"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeMaritalStatus}
            >
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="SSN"
            name="ssn"
            rules={[{ required: true, message: '' }]}
          >
            <Input
              value={employeeInfo.ssn}
              onChange={(e) =>
                setEmployeeInfo({
                  ...employeeInfo,
                  ssn: e.target.value,
                })
              }
              size="large"
              placeholder="SSN"
            />
          </Form.Item>

          <Form.Item
            label="Citizenship"
            name="citizenship"
            rules={[{ required: true, message: '' }]}
          >
            <Select
              placeholder="Select  Citizenship"
              allowClear
              style={{ textAlign: 'left' }}
              size="large"
              showSearch
              filterOption={(input: string, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChangeCitizenship}
            >
              <Option value="citizen">Citizen</Option>
              <Option value="non-citizen">Non Citizen</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BiographicalInfo;
