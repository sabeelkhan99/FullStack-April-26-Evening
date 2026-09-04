import { useContext, useEffect } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import UserContext from '../context/user-context'
import useHttp from '../hooks/useHttp'
import { getConfirmedBookings } from '../lib/apis'

const ProfilePage = () => {
  const { email, role } = useContext(UserContext)
  const {
    sendRequest: loadBookings,
    status,
    data: bookings,
    error,
  } = useHttp(getConfirmedBookings, true)

  useEffect(() => {
    loadBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
        My profile
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Account details and confirmed tickets.
      </Typography>

      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent>
          <Typography component="h2" variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Account
          </Typography>
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Email
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>{email}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Role
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip label={role || 'USER'} size="small" />
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Typography component="h2" variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Confirmed tickets
      </Typography>

      {status === 'pending' || status === null ? (
        <Typography color="text.secondary">Loading tickets...</Typography>
      ) : error ? (
        <Alert severity="error">{error || 'Unable to load tickets.'}</Alert>
      ) : bookings?.length ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {bookings.map((booking) => (
            <Card key={booking._id} elevation={2}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <ConfirmationNumberOutlinedIcon color="action" fontSize="small" />
                  <Chip label={booking.status} color="success" size="small" />
                </Stack>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                  {booking.movie?.title || 'Movie'}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Stack spacing={1}>
                  {booking.theatre?.name && (
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <LocationOnOutlinedIcon color="action" fontSize="small" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {booking.theatre.name}
                        </Typography>
                        {booking.theatre.address && (
                          <Typography variant="body2" color="text.secondary">
                            {booking.theatre.address}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  )}
                  {booking.showTime && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeOutlinedIcon color="action" fontSize="small" />
                      <Typography variant="body2">{booking.showTime}</Typography>
                    </Stack>
                  )}
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <EventSeatOutlinedIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                      {booking.seats?.length ? booking.seats.join(', ') : 'No seats listed'}
                    </Typography>
                  </Stack>
                  {booking.amount != null && (
                    <Typography sx={{ fontWeight: 700 }}>
                      Amount: ₹{Number(booking.amount).toFixed(2)}
                    </Typography>
                  )}
                  {booking.createdAt && (
                    <Typography variant="caption" color="text.secondary">
                      Booked on {new Date(booking.createdAt).toLocaleString()}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography color="text.secondary">You do not have any confirmed tickets yet.</Typography>
      )}
    </Container>
  )
}

export default ProfilePage
