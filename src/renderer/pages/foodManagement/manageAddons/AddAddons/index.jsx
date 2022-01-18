import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import AddNewAddons from './../../../../components/AddNewAddons';
import Sidebar from './../../../../components/partials/Sidebar';

const AddAddons = () => {
  return (
    <Container fluid className="main-wrapper">
      <Header />
      <div className="flex pos_system">
        <Col lg={2}>
          <Sidebar />
        </Col>

        <Col lg={10}>
          <Heading title="Menu Addons" />
          <AddNewAddons />
        </Col>
      </div>
    </Container>
  );
};

export default AddAddons;
