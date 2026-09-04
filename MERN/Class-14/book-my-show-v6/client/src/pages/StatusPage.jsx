import { useEffect } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router'
import { Alert, Box, Button, Container, Paper, Typography } from '@mui/material'
import useHttp from '../hooks/useHttp'
import { getPaymentStatus } from '../lib/apis'

const statusCopy = {
  CONFIRMED: {
    title: 'Payment successful',
    message: 'Your tickets are confirmed. A Stripe receipt will be sent if an email was provided at checkout.',
    severity: 'success',
  },
  PENDING: {
    title: 'Payment pending',
    message: 'Stripe has not completed this payment yet. If you cancelled checkout, you can go back and book again.',
    severity: 'warning',
  },
  FAILED: {
    title: 'Payment failed',
    message: 'Stripe could not complete this payment. Please try booking again.',
    severity: 'error',
  },
  CANCELLED: {
    title: 'Payment cancelled',
    message: 'This payment was cancelled. Your seats are not confirmed.',
    severity: 'info',
  },
  EXPIRED: {
    title: 'Payment expired',
    message: 'This checkout session expired. Please book your seats again.',
    severity: 'info',
  },
}

const StatusPage = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { sendRequest, status, data, error } = useHttp(getPaymentStatus, true)

  useEffect(() => {
    if (!sessionId) return
    sendRequest(sessionId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  if (!sessionId) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>Missing Stripe session. Return to movies and try booking again.</Alert>
        <Button component={RouterLink} nativeButton={false} to="/">Back to movies</Button>
      </Container>
    )
  }

  if (status === 'pending' || status === null) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography color="text.secondary">Checking payment status with Stripe...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button component={RouterLink} nativeButton={false} to="/">Back to movies</Button>
      </Container>
    )
  }

  const copy = statusCopy[data?.bookingStatus] || statusCopy.PENDING

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Alert severity={copy.severity} sx={{ mb: 3 }}>{copy.title}</Alert>
        <Typography sx={{ mb: 2 }}>{copy.message}</Typography>
        {data?.amount != null && (
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Amount: ₹{Number(data.amount).toFixed(2)}</Typography>
        )}
        {data?.bookingId && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Booking ID: {data.bookingId}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={RouterLink} nativeButton={false} to="/" variant="contained" sx={{ bgcolor: '#f84464', '&:hover': { bgcolor: '#d93452' } }}>
            Back to movies
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default StatusPage
