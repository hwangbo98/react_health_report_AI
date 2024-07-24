import React, { useEffect, useState } from 'react';
import { getMemberDetails, deleteUser } from './api';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typewriter from 'typewriter-effect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Gauge } from '@mui/x-charts/Gauge';
import { CopyToClipboard } from "react-copy-to-clipboard";
import clipBoardIcon from '../util/clipboard_gray.png';
import reportIcon from '../util/report_gray.png';
import deleteIcon from '../util/delete_gray.png'; // 새로운 삭제 아이콘 추가
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { ReactTyped as Typed } from 'react-typed';
import styled from 'styled-components';

export default function ReportScreen() {
    const { userPK } = useParams();
    const [userData, setUserData] = useState(null);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [result, setResult] = useState('');

    const theme = createTheme({
        palette: {
            skyblue: {
                main: '#A1BBDE',
                light: '#DAE6F4',
                dark: '#344889',
                contrastText: '#F2F2F2',
            }
        }
    });

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log('Fetching data for userPK:', userPK);
        getMemberDetails(userPK)
            .then(data => {
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching member details:', error);
                setLoading(false);
            });
    }, [userPK]);

    const handleClick = () => {
        setShowTypewriter(true);
    };

    const handleDelete = () => {
        if (userData?.username) {
            deleteUser(userData.username)
                .then(() => {
                    setSnackbarMessage('User deleted successfully');
                    setSnackbarOpen(true);
                    setUserData(null); // Clear user data after deletion
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    setSnackbarMessage('Error deleting user');
                    setSnackbarOpen(true);
                });
        }
    };

    const TypewriterEx = () => (
        <Typewriter
            options={{
                strings: [temp_report],
                deleteSpeed: Infinity,
                autoStart: true,
                loop: false,
                deleteAll: 0,
                delay: 10,
            }}
        />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await axios.post('https://71nc4lk6kd.execute-api.ap-northeast-2.amazonaws.com/Integration/upload_report', {
            user_id: userPK,
          });
          setResult(response.data.response);
        } catch (error) {
          console.error('Error fetching data', error);
          setResult('데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
    };

    const temp_report = 
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. \
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\
        ";

    const student_attendance = {
        class_day: 365,
        absence: 30,
    };

    const styles = {
        board: {
            margin: "0 auto",
            width: "1200px",
        },
        section: {
            padding: "20px",
            margin: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            boxSizing: "border-box",
        },
        section_in_info: {
            display: "flex",
        },
        section_form: {
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxSizing: "border-box",
            margin: "0 auto",
        },
        section_pie: {
            // Styles for pie chart can go here
        },
        section_in: {
            display: "flex",
            justifyContent: "center",
        },
        section_in_report: {
            padding: "20px",
            margin: "15px",
            backgroundColor: "#F5FAFF",
            height: "300px",
            width: "1000px",
            borderRadius: "8px",
        },
        section_in_btn: {
            padding: "20px",
            margin: "15px",
        },
        section_in_button: {
            padding: "20px",
            textAlign: "right",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "right",
        }
    };

    function TypoTitle({ input_text }) {
        theme.typography.h3 = {
            fontSize: '1.2rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        };
        return (
            <ThemeProvider theme={theme}>
                <Typography variant="h6">{input_text}</Typography>
            </ThemeProvider>
        );
    }

    function FormEx() {
        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="name_input"
                        label="Username"
                        defaultValue={userData?.username || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="nickname_input"
                        label="Nickname"
                        defaultValue={userData?.userNickname || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="phone_number_input"
                        label="Phone"
                        defaultValue={userData?.userPhoneNumber || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="address_input"
                        label="Address"
                        defaultValue={userData?.userAddress || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                </div>
            </Box>
        );
    }

    function CLIP() {
        const cliped = temp_report;
        return (
            <CopyToClipboard text={cliped} onCopy={() => alert('복사를 완료했습니다.')}>
                <Button variant="contained" color="skyblue" startIcon={<img src={clipBoardIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white' }}>
                    CLIPBOARD
                </Button>
            </CopyToClipboard>
        );
    }

    function Attchart() {
        var attend = student_attendance.class_day - student_attendance.absence;
        const rate = (attend / student_attendance.class_day) * 100;
        return (
            <Gauge width={100} height={100} value={rate} />
        );
    }

    function CircularIndeterminate() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const Result = styled.div`
        background-color: #DAE6F4;
        padding: 30px;
        border-radius: 8px;
        border: 1px solid #c5e1a5;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        white-space: pre-wrap;
        word-wrap: break-word;
    `;

    const Loader = styled.div`
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        border-top: 4px solid #00796b;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        display: inline-block;

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return (
        <>
            <ThemeProvider theme={theme}>
                <div style={styles.board}>
                    <div style={styles.section}>
                        <TypoTitle input_text="INFO" />
                        <div style={styles.section_in_info}>
                            <div style={styles.section_form}>
                                <FormEx />
                            </div>
                            <div style={styles.section_pie}>
                                {/* Pie chart or other content can go here */}
                            </div>
                        </div>
                        <div style={styles.section_in_button}>
                            <Button variant="contained" color="skyblue" startIcon={<img src={deleteIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white', margin: "3px" }} onClick={handleDelete}>DELETE</Button>
                            <Button variant="contained" color="skyblue" onClick={handleSubmit} startIcon={<img src={reportIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white', margin: "3px" }}>REPORT</Button>
                        </div>
                    </div>
                    {/* <div style={styles.section}> */}
                        {/* Additional content can go here */}
                    {/* </div> */}
                    <div style={styles.section}>
                        <TypoTitle input_text={userData?.username + " 님의 Report"} />
                            <div>
                                {loading && <Loader />}
                                {result && !loading && (
                                <Result>
                                    <Typed
                                    strings={[result]}
                                    typeSpeed={30}
                                    />
                                </Result>
                                )}
                            </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
