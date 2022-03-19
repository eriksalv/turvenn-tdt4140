import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Fab from '@mui/material/Fab';
// import EditIcon from '@mui/icons-material/Edit';

// import { mdiClock } from '@mdi/js';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

export default function TripCard({
  id,
  title,
  difficulty,
  date,
  imagePath = '/assets/defaultHike.jpeg',
  iconPath = '/assets/clock.png'
}) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/trips/${id}`);
  };

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
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="En kul tur med gode venner" src={imagePath} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {difficulty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Moment format="Do MMMM YYYY, HH:mm">{date}</Moment>
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Fab // Navigerer til både /trips/id/edit og /trips/id, siden hele komponenten også har en onclick, så fjerner dette foreløpig
              sx={{ mr: 1, mt: '2rem' }}
              size="small"
              color="secondary"
              aria-label="delete"
              onClick={() => navigate(`/trips/${id}/edit`)}
            >
              <EditIcon />
            </Fab>
            <Fab sx={{ mt: '2rem' }} size="small" color="primary" aria-label="edit">
              <DeleteIcon />
            </Fab> 
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
}
