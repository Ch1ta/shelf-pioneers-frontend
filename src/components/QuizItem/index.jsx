import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Fab,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '../ConfirmationDialog';
import { useDispatch } from 'react-redux';
import {
  setIsEditing,
  setEditingItem,
  deleteQuiz,
} from '../../store/quizSlice';
import ConfirmationDialog from '../ConfirmationDialog';

const Index = (item) => {
  const dispatch = useDispatch();

  const { _id, title, questions } = item;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleEditClick = () => {
    dispatch(setEditingItem(item));
    dispatch(setIsEditing(true));
  };

  const handleDeleteClick = () => {
    dispatch(deleteQuiz(_id));
  };

  return (
    <Box sx={{ width: '100%', m: 'auto', mt: 4 }}>
      <Typography
        sx={{ color: 'white' }}
        variant="h5"
        component="h2"
        gutterBottom
      >
        {title}
      </Typography>

      {questions.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{question.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: 0 }}>
            <Box
              sx={{
                marginLeft: '50px',
                padding: '0px',
                gap: '10px',
              }}
            >
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Fab size="small" onClick={handleEditClick}>
          <EditIcon />
        </Fab>
        <Fab size="small" onClick={() => setDeleteDialogOpen(true)}>
          <DeleteIcon />
        </Fab>
        <ConfirmationDialog
          title="Удаление"
          content="Вы действительно хотите удалить квиз?"
          acceptText="Удалить"
          cancelText="Отмена"
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onConfirmAction={handleDeleteClick}
        />
      </Box>
    </Box>
  );
};

export default Index;
