import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  Paper,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../store/authSlice';
import emailImage from '../../assets/email.png';

import styles from './styles.module.css';

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('chitastrash');
  const [email, setEmail] = useState('s10e0410s@gmail.com');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');

  const [nameLengthError, setNameLengthError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] =
    useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const registrationSuccess = useSelector(
    (state) => state.user.registrationSuccess
  );
  const registrationError = useSelector(
    (state) => state.user.registrationError
  );
  const handleNameChange = (event) => {
    setNameLengthError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    if (password === confirmPassword) setPasswordMatchError(false);
    setPasswordLengthError(false);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    if (password === confirmPassword) setPasswordMatchError(false);
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      password.length >= 6 &&
      password === confirmPassword &&
      name.length >= 5
    ) {
      dispatch(registration({ username: name, email, password }));
    }
    if (password.length < 6) {
      setPasswordLengthError(true);
    }
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    }
    if (name.length < 5) {
      alert('er');
      setNameLengthError(true);
    }
  };

  // handle registration logic

  if (registrationSuccess) {
    return (
      <Container maxWidth="sm" className={styles.registrationSuccess}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '4rem',
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
            <img
              className={styles.emailImage}
              src={emailImage}
              alt=""
            />
            <h3>
              На вашу почту отправлена ссылка для подтверждения
              аккаунта
            </h3>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <div className="wrapper">
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '4rem',
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
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Никнейм"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                value={name}
                onChange={handleNameChange}
                error={nameLengthError}
                helperText={
                  nameLengthError
                    ? 'Длина никнейма должна быть не менее 5 символов'
                    : ''
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
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
                error={passwordLengthError}
                helperText={
                  passwordLengthError
                    ? 'Длина пароля должна быть не менее 6 символов'
                    : ''
                }
              />
              <TextField
                label="Подтвердите пароль"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={passwordMatchError}
                helperText={
                  passwordMatchError ? 'Пароли должны совпадать' : ''
                }
              />
              <FormHelperText error>
                {registrationError}
              </FormHelperText>

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
                  sx={{ mt: '1rem', mb: '2rem' }}
                >
                  Зарегистрироваться
                </Button>
                <Link href="/login">Войти</Link>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};
export default Register;
