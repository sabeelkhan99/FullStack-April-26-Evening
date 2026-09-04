import axios from 'axios';

export const getMovies = async () => {
    const response = await axios.get('http://localhost:8080/movies');
    return response.data.payload;
};

export const getMovie = async (movieId) => {
    const response = await axios.get(`http://localhost:8080/movies/${movieId}`);
    return response.data.payload;
};

export const getScreeningTheatres = async (movieId) => {
    const response = await axios.get(`http://localhost:8080/movies/${movieId}/theatres`);
    return response.data.payload;
};

export const getProfile = async () => {
    const response = await axios.get('http://localhost:8080/users/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.payload;
};

export const login = async(userCredentials)=>{
    const response = await axios.post('http://localhost:8080/users/login', { ...userCredentials });
    return response.data.payload;
}

export const signup = async (userCredentials) => {
    const response = await axios.post('http://localhost:8080/users/register', { ...userCredentials });
    return response.data.payload;
}

export const createTheatre = async (theatreDetails) => {
    const response = await axios.post('http://localhost:8080/theatre', theatreDetails, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const getTheatres = async () => {
    const response = await axios.get('http://localhost:8080/theatres', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const getTheatre = async (theatreId) => {
    const response = await axios.get(`http://localhost:8080/theatres/${theatreId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const getAvailableMoviesForTheatre = async (theatreId) => {
    const response = await axios.get(`http://localhost:8080/theatres/${theatreId}/movies`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const createScreening = async (theatreId, movieId, showTime, meridiem, price) => {
    const response = await axios.post(`http://localhost:8080/theatres/${theatreId}/screenings`, { movieId, showTimings: [`${showTime} ${meridiem}`], price }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const getConfirmedBookings = async () => {
    const response = await axios.get('http://localhost:8080/bookings', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const createBooking = async (bookingDetails) => {
    const response = await axios.post('http://localhost:8080/bookings', bookingDetails, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const createPayment = async (bookingId) => {
    const response = await axios.post('http://localhost:8080/payments', { bookingId }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}

export const getPaymentStatus = async (sessionId) => {
    const response = await axios.get('http://localhost:8080/status', {
        params: { session_id: sessionId },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data.payload;
}
