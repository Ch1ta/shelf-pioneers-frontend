import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '../ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { setMode, setEditingItem, deletePoll } from '../../store/admin/pollSlice';
import ConfirmationDialog from '../ConfirmationDialog';

const Index = (item) => {
  const dispatch = useDispatch();

  const { _id, title, questions } = item;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleEditClick = () => {
    dispatch(setEditingItem(item));
    dispatch(setMode(2));
  };

  const handleDeleteClick = () => {
    dispatch(deletePoll(_id));
  };

  return (
    <Box sx={{ width: '100%', m: 'auto', mt: 4 }}>
      <Typography sx={{ color: 'white' }} variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>

      {questions.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{question}</Typography>
          </AccordionSummary>
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
          content="Вы действительно хотите удалить опрос?"
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
