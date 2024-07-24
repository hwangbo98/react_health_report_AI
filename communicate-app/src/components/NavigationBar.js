import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const NavigationBar = ({ grantedAuthorities }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "홈", path: "/master", roles: ["Master"] },
    { label: "서비스", path: "/service", roles: ["Master", "Worker"] },
    { label: "업로드", path: "/upload", roles: ["Master", "Worker"] },
    { label: "페이스캠", path: "/face-detection", roles: ["Master", "Worker"] },
    { label: "분석", path: "/analyze", roles: ["Master", "Worker"] },
    { label: "출석체크", path: "/attendance", roles: ["Master", "Worker"] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(grantedAuthorities));

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {filteredNavItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <AppBar component="nav"
              sx={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: 'none',
                  borderBottom: '1px solid #E0E0E0'
              }}>
        <Toolbar sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  minHeight: '85px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: '#000' }}
            >
              <MenuIcon />
            </IconButton>
            <img src={`${process.env.PUBLIC_URL}/logo_.png`} alt="Logo" style={{width: "70px", marginLeft: '16px' }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
            {filteredNavItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: '#333333', fontSize: '16px', fontWeight: 'bold', textTransform: 'none', margin: '0 12px' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '12px' }}>
            {grantedAuthorities === "Master" && (
              <>
                <Button
                  component={Link}
                  to="/workers"
                  sx={{
                    color: '#344889',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    backgroundColor: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #344889',
                    '&:hover': { backgroundColor: '#e0e0e0' }
                  }}
                >
                  직원관리
                </Button>
                <Button
                  component={Link}
                  to="/members"
                  sx={{
                    color: '#344889',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    backgroundColor: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #344889',
                    '&:hover': { backgroundColor: '#e0e0e0' }
                  }}
                >
                  회원관리
                </Button>
              </>
            )}
            <Button
              component={Link}
              to="/logout"
              sx={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'none',
                backgroundColor: '#344889',
                padding: '6px 12px',
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#555555' }
              }}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default NavigationBar;
