import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { sendGet, sendPut } from "../../utils/httpUtil"; // Import the custom utility methods

const UpdateTeacher = () => {
  const { id } = useParams(); // Get the teacher ID from URL params
  const [teacher, setTeacher] = useState({
    fullname: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch existing teacher data
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await sendGet(`http://localhost:8080/api/teacher/${id}`);
        const jsonResponse = JSON.parse(response); // Parse the response
        setTeacher(jsonResponse.data); // Assuming the response has data in the format { data: teacher }
      } catch (error) {
        setError("Error fetching teacher data");
      }
    };
    fetchTeacher();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit for updating teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        fullname: teacher.fullname,
      };
      const response = await sendPut(`http://localhost:8080/api/teacher/update/${id}`, updateData);
      const jsonResponse = JSON.parse(response);
      if (jsonResponse) {
        navigate("/teacher-list"); // Redirect to the teacher list page after updating
      }
    } catch (error) {
      setError("Error updating teacher: " + error.message);
    }
  };

  return (
    <Container>
      <h2>Update Teacher</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="mgv">
          <Form.Label>MGV</Form.Label>
          <Form.Control
            type="text"
            name="mgv"
            value={teacher.mgv || ""} // Set the default value to an empty string if mgv is not defined
            disabled // Don't allow changing MGV
          />
        </Form.Group>

        <Form.Group controlId="fullname">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={teacher.fullname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Teacher
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateTeacher;
