import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Box, Tooltip } from '@mui/material';

function Username({ user }) {
  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <b>
        {user.firstName} {user.lastName}&nbsp;
      </b>
      {user.role === 'admin' && (
        <Tooltip title="admin" arrow>
          <AdminPanelSettingsOutlinedIcon />
        </Tooltip>
      )}
    </Box>
  );
}

export default Username;
