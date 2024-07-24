import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';



export default function ManagerScreen() {
  const theme = createTheme({
    palette : {
        skyblue:{
            main:'#A1BBDE',
            light:'#DAE6F4',
            dark:'#344889',
            constrastText :'#F2F2F2',
        }
    }
  });
  const styles = {
    body: {
        fontFamily: "Arial, sans-serif",
    },
    
    dashboard: {
        display: "grid",
        //gridTemplateColumns: "repeat(auto-fit, minmax(45%, 1fr))",
        gridTemplateColumns:"1fr 1fr",
        gap: "20px",
        backgroundColor: "#F2F4F8",
        gridColumn:"1/3",
        gridRow:"2/3",
        margin: "0 auto",
        width : "1200px",
    },
    section: {
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        boxSizing: "border-box",
        overflow: "hidden", // 내용이 넘칠 경우 숨기기
        width: "100%",
        //display: "flex",
        justifyContent:"center",
        
    },
    section_in: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        display: "flex",
        boxSizing: "border-box",
        //overflow: "hidden", // 내용이 넘칠 경우 숨기기
        

    },
    section_coursePerformance: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxSizing: "border-box",
      overflow: "hidden", // 내용이 넘칠 경우 숨기기
      gridColumn:"1/3",
      gridRow:"2/3",

  },
  section_in_course:{
    display: "flex",
    width: "100%",
    justifyContent : "center",
  },

  section_in_classList:{
    padding: "20px",
  },
  section_in_classLine:{
    padding:"20px",
  },
  heading: {
      marginBottom: "20px",
      fontSize: "18px",
      color: "#333",
  },
    pieChart: {
        width: "100%",
        height: "auto",
    },
};




function NavSub() {
  const navItems = [
    { label: 'Main', path: '/master' },
    { label: 'Schedule', path: '/service_list' },
    { label: 'Staff', path: '/worker_manage' },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <img src={require('./../util/logo.png')} alt="Logo" style={{ width: "200px" }} />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: 'black' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
function BSchart() {
    const years = [
        new Date(1996, 0, 1),
        new Date(1997, 0, 1),
        new Date(1998, 0, 1),
        new Date(1999, 0, 1),
        new Date(2000, 0, 1),
        new Date(2001, 0, 1),
        new Date(2002, 0, 1),
        new Date(2003, 0, 1),
        new Date(2004, 0, 1),
        new Date(2005, 0, 1),
        new Date(2006, 0, 1),
        new Date(2007, 0, 1),
        new Date(2008, 0, 1),
        new Date(2009, 0, 1),
        new Date(2010, 0, 1),
        new Date(2011, 0, 1),
        new Date(2012, 0, 1),
        new Date(2013, 0, 1),
        new Date(2014, 0, 1),
        new Date(2015, 0, 1),
        new Date(2016, 0, 1),
        new Date(2017, 0, 1),
        new Date(2018, 0, 1),
        new Date(2019, 0, 1),
        new Date(2020, 0, 1),
        new Date(2021, 0, 1),
        new Date(2022, 0, 1),
        new Date(2023, 0, 1),
        new Date(2024, 0, 1),
      ];
      
      const NetIncome = [
        28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645, 30341.807,
        31323.078, 32284.611, 33409.68, 33920.098, 34152.773, 34292.03, 35093.824,
        35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727, 36691, 36571,
        36632, 36527, 36827, 37124, 37895, 38515.918,
      ];
      
      const Sales = [
        26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248, 29259.764,
        30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426, 34865.78,
        35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473, 34971, 35185, 35618,
        36436, 36941, 37334, 37782.83, 38058.086,
      ];
      
      const Expense = [
        25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982, 30186.945,
        31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44, 35528.715,
        36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582, 43189, 43320,
        43413, 43922, 44293, 44689, 45619.785, 46177.617,
      ];
    return (
      <LineChart
        xAxis={[
          {
            id: 'Years',
            data: years,
            scaleType: 'time',
            valueFormatter: (date) => date.getFullYear().toString(),
          },
        ]}
        series={[
          {
            id: 'NetIncome',
            label: 'Net Income',
            data: NetIncome,
            stack: 'total',
            area: true,
            showMark: false,
            color: '#344889'
          },
          {
            id: 'Expense',
            label: 'Expense',
            data: Expense,
            stack: 'total',
            area: true,
            showMark: false,
            color: '#a1bbde'
          },
          {
            id: 'Sales',
            label: 'Sales',
            data: Sales,
            stack: 'total',
            area: true,
            showMark: false,
            color: '#DAE6F4'
          },
        ]}
        width={500}
        height={300}
        margin={{ left: 70 }}
      />
    );
  }
      
    function CoursePerformance() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 80 },
            {
              field: 'className',
              headerName: 'Class Name',
              width: 150,
              editable: true,
            },
            {
              field: 'instructor',
              headerName: 'Instructor',
              width: 150,
              editable: true,
            },
            {
              field: 'numOfStudent',
              headerName: 'Students',
              type: 'number',
              width: 80,
              editable: true,
            },
            {
                field: 'avgScore',
                headerName: 'Score(Avg)',
                type: 'number',
                width: 100,
                editable: true,
            },
          ];
          
          const rows = [
            { id: 1, className: 'RC_inter', instructor: 'Walter White', numOfStudent: 33, avgScore: 100 },
            { id: 2, className: 'RC_junior', instructor: 'Kim Wexler', numOfStudent: 54, avgScore: 100 },
            { id: 3, className: 'LC_master', instructor: 'Jessie Pinkman', numOfStudent: 15, avgScore: 100 },
            { id: 4, className: 'LC_basic', instructor: 'Soul Goodman', numOfStudent: 28, avgScore: 100 },
            { id: 5, className: 'RC_inter', instructor: 'Walter White', numOfStudent: 33, avgScore: 100 },
          ];
        return (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        );
      }

      
    function ClassLine() {
      const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
      const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
      const xLabels = ['1월','2월','3월','4월','5월','6월','7월'];
      return (
        <LineChart
          width={550}
          height={400}
          series={[
            { data: pData, label: 'pv', color:'#344889'},
            { data: uData, label: 'uv' , color : '#96B3D9'},
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
      );
    }

    function PieEx() {
      const data = [
        { id: 0, value: 10, label: 'Class A', color: '#96B3D9' },
        { id: 1, value: 15, label: 'Class B', color : '#B4C4D9' },
        { id: 2, value: 20, label: 'Class C' , color : '#344889'},
        { id: 3, value: 30, label: 'Class D', color : 'red'},
      ];
      return (
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: '#D5E2F2' },
            },
          ]}
          height={200}
        />
      );
    }

    function TypoTitle({input_text}) {


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

  
  
    return (
        <>
        <div style={styles.dashboard}>
            <div style={styles.section}>
                <TypoTitle input_text={"NET PROFIT"}/>
                <div style={styles.section_in}>
                  <BSchart/>
                </div>
                
                
            </div>
            <div style={styles.section}>
                <TypoTitle input_text={"STUDENTS RATE"}/>
                <div style={styles.section_in}>
                  <PieEx/>
                </div>

            </div>
            <div style={styles.section_coursePerformance}>
              <TypoTitle input_text={"COURSE PERFORMANCE"}/>
                <div style={styles.section_in_course}>
                    <div style={styles.section_in_classList}>                      
                      <CoursePerformance/>
                    </div>
                    <div style={styles.section_in_classLine}>
                      <ClassLine/>
                    </div>
                </div>
            </div>
            <div>
              
            </div>
        </div>
        </>
    )
}
