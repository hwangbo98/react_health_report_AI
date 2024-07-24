import React from "react";
import AttendanceScreen from "./AttendanceScreen";
const styles = {
  mainPage: {
    padding: "20px",
  },
  dashboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  section: {
    width: "100%",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
  },
};

const Attendancestyle = () => {
  return (
    <div>
      <div style={styles.mainPage}>
        <div style={styles.dashboard}>
          <div style={styles.section}>
            <AttendanceScreen />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendancestyle;
