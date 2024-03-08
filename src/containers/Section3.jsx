import { Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Title from "../components/Title";
import { section3Content } from "../utils/content";
import introvideo from "../assets/images/section3/introvideo.mp4"

const { title, ITEMS } = section3Content;

const Section3 = () => {
  return (
    <Container sx={{ mt: { xs: 10, md: 20 } }}>
      <Container maxWidth="md">
        <Title variant={{ xs: "h3", md: "h2" }} sx={{ textAlign: "center" }}>
          {title}
        </Title>
      </Container>

      <Grid container sx={{ mt: 4 }} justifyContent="center">
        <video autoPlay loop muted sx={{ width: "50%"}}>
          <source src={introvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid>
    </Container>
  );
};

export default Section3;
