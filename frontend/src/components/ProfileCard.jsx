import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ButtonBase from '@mui/material/ButtonBase';
import { Tooltip } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

export default function ProfileCard({
  id,
  name,
  experienceLevel,
  role,
  profilepicPath = '/assets/defaultProfilepic.jpeg'
}) {
  const navigate = useNavigate();

  return (
    <Paper
      onClick={() => navigate(`/users/${id}`)}
      sx={{
        width: '200px',
        maxWidth: '200px',
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
            <Img alt="Profilbilde" src={profilepicPath} /> {/* kan heller bruke avatar fra mui */}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {name}&nbsp;
                {role === 'admin' && (
                  <Tooltip title="admin" arrow>
                    <AdminPanelSettingsOutlinedIcon />
                  </Tooltip>
                )}
              </Typography>
              {/* <Typography variant="body2" gutterBottom> // Har ikke erfaringsnivå enda
                Erfaringsnivå: {experienceLevel}
              </Typography> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
