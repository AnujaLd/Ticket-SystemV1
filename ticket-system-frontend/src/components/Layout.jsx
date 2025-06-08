import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  Paper,
  CssBaseline,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        {/* App Bar */}
        <AppBar position="sticky" elevation={4} sx={{ bgcolor: 'white', color: 'primary.main' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ConfirmationNumberIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="h1" fontWeight="bold">
                Ticket System
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/"
                color={currentPath === '/' ? 'primary' : 'inherit'}
                sx={{
                  borderRadius: '4px',
                  position: 'relative',
                  '&::after': currentPath === '/' ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    bgcolor: 'primary.main',
                  } : {}
                }}
                startIcon={<ConfirmationNumberIcon />}
              >
                Tickets
              </Button>
              
              <Button
                component={Link}
                to="/create"
                color={currentPath === '/create' ? 'primary' : 'inherit'}
                sx={{
                  borderRadius: '4px',
                  position: 'relative',
                  '&::after': currentPath === '/create' ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    bgcolor: 'primary.main',
                  } : {}
                }}
                startIcon={<AddCircleIcon />}
              >
                Create Ticket
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            {children}
          </Paper>
        </Container>
        
        {/* Footer */}
        <Box component="footer" sx={{ py: 3, bgcolor: 'white', mt: 'auto' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Ticket System
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;