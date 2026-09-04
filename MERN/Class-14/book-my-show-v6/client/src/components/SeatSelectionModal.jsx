import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { toast } from 'react-toastify'
import UserContext from '../context/user-context'
import useHttp from '../hooks/useHttp'
import { createBooking, createPayment } from '../lib/apis'

const ROWS = Array.from({ length: 10 }, (_, index) => index + 1)
const COLUMNS = Array.from({ length: 20 }, (_, index) => String.fromCharCode(65 + index))

const seatId = (row, column) => `${row}${column}`

const SeatSelectionModal = ({ open, onClose, screening, movieId, movieTitle }) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(UserContext)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedShowTime, setSelectedShowTime] = useState('')
  const [isStartingPayment, setIsStartingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  const {
    sendRequest: submitBooking,
    status: bookingStatus,
    data: bookingData,
    error: bookingError,
  } = useHttp(createBooking)

  const ticketPrice = Number(screening?.price) || 0
  const amount = ticketPrice * selectedSeats.length
  const isSubmitting = bookingStatus === 'pending' || isStartingPayment

  useEffect(() => {
    if (!open || !screening) return
    setSelectedSeats([])
    setSelectedShowTime(screening.showTimings?.length === 1 ? screening.showTimings[0] : '')
    setPaymentError(null)
    setIsStartingPayment(false)
  }, [open, screening])

  useEffect(() => {
    if (bookingStatus !== 'completed' || !bookingData) return

    let cancelled = false

    const startCheckout = async () => {
      setIsStartingPayment(true)
      setPaymentError(null)
      try {
        const paymentSession = await createPayment(bookingData._id)
        if (cancelled) return

        if (!paymentSession.url) {
          throw new Error('Missing Stripe checkout URL')
        }
        window.location.assign(paymentSession.url)
      } catch (error) {
        if (cancelled) return
        const message = error.response?.data?.message || error.message || 'Unable to start payment'
        setPaymentError(message)
        toast.error(message)
        setIsStartingPayment(false)
      }
    }

    toast.success('Booking created. Redirecting to payment...')
    startCheckout()

    return () => {
      cancelled = true
    }
  }, [bookingStatus, bookingData])

  const selectedSet = useMemo(() => new Set(selectedSeats), [selectedSeats])

  const toggleSeat = (id) => {
    setSelectedSeats((current) => (
      current.includes(id) ? current.filter((seat) => seat !== id) : [...current, id]
    ))
  }

  const handleBookTickets = () => {
    if (!isLoggedIn) {
      toast.info('Please log in to book tickets')
      navigate('/login')
      return
    }

    submitBooking({
      theatre: screening.theatre._id,
      movie: movieId,
      seats: selectedSeats,
      showTime: selectedShowTime,
      amount,
      screening: screening._id,
    })
  }

  return (
    <Dialog open={open} onClose={isSubmitting ? undefined : onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>
        Select seats
        {screening?.theatre?.name ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 400 }}>
            {movieTitle} · {screening.theatre.name}
          </Typography>
        ) : null}
      </DialogTitle>
      <DialogContent>
        {(bookingError || paymentError) && <Alert severity="error" sx={{ mb: 2 }}>{bookingError || paymentError}</Alert>}

        <Typography variant="subtitle2" sx={{ mb: 1 }}>Show time</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
          {(screening?.showTimings ?? []).map((time) => (
            <Chip
              key={time}
              label={time}
              color={selectedShowTime === time ? 'error' : 'default'}
              variant={selectedShowTime === time ? 'filled' : 'outlined'}
              onClick={() => setSelectedShowTime(time)}
            />
          ))}
        </Stack>

        <Box sx={{ bgcolor: '#1f2533', color: 'common.white', textAlign: 'center', py: 1, borderRadius: 1, mb: 3, letterSpacing: 6, fontWeight: 700 }}>
          SCREEN
        </Box>

        <Box sx={{ overflowX: 'auto', pb: 1 }}>
          <Box sx={{ display: 'inline-grid', gridTemplateColumns: '28px repeat(20, 28px)', gap: 0.5, minWidth: 28 * 21 }}>
            <Box />
            {COLUMNS.map((column) => (
              <Typography key={column} variant="caption" align="center" sx={{ fontWeight: 700, lineHeight: '28px' }}>
                {column}
              </Typography>
            ))}
            {ROWS.map((row) => (
              <Box key={row} sx={{ display: 'contents' }}>
                <Typography variant="caption" align="center" sx={{ fontWeight: 700, lineHeight: '28px' }}>
                  {row}
                </Typography>
                {COLUMNS.map((column) => {
                  const id = seatId(row, column)
                  const isSelected = selectedSet.has(id)
                  return (
                    <Box
                      key={id}
                      component="button"
                      type="button"
                      aria-label={`Seat ${id}`}
                      aria-pressed={isSelected}
                      onClick={() => toggleSeat(id)}
                      sx={{
                        width: 28,
                        height: 28,
                        p: 0,
                        border: '1px solid',
                        borderColor: isSelected ? '#d93452' : '#cfd6e4',
                        borderRadius: 0.75,
                        bgcolor: isSelected ? '#f84464' : '#fff',
                        color: isSelected ? '#fff' : '#1f2533',
                        cursor: 'pointer',
                        fontSize: 9,
                        fontWeight: 700,
                        '&:hover': { bgcolor: isSelected ? '#d93452' : '#fdecef' },
                      }}
                    >
                      {column}
                    </Box>
                  )
                })}
              </Box>
            ))}
          </Box>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1} sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {selectedSeats.length ? `Selected: ${selectedSeats.join(', ')}` : 'No seats selected'}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            Amount: ₹{amount.toFixed(2)}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!selectedShowTime || selectedSeats.length === 0 || isSubmitting}
          onClick={handleBookTickets}
          sx={{ bgcolor: '#f84464', fontWeight: 700, '&:hover': { bgcolor: '#d93452' } }}
        >
          {isStartingPayment ? 'Redirecting to payment...' : isSubmitting ? 'Booking...' : 'Book tickets'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SeatSelectionModal
