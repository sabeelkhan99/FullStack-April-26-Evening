import AppDataSource from '../data-source.js';
import Movie from '../models/Movie.js';

export const movies = [
  {
    title: 'Inception',
    rating: 8.8,
    upvotes: 15420,
    posterUrl: 'https://media.themoviedb.org/t/p/w440_and_h660_face/gpC7h43xPMEV3goYMQShfJbTtLq.jpg',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    cast: [
      {
        profilePicture: 'https://media.themoviedb.org/t/p/w276_and_h350_face/ihno5ut6ha8TaubQFgl5Ozco2K1.jpg',
        name: 'Leonardo DiCaprio',
        alias: 'Cobb',
      },
      {
        profilePicture: 'https://media.themoviedb.org/t/p/w276_and_h350_face/A233BHgXw0dzbeOpvHfJwL9gLy1.jpg',
        name: 'Joseph Gordon-Levitt',
        alias: 'Arthur',
      },
      {
        profilePicture: 'https://media.themoviedb.org/t/p/w276_and_h350_face/75nc5lUcp1So9RTNNr08NZ0oQDG.jpg',
        name: 'Tom Hardy',
        alias: 'Eames',
      },
    ],
  },
  {
    title: 'The Dark Knight',
    rating: 9.0,
    upvotes: 22100,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4xLzEwICA2OS41SysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00439318-lkqbjsucvp-portrait.jpg',
    genres: ['Action', 'Crime', 'Drama'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/5qHNjhtj8XtIF8INJ0Ha2SekRr.jpg',
        name: 'Christian Bale',
        alias: 'Bruce Wayne / Batman',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/f4Q1Zzz2aa4kH0e0e0M4Q9in8Z4.jpg',
        name: 'Heath Ledger',
        alias: 'Joker',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/nCWW3i0W4id1kH7wX681Kd6A6UX.jpg',
        name: 'Aaron Eckhart',
        alias: 'Harvey Dent',
      },
    ],
  },
  {
    title: 'Interstellar',
    rating: 8.6,
    upvotes: 18750,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4xLzEwICA2LjNLKyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00493836-svelcnneeq-portrait.jpg',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/5BrcddFCT3X6Fm83UhUbaykE47x.jpg',
        name: 'Matthew McConaughey',
        alias: 'Cooper',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/6NsMbJXLlC4Bt8A3SU7g8onU7Wq.jpg',
        name: 'Anne Hathaway',
        alias: 'Brand',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/4HZi8N3sIyiu4nu6Fo8U1wK0RDy.jpg',
        name: 'Jessica Chastain',
        alias: 'Murph',
      },
    ],
  },
  {
    title: 'Avengers: Endgame',
    rating: 8.4,
    upvotes: 31200,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICA2MjArIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00502386-gkrctcznhp-portrait.jpg',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/4SYTHkFdXplsDDvR3ZaJPkrhBQf.jpg',
        name: 'Robert Downey Jr.',
        alias: 'Tony Stark / Iron Man',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/3bOGNsHlrswhyw79wFwcBc6bYj.jpg',
        name: 'Chris Evans',
        alias: 'Steve Rogers / Captain America',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/6S9fW1X5UxMkgV1419Q2aysu6b.jpg',
        name: 'Scarlett Johansson',
        alias: 'Natasha Romanoff / Black Widow',
      },
    ],
  },
  {
    title: 'Parasite',
    rating: 8.5,
    upvotes: 9800,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4yLzEwICAyMTBLKyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00452034-bfnajnbuss-portrait.jpg',
    genres: ['Comedy', 'Drama', 'Thriller'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/7Jd79E3dUUlIuRusG2K5XnY0b9x.jpg',
        name: 'Song Kang-ho',
        alias: 'Kim Ki-taek',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/6S9fW1X5UxMkgV1419Q2aysu6b.jpg',
        name: 'Cho Yeo-jeong',
        alias: 'Yeon-kyo',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/4HZi8N3sIyiu4nu6Fo8U1wK0RDy.jpg',
        name: 'Choi Woo-shik',
        alias: 'Ki-woo',
      },
    ],
  },
  {
    title: 'Joker',
    rating: 8.4,
    upvotes: 14300,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC45LzEwICAzMTdLKyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00447840-xckkhurxjp-portrait.jpg',
    genres: ['Crime', 'Drama', 'Thriller'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/3bOGNsHlrswhyw79wFwcBc6bYj.jpg',
        name: 'Joaquin Phoenix',
        alias: 'Arthur Fleck / Joker',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/6NsMbJXLlC4Bt8A3SU7g8onU7Wq.jpg',
        name: 'Robert De Niro',
        alias: 'Murray Franklin',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/nCWW3i0W4id1kH7wX681Kd6A6UX.jpg',
        name: 'Zazie Beetz',
        alias: 'Sophie Dumond',
      },
    ],
  },
  {
    title: 'Oppenheimer',
    rating: 8.3,
    upvotes: 11200,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny44LzEwICAxNC4zSysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00427669-ueyvezndpt-portrait.jpg',
    genres: ['Biography', 'Drama', 'History'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/4HZi8N3sIyiu4nu6Fo8U1wK0RDy.jpg',
        name: 'Cillian Murphy',
        alias: 'J. Robert Oppenheimer',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/5qHNjhtj8XtIF8INJ0Ha2SekRr.jpg',
        name: 'Emily Blunt',
        alias: 'Kitty Oppenheimer',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/nanbCrg3EbRj1Bo9c0r8n9TpLzM.jpg',
        name: 'Robert Downey Jr.',
        alias: 'Lewis Strauss',
      },
    ],
  },
  {
    title: 'Dune: Part One',
    rating: 8.0,
    upvotes: 10500,
    posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS42LzEwICAzNy4ySysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00502829-quunuvhmqe-portrait.jpg',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    cast: [
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/4SYTHkFdXplsDDvR3ZaJPkrhBQf.jpg',
        name: 'Timothée Chalamet',
        alias: 'Paul Atreides',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/6NsMbJXLlC4Bt8A3SU7g8onU7Wq.jpg',
        name: 'Zendaya',
        alias: 'Chani',
      },
      {
        profilePicture: 'https://image.tmdb.org/t/p/w185/5BrcddFCT3X6Fm83UhUbaykE47x.jpg',
        name: 'Oscar Isaac',
        alias: 'Duke Leto Atreides',
      },
    ],
  },
];

const seedMovies = async () => {
  try {
    await AppDataSource.connect();
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.log(`Seeded ${movies.length} movies successfully.`);
  } catch (error) {
    console.error('Failed to seed movies:', error.message);
    process.exit(1);
  } finally {
    await AppDataSource.disconnect();
    process.exit(0);
  }
};

seedMovies();
