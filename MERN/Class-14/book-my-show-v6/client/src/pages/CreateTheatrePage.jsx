import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import useHttp from '../hooks/useHttp'
import { createTheatre } from '../lib/apis'

const CreateTheatrePage = () => {
  const [theatreDetails, setTheatreDetails] = useState({
    name: '',
    address: '',
    contactNo: '',
  })
  const navigate = useNavigate()
  const {
    sendRequest: submitTheatre,
    status,
    data,
    error,
  } = useHttp(createTheatre)

  useEffect(() => {
    if (status !== 'completed') return

    if (data) {
      toast.success('Theatre created successfully')
      navigate('/theatres')
      return
    }

    if (error) toast.error(error)
  }, [status, data, error, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setTheatreDetails((currentDetails) => ({
      ...currentDetails,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitTheatre(theatreDetails)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Theatre
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Add a theatre for customers to discover and book shows.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            name="name"
            label="Theatre name"
            fullWidth
            required
            margin="normal"
            value={theatreDetails.name}
            onChange={handleChange}
          />
          <TextField
            name="address"
            label="Address"
            fullWidth
            margin="normal"
            multiline
            minRows={3}
            value={theatreDetails.address}
            onChange={handleChange}
          />
          <TextField
            name="contactNo"
            label="Contact number"
            type="tel"
            fullWidth
            margin="normal"
            value={theatreDetails.contactNo}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={status === 'pending'}
            sx={{ mt: 3 }}
          >
            {status === 'pending' ? 'Creating...' : 'Create Theatre'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default CreateTheatrePage
