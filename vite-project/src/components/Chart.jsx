import React from 'react';
import { Card } from 'react-bootstrap';

const Chart = ({ title }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Đây là nơi biểu đồ sẽ được hiển thị.</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Chart;
