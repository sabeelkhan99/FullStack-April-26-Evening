import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link as RouterLink } from 'react-router';

const Movie = ({ movie }) => {
    return (
        <Card
            component={RouterLink}
            to={`/movies/${movie._id}`}
            aria-label={`View details for ${movie.title}`}
            sx={{
                height: '100%',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 'none',
                backgroundColor: 'transparent',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                padding:'0.5rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 24px rgba(22, 25, 34, 0.18)' },
            }}
        >
            <CardMedia
                component="img"
                sx={{ height: 310, objectFit: 'cover', borderRadius: 2, backgroundColor: '#e5e5e5' }}
                image={movie.posterUrl}
                alt={`${movie.title} poster`}
            />
            <Box sx={{ px: 0.5, pt: 1.5 }}>
                <Typography component="h3" sx={{ color: '#222', fontWeight: 700, fontSize: '1.05rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {movie.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.6 }}>
                    <StarRoundedIcon sx={{ color: '#f84464', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#32333b' }}>
                        {movie.rating?.toFixed?.(1) ?? movie.rating}/10
                    </Typography>
                    {movie.upvotes && <Typography variant="caption" color="text.secondary">({movie.upvotes.toLocaleString()} votes)</Typography>}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, height: 40, overflow: 'hidden' }}>
                    {movie.genres?.join(', ') ?? movie.genre ?? 'Movie'}
                </Typography>
                <Button component="span" nativeButton={false} fullWidth variant="outlined" size="small" sx={{ mt: 1.25, borderColor: '#f84464', color: '#f84464', fontWeight: 700, '&:hover': { borderColor: '#d93452', bgcolor: '#fff1f3' } }}>
                    View details
                </Button>
            </Box>
        </Card>
    )
}

export default Movie
