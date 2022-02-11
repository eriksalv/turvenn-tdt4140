import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import LoadingButton from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import  TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./ProfilePage.css";

function ProfilePage(){
  return <div>
    <div id = "information">
      <div id = "profilePic">

      </div>
      <div id="about">
        <TextField
              className="aboutText"
              id="outlined-multiline-static"
              label="Biografi"
              multiline
              rows={4}
              defaultValue="Skriv noe om deg selv"
          />
          <LoadingButton
              id ="aboutSave"
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
          > Lagre 
          </LoadingButton>
          <Box sx = {{minWidth:120}} className ="experienceBox">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Erfaringsnivå</InputLabel>
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
      </div>
    </div>

    <div id = "history">


    </div>
    




  </div>
}

export default ProfilePage;
