import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router'
import { Alert, Box, Button, Card, CardContent, CardMedia, Container, MenuItem, Stack, TextField, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import useHttp from '../hooks/useHttp'
import { createScreening, getAvailableMoviesForTheatre, getTheatre } from '../lib/apis'

const TheatreDetailsPage = () => {
  const { theatreId } = useParams()
  const [showTimes, setShowTimes] = useState({})
  const [meridiems, setMeridiems] = useState({})
  const [prices, setPrices] = useState({})
  const { sendRequest: loadTheatre, status, data: theatre, error } = useHttp(getTheatre, true)
  const {
    sendRequest: loadAvailableMovies,
    status: moviesStatus,
    data: movies,
    error: moviesError,
  } = useHttp(getAvailableMoviesForTheatre, true)
  const {
    sendRequest: addScreening,
    status: screeningStatus,
    error: screeningError,
  } = useHttp(createScreening)

  useEffect(() => {
    loadTheatre(theatreId)
    loadAvailableMovies(theatreId)
    // `loadTheatre` is recreated by useHttp; load the theatre only when the id changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theatreId])

  useEffect(() => {
    if (screeningStatus === 'completed' && !screeningError) {
      loadAvailableMovies(theatreId)
    }
    // `loadAvailableMovies` is recreated by useHttp; refetch only after adding a screening.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screeningStatus, screeningError, theatreId])

  if (status === 'pending') {
    return <Container maxWidth="sm" sx={{ py: 6 }}><Typography color="text.secondary">Loading theatre...</Typography></Container>
  }

  if (error) {
    return <Container maxWidth="sm" sx={{ py: 6 }}><Alert severity="error">{error || 'Unable to load theatre.'}</Alert></Container>
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button component={RouterLink} nativeButton={false} to="/theatres" startIcon={<ArrowBackRoundedIcon />} sx={{ mb: 2 }}>
        Back to theatres
      </Button>
      <Card elevation={2}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
            {theatre?.name}
          </Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <LocationOnOutlinedIcon color="action" />
              <Typography>{theatre?.address || 'Address not provided'}</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PhoneOutlinedIcon color="action" />
              <Typography>{theatre?.contactNo || 'Contact number not provided'}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ mt: 5 }}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
          Add a screening
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
          Select a movie and show time to add it to this theatre's screenings.
        </Typography>

        {screeningError && <Alert severity="error" sx={{ mb: 2 }}>{screeningError}</Alert>}
        {moviesError && <Alert severity="error">{moviesError || 'Unable to load movies.'}</Alert>}
        {moviesStatus === 'pending' && <Typography color="text.secondary">Loading movies...</Typography>}
        {moviesStatus === 'completed' && !moviesError && (
          movies?.length ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
              {movies.map((movie) => (
                <Card key={movie._id} variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                  {movie.posterUrl && <CardMedia component="img" image={movie.posterUrl} alt={`${movie.title} poster`} sx={{ height: 220, objectFit: 'cover' }} />}
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>{movie.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {movie.genres?.join(', ') || 'Movie'}
                    </Typography>
                    {movie.rating != null && <Typography variant="body2" sx={{ mt: 0.75 }}>{movie.rating}/10</Typography>}
                    <TextField
                      label="Show time"
                      size="small"
                      value={showTimes[movie._id] || ''}
                      onChange={(event) => setShowTimes((currentTimes) => ({ ...currentTimes, [movie._id]: event.target.value }))}
                      placeholder="09:30"
                      helperText="Use HH:mm"
                      inputProps={{ inputMode: 'numeric', pattern: '(0[1-9]|1[0-2]):[0-5][0-9]' }}
                      sx={{ mt: 2, flex: 1 }}
                    />
                    <TextField
                      select
                      label="AM/PM"
                      size="small"
                      value={meridiems[movie._id] || 'AM'}
                      onChange={(event) => setMeridiems((currentMeridiems) => ({ ...currentMeridiems, [movie._id]: event.target.value }))}
                      sx={{ mt: 2, width: 100 }}
                    >
                      <MenuItem value="AM">AM</MenuItem>
                      <MenuItem value="PM">PM</MenuItem>
                    </TextField>
                    <TextField
                      label="Ticket price"
                      type="number"
                      size="small"
                      value={prices[movie._id] ?? ''}
                      onChange={(event) => setPrices((currentPrices) => ({ ...currentPrices, [movie._id]: event.target.value }))}
                      inputProps={{ min: 0, step: '0.01' }}
                      sx={{ mt: 2 }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      disabled={screeningStatus === 'pending' || !showTimes[movie._id] || prices[movie._id] === undefined || prices[movie._id] === ''}
                      onClick={() => addScreening(theatreId, movie._id, showTimes[movie._id], meridiems[movie._id] || 'AM', prices[movie._id])}
                      sx={{ mt: 'auto', pt: 2 }}
                    >
                      {screeningStatus === 'pending' ? 'Adding...' : 'Add screening'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">Every available movie already has a screening at this theatre.</Typography>
          )
        )}
      </Box>
    </Container>
  )
}

export default TheatreDetailsPage
