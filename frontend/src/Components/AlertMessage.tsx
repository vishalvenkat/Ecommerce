import { Alert } from "react-bootstrap";

import React from "react";

const AlertMessage = ({ variant, children }) => {
  return (
    <Alert variant={variant} className="mt-3">
      {children}
    </Alert>
  );
};

export default AlertMessage;
