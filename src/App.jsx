import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import UserList from './components/students/profile';
import UserEdit from './components/students/update'
import AddUser from './components/students/create';
import TeacherList from './components/teachers/profile';
import AddTeacher from './components/teachers/create';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app" style={{ background: '#f0f2f5' }}>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Router>
          <>
            <Header />
            <Container fluid>
              <Row>
                <Col className="p-0" xs={2}>
                  <Sidebar />
                </Col>
                <Col xs={10}>
                  <Switch>
                    <Route exact path="/users" component={UserList} />
                    <Route path="/users/edit/:id" component={UserEdit} />
                    <Route path="/users/add" component={AddUser} />
                  </Switch>
                </Col>
                <Col xs={10}>
                  <Switch>
                    <Route exact path="/teachers" component={TeacherList} />
                    <Route path="/teachers/add" component={AddTeacher} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </>
        </Router>
      )}
    </div>
  );
};

export default App;
