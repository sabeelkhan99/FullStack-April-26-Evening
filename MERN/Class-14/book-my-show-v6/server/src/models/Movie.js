import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    upvotes: Number,
    posterUrl: String,
    genres: [String],
    cast: [
        {
            profilePicture: String,
            name: String,
            alias: String
        }
    ]
}, { versionKey: false, timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
