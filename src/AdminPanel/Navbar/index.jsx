import { useParams, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const navigate = useNavigate();
  const { param } = useParams();

  const items = [
    {
      name: 'Сессия',
      path: 'active',
    },
    {
      name: 'Программы',
      path: 'programs',
    },
    {
      name: 'Опросы',
      path: 'polls',
    },
    {
      name: 'Квизы',
      path: 'quiz',
    },
    {
      name: 'История',
      path: 'history',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary' }}></Avatar>
        <Typography
          sx={{ marginTop: '6px' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          admin
        </Typography>
      </Box>

      <List component="nav" aria-label="mailbox folders">
        {items.map((item, index) => (
          <div
            className={item.path === param ? styles.active : ''}
            onClick={() => navigate(`/admin/${item.path}`)}
          >
            <ListItem button divider>
              <ListItemText primary={item.name} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

export default Navbar;
