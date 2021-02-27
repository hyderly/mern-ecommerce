import React from "react";
import "./error-message.styles.css";

const ErrorMessage = ({ children, styleType }) => {
  return <div className={`ErrorMessage ${styleType}`}>{children}</div>;
};

export default ErrorMessage;
