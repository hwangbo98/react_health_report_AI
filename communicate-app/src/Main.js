import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  AppPaperScreen,
  LoginScreen,
  MasterScreen,
  SigninScreen,
  ServiceScreen,
  SignupScreen,
  Logout,
  IndividualService,
  ReportScreen,
  HealthDataAnalyzer,
  FaceDetection,
  UploadVer1,
  WorkerScreen,
  Attendancestyle,
  NavigationBar,
  MemberScreen
} from "./components";

const Main = ({ token, setToken, grantedAuthorities, setGrantedAuthorities }) => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/signin", "/signupscreen", "/logout"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <AppPaperScreen>
      {shouldShowNavbar && <NavigationBar grantedAuthorities={grantedAuthorities} />}
      <Routes>
        <Route
          path="/"
          element={
            <LoginScreen
              setToken={setToken}
              setGrantedAuthorities={setGrantedAuthorities}
            />
          }
        />
        <Route path="/master" element={<MasterScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/service" element={<ServiceScreen />} />
        <Route path="/signupscreen" element={<SignupScreen />} />
        <Route path="/report/:userPK" element={<ReportScreen />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="/:eduPK/members" element={<IndividualService />} />
        <Route path="/upload" element={<UploadVer1 />} />
        <Route path="/analyze" element={<HealthDataAnalyzer />} />
        <Route path="/face-detection" element={<FaceDetection />} />
        <Route path="/workers" element={<WorkerScreen />} />
        <Route path="/members" element={<MemberScreen />} />
        <Route path="/attendance" element={<Attendancestyle />} />
      </Routes>
    </AppPaperScreen>
  );
};

export default Main;
