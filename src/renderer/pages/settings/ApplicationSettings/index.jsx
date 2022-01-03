import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './../../../components/partials/Header';
import Sidebar from './../../../components/partials/Sidebar';

const ApplicationSettings = () => {
  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="pos-system">
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <h1>ApplicationSettings</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationSettings;