import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, TextField } from '@material-ui/core';
import { createType } from '../../http/clotheAPI';

const CreateTypes = ({ open, onClose }) => {

  const [value, setValue] = useState("");

  const addType = () => {
    createType({name: value}).then(data => {
      setValue("");
      onClose();
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Добавить новый тип"}</DialogTitle>
      <DialogContent>
        <TextField
          style={{ width: window.innerWidth / 3 }}
          label="Введите название типа"
          variant="outlined"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Закрыть
        </Button>
        <Button onClick={() => addType()} color="primary" autoFocus>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTypes;