import React from "react";

function MainLoader() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 fixed-top">
      <div className="spinner-border text-warning" style={{ width: "4rem", height: "4rem" }}></div>
    </div>
  );
}

export default MainLoader;

