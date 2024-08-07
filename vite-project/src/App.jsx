import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
const App = () => {
  return (
    <div className="app" style={{ background: '#f0f2f5' }}>
      <Header />
      <Container fluid>
        <Row>
          <Col className="p-0">
            <Sidebar />
          </Col>
          {/* <Col xs={10}>
            <Dashboard />
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default App;
