import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Chart from './Chart';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUniversity, faSchool, faUserGraduate, faChalkboardTeacher, faBook, faChartLine, faClipboardList, faUsers, faUserShield, faFileAlt, faCirclePlus, faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Sidebar = () => {
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);

  return (
    <Tab.Container id="List-group-Item" defaultActiveKey="#trangchu">
      <Row>
        <Col sm={2} className="sidebar p-0">
          <Nav variant="pills" className="flex-column" style={{ background: '#343a40', height: '100vh', color: 'white' }}>
            <Nav.Item>
              <Nav.Link eventKey="#trangchu" className='d-block text-white'><FontAwesomeIcon icon={faHome} /> Trang chủ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#Khoa" className='d-block text-white'><FontAwesomeIcon icon={faUniversity} /> Khoa</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#Lop" className='d-block text-white'><FontAwesomeIcon icon={faSchool} /> Lớp</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#SinhVien" className='d-block text-white'><FontAwesomeIcon icon={faUserGraduate} /> Sinh viên</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#QuanLy" className='d-block text-white'><FontAwesomeIcon icon={faChalkboardTeacher} /> Quản lý giảng viên</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#QuanMon" className='d-block text-white'><FontAwesomeIcon icon={faBook} /> Quản môn học</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#QuanDiem" className='d-block text-white'><FontAwesomeIcon icon={faChartLine} /> Quản lý điểm</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#QLDiemDanh" className='d-block text-white'><FontAwesomeIcon icon={faClipboardList} /> Quản lý điểm danh</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#ThanhVien" className='d-block text-white'><FontAwesomeIcon icon={faUsers} /> Thành viên</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#VaiTro" className='d-block text-white'><FontAwesomeIcon icon={faUserShield} /> Vai trò thành viên</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#BaiViet" className='d-block text-white'><FontAwesomeIcon icon={faFileAlt} /> Bài viết điều khoản</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col sm={10} className='mt-3'>
          <Tab.Content>
            <Tab.Pane eventKey="#trangchu">
              <div className="trangchu p-3" style={{ background: 'white' }}>
                <Row className="mb-4">
                  <Col>
                    <Card bg="primary" text="white" className="text-center">
                      <Card.Body>
                        <Card.Title>1</Card.Title>
                        <Card.Text>Khoa</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card text="white" className="text-center bg-dark-subtle">
                      <Card.Body>
                        <Card.Title>1</Card.Title>
                        <Card.Text>Lớp</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="warning" text="white" className="text-center">
                      <Card.Body>
                        <Card.Title>2</Card.Title>
                        <Card.Text>Sinh viên</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="danger" text="white" className="text-center">
                      <Card.Body>
                        <Card.Title>4</Card.Title>
                        <Card.Text>Môn học</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Chart title="Biểu đồ thống kê lượng sinh viên nghỉ học" />
                  </Col>
                  <Col>
                    <Chart title="Biểu đồ đánh điểm học tập" />
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#Khoa" variant="pills">
              <div className='Khoa p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách khoa</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm tên khoa hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#Lop">
              <div className='Lop p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách lớp</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm tên lớp hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <DatePicker
                        selected={startDate1}
                        onChange={date => setStartDate1(date)}
                        className="form-control"
                        placeholderText="dd/mm/yyyy"
                        dateFormat="dd/MM/yyyy"
                      />
                    </Col>
                    <Col>
                      <Form.Control as="select">
                        <option>Chọn lớp</option>
                        {/* Add options here */}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Form.Control as="select">
                        <option>Chọn khoa</option>
                        {/* Add options here */}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button variant="success">Export Excel</Button>
                      <Button variant="primary" className="ml-2">Import Excel</Button>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control type="text" placeholder="Tìm mã sinh viên..." />
                    </Col>
                    <Col>
                      <Form.Control type="text" placeholder="Tìm tên sinh viên..." />
                    </Col>
                    <Col>
                      <DatePicker
                        selected={startDate2}
                        onChange={date => setStartDate2(date)}
                        className="form-control"
                        placeholderText="dd/mm/yyyy"
                        dateFormat="dd/MM/yyyy"
                      />
                    </Col>
                    <Col>
                      <Form.Control as="select">
                        <option>Chọn lớp</option>
                        {/* Add options here */}
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button variant="primary">Tìm kiếm</Button>
                      <Button variant="warning" className="ml-2">Xóa bộ lọc</Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#SinhVien">
              <div className='SinhVien p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách sinh viên</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm tên sinh viên hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#QuanLy">
              <div className='QuanLy p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách giảng viên</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm tên giảng viên hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#QuanMon">
              <div className='QuanMon p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách môn học</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm tên môn học hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#QuanDiem">
              <div className='QuanDiem p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách điểm</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm điểm hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#QLDiemDanh">
              <div className='QLDiemDanh p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách điểm danh</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm điểm danh hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#ThanhVien">
              <div className='ThanhVien p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách thành viên</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm tên thành viên hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#VaiTro">
              <div className='VaiTro p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách vai trò thành viên</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm vai trò hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="#BaiViet">
              <div className='BaiViet p-2' style={{ background: 'white' }}>
                <Row>
                  <Col>Danh sách bài viết điều khoản</Col>
                  <Col className='d-flex justify-content-end'>
                    <button style={{ background: 'green', color: 'white' }}>
                      <FontAwesomeIcon icon={faCirclePlus} /> Thêm mới
                    </button>
                  </Col>
                </Row>
                <Row className='pt-2'>
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Tìm bài viết hoặc mã..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <Button variant="outline-success" id="button-addon2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Tìm kiếm
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Sidebar;
