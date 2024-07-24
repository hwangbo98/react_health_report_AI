import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "./api";

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      userLogout();
      setToken(null);
      navigate("/");
    } else {
      navigate(-1); // 이전 페이지로 돌아갑니다.
    }
  }, [navigate, setToken]);

  return null;
};

export default Logout;
