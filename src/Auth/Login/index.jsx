import React from 'react';
import { login } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  Paper,
  TextField,
} from '@mui/material';
import styles from './styles.module.css';

const Index = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('s10e0410s@gmail.com');
  const [password, setPassword] = React.useState('123456');

  const loginError = useSelector((state) => state.user.loginError);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
    // handle login logic
  };

  return (
    <div className={styles.wrapper}>
      <Container
        maxWidth="sm"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '100%',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
            }}
          >
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                label="Пароль"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <FormHelperText error>{loginError}</FormHelperText>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: '1rem' }}
                >
                  Войти
                </Button>
                <Link href="/register">Зарегистрироваться</Link>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Index;
