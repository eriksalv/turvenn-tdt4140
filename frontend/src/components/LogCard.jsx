import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

export default function LogCard({ id, text, imgpath = '/assets/defaultHike.jpeg' }) {
  const navigate = useNavigate();

  const onClick = () => {};

  return (
    <Paper
      onClick={onClick}
      sx={{
        width: '400px',
        maxWidth: '400px',
        p: 2,
        margin: 2,
        marginBottom: '2rem',
        flexGrow: 1,
        ':hover': {
          boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)'
        },
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ButtonBase sx={{ width: 160, height: 120 }}>
            <Img alt="Nice bilde fra turen" src={imgpath} />
          </ButtonBase>
        </Grid>
        <Grid item xs={6} sm container>
          <Typography variant="body2" gutterBottom>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
