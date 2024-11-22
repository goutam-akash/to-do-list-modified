import React from "react";

const SkeletonLoader = () => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#333333",
            height: "50px",
            marginBottom: "10px",
            borderRadius: "4px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: "#555555",
              width: "60%",
              height: "12px",
              borderRadius: "4px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#555555",
              width: "20%",
              height: "12px",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
