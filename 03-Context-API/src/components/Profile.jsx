// Here we are extracting/taking data from the userContext

import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  return (
    <div>
      {!user ? <h1>Please Login</h1> : <h1>Welcome {user.username}</h1>}
    </div>
  );
}

export default Profile;
