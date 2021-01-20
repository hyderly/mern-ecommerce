import React from "react";
import "./error-message.styles.css";

const ErrorMessage = ({ children }) => {
  return <div className="ErrorMessage ErrorMessage-danger">{children}</div>;
};

export default ErrorMessage;
