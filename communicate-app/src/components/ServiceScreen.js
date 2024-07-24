import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import { getService, addService } from './api';

const workerId = localStorage.getItem('workerId');
console.log('workerId:' , workerId);

const filters = [
  { value: '', label: 'All' },
  { value: '월', label: '월요일' },
  { value: '화', label: '화요일' },
  { value: '수', label: '수요일' },
  { value: '목', label: '목요일' },
  { value: '금', label: '금요일' },
  { value: workerId, label: '내 수업' },
];

const itemsPerPage = 9;

const ServiceScreen = () => {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    eduName: '',
    eduDay: '',
    eduStart: '',
    eduEnd: '',
    workerId: '',
    eduTuition: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getService()
      .then((data) => {
        console.log(data);
        setAPIData(data);
        setFilteredResults(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filterItems = () => {
    let results = APIData;

    // Filter by search input
    if (searchInput !== '') {
      results = results.filter((item) =>
        item.eduName.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Filter by selected filter
    if (selectedFilter !== '') {
      if (selectedFilter === workerId) {
        results = results.filter((item) => item.username === workerId);
      } else {
        results = results.filter((item) => item.eduDay === selectedFilter);
      }
    }

    setFilteredResults(results);
  };

  useEffect(() => {
    filterItems();
  }, [searchInput, selectedFilter, APIData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { eduName, eduDay, eduStart, eduEnd, workerId, eduTuition } = formData;
      const response = await addService(eduName, eduDay, eduStart, eduEnd, workerId, eduTuition);
      console.log('POST 성공:', response);

      const updatedData = await getService();
      setAPIData(updatedData);
      setFilteredResults(updatedData);

      handleClose();
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const handleCardClick = (eduPK) => {
    console.log('Clicked eduPK:', eduPK);
    navigate(`/${eduPK}/members`);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={6} md={4}>
            <Box display="flex" alignItems="center" sx={{ width: 500, maxWidth: '100%' }}>
              <TextField
                label='Search'
                onChange={(e) => setSearchInput(e.target.value)}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                justifyContent: 'flex-end'
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filters"
                select
                label="Select"
                defaultValue=""
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filters.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" onClick={handleClickOpen} sx={{backgroundColor:'#789CCD','&:hover': { 
                      backgroundColor: '#344889' 
                    }}}>
              수업 추가
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ width: '100%', margin: '0 auto' }}>
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => handleCardClick(item.eduPK)}
            >
              <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  {item.eduName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.eduDay}
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  {item.eduStart} ~ {item.eduEnd}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
          count={Math.ceil(filteredResults.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#000',
              '&.Mui-selected': {
                backgroundColor: '#789CCD',
                color: '#fff',
                '&:hover': { 
                      backgroundColor: '#344889' 
                    }
              },
            },
          }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>수업 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="eduName"
            label="수업 이름"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="eduDay"
            label="수업 요일"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="eduStart"
            label="시작 시간"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="eduEnd"
            label="종료 시간"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="workerId"
            label="강사 아이디"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="eduTuition"
            label="수강료"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>추가</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceScreen;
