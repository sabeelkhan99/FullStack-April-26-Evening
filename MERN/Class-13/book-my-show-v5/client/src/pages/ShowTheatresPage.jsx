import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router'
import { Alert, Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import useHttp from '../hooks/useHttp'
import { getTheatres } from '../lib/apis'

const ShowTheatresPage = () => {
  const {
    sendRequest: loadTheatres,
    status,
    data: theatres,
    error,
  } = useHttp(getTheatres, true)

  useEffect(() => {
    loadTheatres()
    // `loadTheatres` is recreated by useHttp; load theatres only when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'pending') {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography color="text.secondary">Loading theatres...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error || 'Unable to load theatres.'}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
        Theatres
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Browse theatres available for your next movie experience.
      </Typography>

      {theatres?.length ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
          {theatres.map((theatre) => (
            <Card key={theatre._id} elevation={2}>
              <CardContent>
                <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                  {theatre.name}
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {theatre.address && (
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <LocationOnOutlinedIcon color="action" fontSize="small" />
                      <Typography variant="body2">{theatre.address}</Typography>
                    </Stack>
                  )}
                  {theatre.contactNo && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PhoneOutlinedIcon color="action" fontSize="small" />
                      <Typography variant="body2">{theatre.contactNo}</Typography>
                    </Stack>
                  )}
                </Stack>
                <Button component={RouterLink} nativeButton={false} to={`/theatres/${theatre._id}`} size="small" sx={{ mt: 2, px: 0 }}>
                  View details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography color="text.secondary">No theatres are available yet.</Typography>
      )}
    </Container>
  )
}

export default ShowTheatresPage
