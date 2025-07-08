import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const GoBackButton = ({ linkTo }) => {
  return (
    <Link to={linkTo}>
      <Button variant="light" className="btn-light">
        Go Back
      </Button>
    </Link>
  );
};

export default GoBackButton;
