import { Link as RouterLink } from 'react-router'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import Movie from '../components/Movie';
import useHttp from '../hooks/useHttp';
import { getMovies } from '../lib/apis';

const HomePage = () => {

  const { sendRequest, status, data: loadedMovies, error } = useHttp(getMovies, true);

  useEffect(() => {
    sendRequest();
  }, []);
  
  if (status === 'pending') {
    return <p>Loading Movies....</p>
  }

  if (status === 'completed' && error) {
    return <p>{ error }</p>
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100%' }}>
      <Box
        sx={{
          background: 'linear-gradient(115deg, #191c25 0%, #303747 58%, #1f232d 100%)',
          color: 'common.white',
          py: { xs: 6, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2} sx={{ maxWidth: 650 }}>
            <Typography variant="overline" sx={{ color: '#f84464', fontWeight: 800, letterSpacing: 1.6 }}>
              MOVIES, EVENTS & EXPERIENCES
            </Typography>
            <Typography component="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.12 }}>
              Your next great outing starts here.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: '1rem', md: '1.15rem' }, maxWidth: 560 }}>
              Discover the latest movies and reserve the best seats in just a few clicks.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
              <Button variant="contained" size="large" component={RouterLink} nativeButton={false} to="/login" sx={{ bgcolor: '#f84464', px: 3, '&:hover': { bgcolor: '#d93452' } }}>
                Book tickets
              </Button>
              <Button variant="outlined" size="large" component={RouterLink} nativeButton={false} to="/signup" sx={{ borderColor: 'rgba(255,255,255,0.7)', color: 'common.white', px: 3, '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' } }}>
                Create account
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 3 }}>
          <Box>
            <Typography component="h2" variant="h4" sx={{ fontWeight: 700, color: '#1f2533', fontSize: { xs: '1.65rem', md: '2rem' } }}>
              Recommended Movies
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Find a show you&apos;ll love.
            </Typography>
          </Box>
        </Stack>

        {status === 'pending' ? (
          <Typography color="text.secondary">Loading movies...</Typography>
        ) : loadedMovies && loadedMovies.length ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: { xs: 2, md: 3 } }}>
            {loadedMovies.map((movie) => <Movie key={movie._id} movie={movie} />)}
          </Box>
        ) : (
          <Typography color="text.secondary">No movies are available right now. Please check back soon.</Typography>
        )}
      </Container>
    </Box>
  )
}

export default HomePage
