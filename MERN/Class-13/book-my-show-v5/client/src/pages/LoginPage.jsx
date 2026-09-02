import { useState, useContext } from 'react'
import { Link as RouterLink } from 'react-router'
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import UserContext from '../context/user-context'

const LoginPage = () => {

  const userContext = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    userContext.loginUser({ ...formData })
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Welcome back! Please sign in to continue.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
              Login
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/signup">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage
