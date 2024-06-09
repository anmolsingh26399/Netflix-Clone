import { Box, Card, CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { database } from "./firbase/setup";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=b9e68a32b794075281e7bbb1c29ed10a"
      );
      const json = await res.json();
      setMovies(json.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const addMovie = async (movie) => {
    console.log(movie);
    const movieRef = doc(database, "Movies", `${movie.id}`);
    try {
      await setDoc(movieRef, { movieName: movie.original_title });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        {movies.map((movie) => {
          {
            addMovie(movie);
          }
          return (
            <Grid key={movie.id} item xs={3}>
              <Box>
                <Link to="/movieDetail" state={{ movie: movie }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    />
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
