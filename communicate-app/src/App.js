import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [grantedAuthorities, setGrantedAuthorities] = useState(
    localStorage.getItem("grantedAuthorities")
  );

  return (
    <BrowserRouter>
      <Main
        token={token}
        setToken={setToken}
        grantedAuthorities={grantedAuthorities}
        setGrantedAuthorities={setGrantedAuthorities}
      />
    </BrowserRouter>
  );
};

export default App;
