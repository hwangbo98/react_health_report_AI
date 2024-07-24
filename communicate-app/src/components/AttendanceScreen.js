import React, { useState, useEffect } from "react";
import { parseISO, format, addMonths, subMonths } from "date-fns";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import MessageIcon from "@mui/icons-material/Message";
import { getAttendance } from "./api";

const mockData = [
  {
    name: "Oscar Holloway",
    attendance: [
      { date: "2024-09-01", status: "vacation-approved" },
      { date: "2024-09-02", status: "vacation-approved" },
      { date: "2024-09-03", status: "vacation-approved" },
    ],
  },
  {
    name: "Evan Yates",
    attendance: [
      { date: "2024-09-01", status: "vacation-approved" },
      { date: "2024-09-04", status: "vacation-pending" },
      { date: "2024-09-05", status: "vacation-pending" },
    ],
  },
  {
    name: "멍멍이",
    attendance: [
      { date: "2024-09-01", status: "vacation-approved" },
      { date: "2024-09-04", status: "vacation-pending" },
      { date: "2024-09-10", status: "vacation-pending" },
    ],
  },
  {
    name: "강아지",
    attendance: [
      { date: "2024-09-01", status: "vacation-approved" },
      { date: "2024-09-04", status: "vacation-pending" },
      { date: "2024-09-06", status: "vacation-pending" },
    ],
  },
  {
    name: "류호윤",
    attendance: [
      { date: "2024-09-01", status: "vacation-approved" },
      { date: "2024-09-04", status: "vacation-pending" },
      { date: "2024-09-06", status: "vacation-pending" },
    ],
  },
  {
    name: "고양이",
    attendance: [
      { date: "2024-09-01", status: "vacation-approved" },
      { date: "2024-09-04", status: "vacation-pending" },
      { date: "2024-09-06", status: "vacation-pending" },
    ],
  },
  // 더 많은 직원...
];

const styles = {
  calendarHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    borderRadius: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  navButton: {
    background: "none",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
  navButtonSvg: {
    width: "24px",
    height: "24px",
  },
  daysHeader: {
    display: "flex",
    alignItems: "center",
    margin: "2px",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "5px",
    height: "70px",
  },
  dayCell: {
    width: "40px",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    marginRight: "2px",
    borderRadius: "5px",
    flexShrink: "0",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  memberName: {
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2px 0",
    padding: "10px",
    borderRadius: "10px",
    width: "150px",
    height: "70px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  calendarCell: {
    width: "40px",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ddd",
    marginRight: "2px",
    borderRadius: "5px",
    flexShrink: "0",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    fontSize: "12px",
  },
  vacationApproved: {
    backgroundColor: "#a1bbde", //a1bbde
    color: "#000",
    fontWeight: "bold",
  },
  vacationPending: {
    backgroundColor: "#debdad", //#debdad
    color: "#000",
    fontWeight: "bold",
  },
  workApproved: {
    backgroundColor: "lightgreen",
  },
  workPending: {
    backgroundColor: "lightyellow",
  },
  sickApproved: {
    backgroundColor: "lightpink",
  },
  sickPending: {
    backgroundColor: "lightsalmon",
  },
  memberRowCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2px",
    padding: "0px",
    margin: "2px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    borderRadius: "10px",
  },
};

const AttendanceScreen = () => {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 날짜로 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchData = async () => {
    try {
      const result = await getAttendance();
      if (result && Array.isArray(result)) {
        const groupedData = result.reduce((acc, item) => {
          const { userNickname, createDate } = item;
          const date = createDate || new Date().toISOString();
          if (!acc[userNickname]) {
            acc[userNickname] = {
              name: userNickname || "Unknown",
              attendance: [],
            };
          }
          acc[userNickname].attendance.push({
            date: date,
            status: "vacation-approved",
          });
          return acc;
        }, {});

        const formattedData = Object.values(groupedData);
        setData(formattedData);
      } else {
        console.error("Invalid data format", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Array(31)
      .fill("")
      .map((v, i) => new Date(year, month - 1, i + 1))
      .filter((v) => v.getMonth() === month - 1);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const renderCalendarHeader = () => {
    return (
      <div style={styles.calendarHeader}>
        <button
          style={styles.navButton}
          className="left"
          onClick={handlePrevMonth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={styles.navButtonSvg}
          >
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <button
          style={styles.navButton}
          className="right"
          onClick={handleNextMonth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={styles.navButtonSvg}
          >
            <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    );
  };

  const renderDaysHeader = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    return (
      <div style={styles.daysHeader}>
        {daysInMonth.map((date) => (
          <div key={date.toISOString()} style={styles.dayCell}>
            <div>{format(date, "d")}</div>
            <div>{format(date, "EEE")}</div>
          </div>
        ))}
      </div>
    );
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setPhoneNumber("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSavePhoneNumber = () => {
    console.log("Saving phone number:", phoneNumber);
    handleClose();
  };

  const renderCalendar = (member) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    return (
      <div style={{ marginLeft: "14px" }}>
        <div style={{ display: "flex" }}>
          {daysInMonth.map((date) => {
            const attendance = member.attendance.find(
              (a) => parseISO(a.date).toDateString() === date.toDateString()
            );
            let cellStyle = { ...styles.calendarCell };
            if (attendance) {
              switch (attendance.status) {
                case "vacation-approved":
                  cellStyle = { ...cellStyle, ...styles.vacationApproved };
                  break;
                case "vacation-pending":
                  cellStyle = { ...cellStyle, ...styles.vacationPending };
                  break;
                case "work-approved":
                  cellStyle = { ...cellStyle, ...styles.workApproved };
                  break;
                case "work-pending":
                  cellStyle = { ...cellStyle, ...styles.workPending };
                  break;
                case "sick-approved":
                  cellStyle = { ...cellStyle, ...styles.sickApproved };
                  break;
                case "sick-pending":
                  cellStyle = { ...cellStyle, ...styles.sickPending };
                  break;
                default:
                  break;
              }
            }
            return (
              <div key={date.toISOString()} style={cellStyle}>
                <div>{format(date, "d")}</div>
                <div>{attendance ? format(date, "EEE") : ""}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const filteredData = data.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderCalendarHeader()}
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={10}>
          {renderDaysHeader()}
        </Grid>
        {filteredData.map((member) => (
          <Grid item xs={12} key={member.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={styles.memberName}
                  onClick={() => handleMemberClick(member)}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "2px 0",
                      padding: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {member.name}
                  </div>
                </div>
              </Grid>

              <Grid item xs={10}>
                {renderCalendar(member)}
              </Grid>
            </div>
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{selectedMember?.name}</h2>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePhoneNumber}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AttendanceScreen;
