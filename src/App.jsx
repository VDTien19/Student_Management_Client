// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Login from './components/Login';
// import UserList from './components/students/profile';
// import UserEdit from './components/students/update';
// import AddUser from './components/students/create';
// import TeacherList from './components/teachers/profile';
// import AddTeacher from './components/teachers/create';
// import CourseList from './components/course/courseList';
// import AddCourse from './components/course/create';
// import EditCourse from './components/course/update';
// import MajorList from './components/majors/majorsList';
// import AddMajor from './components/majors/create';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <div className="app" style={{ background: '#f0f2f5' }}>
//         {!isLoggedIn ? (
//           <Login onLogin={handleLogin} />
//         ) : (
//           <>
//             <Header />
//             <Container fluid>
//               <Row>
//                 <Col className="p-0" xs={2}>
//                   <Sidebar />
//                 </Col>
//                 <Col xs={10}>
//                   <Routes>
//                     <Route path="/users" element={<UserList />} />
//                     <Route path="/users/edit/:id" element={<UserEdit />} />
//                     <Route path="/users/add" element={<AddUser />} />
//                     <Route path="/teachers" element={<TeacherList />} />
//                     <Route path="/teachers/add" element={<AddTeacher />} />
//                     <Route path="/courses" element={<CourseList />} />
//                     <Route path="/add-course" element={<AddCourse />} />
//                     <Route path="/edit-course/:id" element={<EditCourse />} />
//                     <Route path="/majors" element={<MajorList />} />
//                     <Route path="/add-major" element={<AddMajor />} />
//                   </Routes>
//                 </Col>
//               </Row>
//             </Container>
//           </>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;


import React, { useState } from 'react';
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app" style={{ background: '#f0f2f5' }}>
        <Router>
          <>
            <Header />
            <Container fluid>
              <Row>
                <Col className="p-0" xs={2}>
                  <Sidebar />
                </Col>
                <Col xs={10}>
                  <Routes>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/edit/:id" element={<UserEdit />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/teachers/add" element={<AddTeacher />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/add-course" element={<AddCourse />} />
                    <Route path="/edit-course/:id" element={<EditCourse />} />
                    <Route path="/majors" element={<MajorList />} />
                    <Route path="/add-major" element={<AddMajor />} />
                  </Routes>
                </Col>
              </Row>
            </Container>
          </>
        </Router>
    </div>
  );
};

export default App;