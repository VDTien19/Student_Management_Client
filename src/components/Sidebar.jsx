import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaUsers, FaBook, FaClipboardCheck, FaChalkboardTeacher, FaListAlt } from "react-icons/fa";
import './Sidebar.css'; // Make sure you import your custom CSS file

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 sidebar bg-dark">
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <a href="/dashboard" className="nav-link text-light">
            <FaHome className="me-2" /> Trang chủ
          </a>
        </li>
        <li className="nav-item">
          <a href="/class" className="nav-link text-light">
            <FaUsers className="me-2" /> Quản lý lớp học
          </a>
        </li>
        <li className="nav-item">
          <a href="/users" className="nav-link text-light">
            <FaUsers className="me-2" /> Quản lý sinh viên
          </a>
        </li>
        <li className="nav-item">
          <a href="/teachers" className="nav-link text-light">
            <FaChalkboardTeacher className="me-2" /> Quản lý giảng viên
          </a>
        </li>
        <li className="nav-item">
          <a href="/courses" className="nav-link text-light">
            <FaBook className="me-2" /> Quản lý môn học
          </a>
        </li>
        <li className="nav-item">
          <a href="/grades" className="nav-link text-light">
            <FaClipboardCheck className="me-2" /> Quản lý điểm
          </a>
        </li>
        <li className="nav-item">
          <a href="/majors" className="nav-link text-light">
            <FaClipboardCheck className="me-2" /> Quản lý chuyên ngành
          </a>
        </li>
        <li className="nav-item">
          <a href="/semesters" className="nav-link text-light">
            <FaClipboardCheck className="me-2" /> Quản lý học kỳ
          </a>
        </li>
        <li className="nav-item">
          <a href="/diligency" className="nav-link text-light">
            <FaClipboardCheck className="me-2" /> Quản lý chuyên cần
          </a>
        </li>
        <li className="nav-item">
          <a href="/transcript" className="nav-link text-light">
            <FaClipboardCheck className="me-2" /> Quản lý bảng điểm
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
