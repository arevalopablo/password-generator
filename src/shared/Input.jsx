import React from "react";

const Input = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        color: "#f2f2f2",
        fontWeight: "bold",
      }}
    >
      <input {...props} />
      {props.text && (
        <p
          style={{
            marginLeft: "10px",
            fontSize: "16px",
            color: props.checked ? "#E01A4F" : "inherit"
          }}
        >
          {props.text}
        </p>
      )}
    </div>
  );
};

export default Input;
