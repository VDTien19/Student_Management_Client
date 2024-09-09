import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import UserList from './components/students/profile';
import UserEdit from './components/students/update';
import AddUser from './components/students/create';
import TeacherList from './components/teachers/profile';
import AddTeacher from './components/teachers/create';
import CourseList from './components/course/courseList';
import AddCourse from './components/course/create';
import EditCourse from './components/course/update';
import MajorList from './components/majors/majorsList';
import AddMajor from './components/majors/create';
import SemesterList from './components/semester/SemesterList';
import ClassroomList from './components/classrooms/ClassroomList';
import GradeList from './components/grades/GradeList';
import AddGrade from './components/grades/create';
import UpdateGrade from './components/grades/update';
import AdminUpdateUser from './components/students/AdminUpdate';
import TranscriptList from './components/transcript/transcript';
import AddTranscipt from './components/transcript/createTranscript';
import UpdateTranscript from './components/transcript/updateTranscript.Jsx';
import DiligencyList from './components/diligency/diligency';
import DiligencyCreate from './components/diligency/createDiligency';
import DiligencyUpdate from './components/diligency/updateDiligency';
import HomePage from './components/Homepage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app" style={{ background: '#f0f2f5' }}>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Header onLogout={handleLogout} />
            <Container fluid>
              <Row>
                <Col className="p-0" xs={2}>
                  <Sidebar />
                </Col>
                <Col xs={10}>
                  <Routes>
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/edit/:id" element={<UserEdit />} />
                    <Route path="/users/edit/admin/:id" element={<AdminUpdateUser />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/teachers/add" element={<AddTeacher />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/add-course" element={<AddCourse />} />
                    <Route path="/edit-course/:id" element={<EditCourse />} />
                    <Route path="/majors" element={<MajorList />} />
                    <Route path="/add-major" element={<AddMajor />} />
                    <Route path="/semesters" element={<SemesterList/>}></Route>
                    <Route path="/class" element={<ClassroomList/>}></Route>
                    <Route path="/grades" element={<GradeList />} />
                    <Route path="/add-grades" element={<AddGrade />} />
                    <Route path="/update-grade/:id" element={<UpdateGrade />} />
                    <Route path="/transcript" element={<TranscriptList />} />
                    <Route path="/add-transcript" element={<AddTranscipt />} />
                    <Route path="/update-transcript/:id" element={<UpdateTranscript />} />
                    <Route path="/diligency" element={<DiligencyList />} />
                    <Route path="/add-diligency" element={<DiligencyCreate />} />
                    <Route path="/diligency/update/:id" element={<DiligencyUpdate />} />
                  </Routes>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
