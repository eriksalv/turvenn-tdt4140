import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import LoadingButton from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TripCard from "../components/TripCard";
import { Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./ProfilePage.css";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function ProfilePage() {
  const mockData = [
    {
      difficulty: 1,
      duration: "2 days",
      date: "25.02.2022",
      id: "dkawdopwa",
    },
    {
      difficulty: 3,
      duration: "4 days",
      date: "15.03.2022",
      id: "jdpowadjwpa",
    },
    {
      difficulty: 5,
      duration: "3 days",
      date: "01.04.2022",
      id: "jdiwajdipaw",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="information">
        <div id="profilePic">
          <Img
            alt="En kul tur med gode venner"
            src={"../assets/Turvenn-2.png"}
          />
        </div>
        <form id="about">
          <TextField
            className="aboutText"
            id="outlined-multiline-static"
            label="Biografi"
            multiline
            rows={4}
            defaultValue="Skriv noe om deg selv"
          />
          <LoadingButton
            id="aboutSave"
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            {" "}
            Lagre
          </LoadingButton>
          <Box sx={{ minWidth: 120 }} className="experienceBox">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Erfaringsnivå
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={20}
                label="Erfaringsnivå"
              >
                <MenuItem value={10}>Nybegynner</MenuItem>
                <MenuItem value={20}>Erfaren</MenuItem>
                <MenuItem value={30}>Ekspert</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>
      </div>

      <Divider sx={{ width: "100%" }}>
        <Chip label="Turhistorikk" />
      </Divider>
      <Box
        id="tripHistoryContainer"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mockData.map((item) => (
          <TripCard
            difficulty={item.difficulty}
            duration={item.duration}
            date={item.date}
            key={item.id}
          />
        ))}
      </Box>

      <div id="history"></div>
    </Box>
  );
}

export default ProfilePage;
