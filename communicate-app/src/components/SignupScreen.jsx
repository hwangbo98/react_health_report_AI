// Signup.js
import "./SignupScreen.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./api";

const SignupScreen = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  //(username, password, userNickname, userAddress,userPhoneNumber,profileImg,userRole,placeName,placeType )
  const [userNickname, setuserNickname] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [userPhoneNumber, setuserPhoneNumber] = useState("");
  const profileImg = "";
  const [userRole, setuserRole] = useState("");
  const [placeName, setplaceName] = useState("");
  const [placeType, setplaceType] = useState("");

  const navigate = useNavigate();
  //(username, password, userNickname, userAddress,userPhoneNumber,profileImg,userRole,placeName,placeType )
  const handleSignup = async (e) => {
    e.preventDefault(); //기본 폼 제출 동작 막기
    try {
      console.log("Sending login request...");
      console.log(id, password);
      const data = await signup(
        id,
        password,
        userNickname,
        userAddress,
        userPhoneNumber,
        profileImg,
        userRole,
        placeName,
        placeType
      );
      console.log(data);

      //setError('');
      alert("등록 완료 ");
      navigate("/");
    } catch (err) {
      // setError("error, please try again.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="signup-container">
      <img
        src={`${process.env.PUBLIC_URL}/DSTJ_logo.png`}
        alt="Logo"
        className="logo"
      />
      <h2>Sign up</h2>
      <form>
        <div className="input-group">
          {/*<label htmlFor="username">Username</label>*/}
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
          />
        </div>
        <div className="input-group">
          {/*<label htmlFor="password">Password</label>*/}
          <input
            type="password" //화면에 표시되지 않음
            value={password} //입력 필드의 현재 상태를 컴포넌트의 상태와 동기화함
            onChange={(e) => setPassword(e.target.value)} //이벤트 핸들러, e : 객체, setPassword함수를 호출
            placeholder="비밀번호" //회색 텍스트가 표시
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={userNickname}
            onChange={(e) => setuserNickname(e.target.value)}
            placeholder="성함"
          />
        </div>
        {/* userAddress,userPhoneNumber,profileImg,userRole,placeName,placeType */}
        <div className="input-group">
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setuserAddress(e.target.value)}
            placeholder="주소"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={userPhoneNumber}
            onChange={(e) => setuserPhoneNumber(e.target.value)}
            placeholder="개인 전화번호"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={userRole}
            onChange={(e) => setuserRole(e.target.value)}
            placeholder="직위"
          />
        </div>
        {/*placeName,placeType*/}
        <div className="input-group">
          <input
            type="text"
            value={placeName}
            onChange={(e) => setplaceName(e.target.value)}
            placeholder="사업체이름"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={placeType}
            onChange={(e) => setplaceType(e.target.value)}
            placeholder="사업분야"
          />
        </div>

        <div className="button-group">
          <button onClick={handleSignup}>Signup</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SignupScreen;
