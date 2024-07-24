import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box, Modal } from "@mui/material";
import { getAttendance, addMembers, deleteUser } from "./api";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const MemberScreen = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userNickname: "",
    userAddress: "",
    userPhoneNumber: "",
    userSignificant: "",
  });
  const [sortModel, setSortModel] = useState([
    { field: "userNickname", sort: "asc" },
  ]);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      const response = await getAttendance();
      const calculatedRows = response.map((row, index) => ({
        ...row,
        id: index + 1,
        username: row.username,
      }));
      setRows(calculatedRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      username: "",
      password: "",
      userNickname: "",
      userAddress: "",
      userPhoneNumber: "",
      userSignificant: "",
    });
    setOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const add_data = {
        username: formData.username,
        password: formData.password,
        userNickname: formData.userNickname,
        userAddress: formData.userAddress,
        userPhoneNumber: formData.userPhoneNumber,
        userSignificant: formData.userSignificant,
      };

      await addMembers(
        add_data.username,
        add_data.password,
        add_data.userNickname,
        add_data.userAddress,
        add_data.userPhoneNumber,
        add_data.userSignificant
      );

      await fetchData();
      handleClose();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const rowToDelete = rows.find((row) => row.id === id);
      if (rowToDelete) {
        await deleteUser(rowToDelete.username);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    {
      field: "userNickname",
      headerName: "이름",
      width: 200,
    },
    {
      field: "createDate",
      headerName: "계정 생성 날짜",
      width: 200,
    },
    {
      field: "actions",
      headerName: "동작",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleDelete(params.id)}
          sx={{
            width: "auto",
            backgroundColor: "#A1BBDE",
            color: "white",
            "&:hover": {
              backgroundColor: "#344889",
            },
          }}
        >
          삭제
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={handleOpen}
            sx={{
              width: "auto",
              backgroundColor: "#A1BBDE",
              margin: "10px",
              color: "white",
              "&:hover": {
                backgroundColor: "#344889",
              },
            }}
          >
            회원 추가
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          sortingOrder={["asc", "desc"]}
          sortModel={sortModel}
          disableColumnMenu={true}
        />

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h2>회원 추가</h2>
            <TextField
              label="유저이름"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="비밀번호"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              type="password"
            />
            <TextField
              label="성함"
              name="userNickname"
              value={formData.userNickname}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="주소"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="개인전화번호"
              name="userPhoneNumber"
              value={formData.userPhoneNumber}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="특이사항"
              name="userSignificant"
              value={formData.userSignificant}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={handleAdd}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#789CCD",
                "&:hover": { backgroundColor: "#344889" },
              }}
            >
              추가
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MemberScreen;
