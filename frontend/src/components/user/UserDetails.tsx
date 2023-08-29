import React from "react";
import { useLocation } from "react-router-dom";

function UserDetails() {
  const location = useLocation();
  const row = location.state;

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {row.name}</p>
      <p>Calories: {row.calories}</p>
      <p>Fat: {row.fat}</p>
      {/* Add other details as needed */}
    </div>
  );
}

export default UserDetails;
