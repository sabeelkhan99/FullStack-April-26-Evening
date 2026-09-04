import { Link as RouterLink } from 'react-router'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { useContext } from 'react'
import UserContext from '../context/user-context'
import { ToastContainer } from 'react-toastify';


const Layout = ({ children }) => {

  const { isLoggedIn, email, role, logoutUser } = useContext(UserContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <MovieIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            Book My Show
          </Typography>
          {isLoggedIn && (role === 'ADMIN' || role==='PARTNER') && <Button color="inherit" component={RouterLink} nativeButton={false} to="/theatres">
            Theatres
          </Button>}
          {isLoggedIn && (role === 'ADMIN' || role==='PARTNER') && <Button color="inherit" component={RouterLink} nativeButton={false} to="/theatres/create">
            Create Theatre
          </Button>}
          {!isLoggedIn && <Button color="inherit" component={RouterLink} nativeButton={false} to="/login">
            Login
          </Button>}
          {!isLoggedIn && <Button color="inherit" component={RouterLink} nativeButton={false} to="/signup">
            Sign Up
          </Button>}
          {isLoggedIn && <Button color="inherit" component={RouterLink} nativeButton={false}>
            {email}
          </Button>}
          {isLoggedIn && <Button onClick={()=> logoutUser()} color="inherit">
            Logout
          </Button>}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <ToastContainer />
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          mt: 'auto',
          bgcolor: 'grey.900',
          color: 'grey.300',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Book My Show. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
