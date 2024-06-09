import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Youtube from "react-youtube";
import { Button } from "@mui/material";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Trailer = ({ location, movieId }) => {
  const [trailerView, setTrailerView] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            movieId ? movieId : location.state?.movie?.id
          }/videos?api_key=b9e68a32b794075281e7bbb1c29ed10a&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trailer data");
        }
        const json = await response.json();
        setTrailerView(json.results);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [location.state.movie.id]);

  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const videoId =
    trailerView && trailerView.length > 0 ? trailerView[0].key : "";

  return (
    <div>
      <Button
        variant="contained"
        sx={{ color: "black", bgcolor: "white" }}
        onClick={openModal}
      >
        PLAY TRAILER
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        {videoId && <Youtube videoId={videoId} />}
      </Modal>
    </div>
  );
};

export default Trailer;
