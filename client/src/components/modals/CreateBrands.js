import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, TextField } from '@material-ui/core';
import { CreateBrand } from '../../http/clotheAPI';


const CreateBrands = ({ open, onClose }) => {


  const [value, setValue] = useState("");

  const addBrand = () => {
    CreateBrand ({ name: value }).then(data => {
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
      <DialogTitle id="alert-dialog-title">{"Добавить новый брэнд"}</DialogTitle>
      <DialogContent>
        <TextField
          style={{ width: window.innerWidth / 3 }}
          id="outlined-basic"
          label="Введите название брэнда"
          variant="outlined"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Закрыть
        </Button>
        <Button onClick={addBrand} color="primary" autoFocus>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateBrands;