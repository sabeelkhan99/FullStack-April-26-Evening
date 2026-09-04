import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import { toast } from 'react-toastify';
import useHttp from '../hooks/useHttp';
import { signup } from '../lib/apis';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'USER',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { sendRequest, data, error, status } = useHttp(signup, false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({ ...formData });
  }

  useEffect(() => {
    // It is a success call
    if (status === 'completed' && data) {
      toast.success(`Registration Success, Please login to continue`);
      navigate('/login');
      return;
    }
    if (status === 'completed' && error) {
      toast.error(error);
    }
  }, [status, error, data]);

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
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Create an account to book your favourite movies.
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
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="PARTNER">Partner</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
              Sign Up
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default SignUpPage
