import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceMembers, updateService, deleteMember, addMember, deleteService } from './api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const IndividualService = () => {
  const { eduPK } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [eduDetails, setEduDetails] = useState({
    eduName: '',
    eduDay: '',
    eduStart: '',
    eduEnd: ''
  });
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    fetchMembers();
  }, [eduPK]);

  const fetchMembers = () => {
    getServiceMembers(eduPK)
      .then((response) => {
        const { data } = response;
        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          console.error('Expected an array but received:', response);
          setMembers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching service members:', error);
        setMembers([]);
      });
  };

  const handleUpdateService = () => {
    const { eduName, eduDay, eduStart, eduEnd } = eduDetails;

    if (!eduName || !eduDay || !eduStart || !eduEnd) {
      alert('필드를 다 채우지 않았습니다.');
      return;
    }

    updateService(eduPK, eduName, eduDay, eduStart, eduEnd)
      .then((response) => {
        console.log('Service updated:', response);
        navigate('/service');
      })
      .catch((error) => {
        console.error('Error updating service:', error);
      });
  };

  const handleDeleteMembers = () => {
    const deletePromises = selectedMembers.map((username) =>
      deleteMember(eduPK, username) // username을 사용
        .then((response) => {
          console.log('Member deleted:', response);
        })
        .catch((error) => {
          console.error('Error deleting member:', error);
        })
    );
  
    Promise.all(deletePromises).then(() => {
      fetchMembers();
      setSelectedMembers([]);
    });
  };

  const handleAddMember = () => {
    if (members.some(member => member.username === newMemberId)) {
      alert('이미 추가된 수강생입니다.');
      return;
    }

    addMember(eduPK, newMemberId)
      .then((response) => {
        console.log('Member added:', response);
        fetchMembers(); // Refresh the members list
        setNewMemberId('');
      })
      .catch((error) => {
        console.error('Error adding member:', error);
      });
  };

  const handleDeleteService = () => {
    deleteService(eduPK)
      .then((response) => {
        console.log('Service deleted:', response);
        navigate('/service');
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
      });
  };

  const handleCheckboxChange = (event, username) => {
    event.stopPropagation();
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((id) => id !== username)
        : [...prevSelected, username]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEduDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleMemberClick = (userPK) => {
    navigate(`/report/${userPK}`);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 3, width: '50%', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          수업 정보
        </Typography>
        <TextField
          label="수업명"
          name="eduName"
          value={eduDetails.eduName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="수업 요일"
          name="eduDay"
          value={eduDetails.eduDay}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="수업 시작 시간"
          name="eduStart"
          value={eduDetails.eduStart}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="수업 종료 시간"
          name="eduEnd"
          value={eduDetails.eduEnd}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" onClick={handleUpdateService} sx={{ mr: 2, backgroundColor: '#789CCD',
          '&:hover': { backgroundColor: '#344889' } }}>
            업데이트
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteService} sx={{ ml: 2, backgroundColor: '#D9534F',
          '&:hover': { backgroundColor: '#AF2F22' } }}>
            수업 삭제
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          수업 수강생 목록
        </Typography>
          <List>
            {members.map((member) => (
              <ListItem
                key={member.username}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={(e) => handleCheckboxChange(e, member.username)}
                    checked={selectedMembers.includes(member.username)}
                  />
                }
              >
                <ListItemText
                  primary={member.username}
                  secondary={member.userNickname}
                  onClick={() => handleMemberClick(member.userPK)}
                  sx={{ cursor: 'pointer' }}
                />
              </ListItem>
            ))}
          </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <TextField
            label="Add Member ID"
            value={newMemberId}
            onChange={(e) => setNewMemberId(e.target.value)}
            margin="normal"
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" onClick={handleAddMember} sx={{ ml: 2, backgroundColor: '#789CCD',
          '&:hover': { backgroundColor: '#344889' } }}>
              추가
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteMembers} sx={{ ml: 2, backgroundColor: '#D9534F',
          '&:hover': { backgroundColor: '#AF2F22' } }}>
              삭제
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default IndividualService;
