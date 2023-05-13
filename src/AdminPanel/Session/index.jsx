import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SessionItem from '../../components/SessionItem';
import SessionMonitor from './SessionMonitor';
import { fetchQuiz } from '../../store/admin/quizSlice';
import { fetchPolls } from '../../store/admin/pollSlice';
import { createSession, getOpenSessions, setLink } from '../../store/admin/sessionSlice';

const Index = () => {
  const dispatch = useDispatch();
  const [started, setStarted] = React.useState(false);
  const link = useSelector((state) => state.session.currentSession.link);
  const openSessions = useSelector((state) => state.session.openSessions);

  useEffect(() => {
    dispatch(fetchQuiz());
    dispatch(fetchPolls());
    dispatch(getOpenSessions());
  }, []);

  const handleCreateClick = () => {
    dispatch(createSession());
  };

  const handleOpen = (id) => {
    dispatch(setLink(id));
  };

  const handleClose = (id) => {};

  if (!link)
    return (
      <>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            marginBottom: '20px',
          }}
          onClick={handleCreateClick}
        >
          <AddIcon sx={{ marginRight: '5px' }} />
          Создать Сессию
        </Button>
        {
          <ul>
            {openSessions &&
              openSessions.map((item) => (
                <SessionItem session={item} handleOpen={handleOpen} />
              ))}
          </ul>
        }
      </>
    );

  if (link) return <SessionMonitor />;
};

export default Index;
