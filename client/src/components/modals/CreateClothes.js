import React, { useContext, useState, useEffect } from 'react';
import { fetchTypes, fetchBrands, createClothe } from '../../http/clotheAPI';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, TextField, MenuItem, Grid, Divider } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

const CreateClothes = observer(
  ({ open, onClose }) => {

    const { clothe } = useContext(Context);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
      fetchTypes().then(data => clothe.setTypes(data));
      fetchBrands().then(data => clothe.setBrands(data));
    }, [clothe])

    const addInfo = () => {
      setInfo([...info, { title: "", description: "", number: Date.now()}])
    }

    const changeInfo = (key, value, number) => {
      setInfo(info.map(i => i.number === number ? { ...i, [key]: value} : i))
    }

    const removeInfo = (number) => {
      setInfo(info.filter(i => i.number !== number))
    }

    const selectFile = (e) => {
      setFile(e.target.files[0])
    }

    const addClothe = () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", `${price}`);
      formData.append("img", file);
      formData.append("brandId", clothe.selectedBrand.id);
      formData.append("typeId", clothe.selectedType.id);
      formData.append("info", JSON.stringify(info));
      console.log(info)
      createClothe(formData).then(data => onClose())
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Добавить новую одежду"}</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <TextField style={{ marginBottom: 10 }} id="select" label="Тип" select>
              {clothe.types.map(type =>
                <MenuItem
                  onClick={() => clothe.setSelectedType(type)}
                  key={type.id}
                  value={type.id}
                >
                  {type.name}
                </MenuItem>
              )}
            </TextField>
            <TextField style={{ marginBottom: 10 }} id="select" label="Брэнд" select>
              {clothe.brands.map(brand =>
                <MenuItem
                  onClick={() => clothe.setSelectedBrand(brand)}
                  key={brand.id}
                  value={brand.id}
                >
                  {brand.name}
                </MenuItem>
              )}
            </TextField>
            <TextField
              size="small"
              style={{ width: window.innerWidth / 2.5, marginBottom: 15 }}
              label="Введите название одежды"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              size="small"
              style={{ width: window.innerWidth / 2.5, marginBottom: 15 }}
              label="Введите стоимость одежды"
              variant="outlined"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              type="number"
            />
            <Form.Control onChange={selectFile} type="file" style={{ marginBottom: 20 }} />
            <Divider />
            <Button variant="outlined" className="mt-2" onClick={addInfo}>
              Добавить новое свойство
            </Button>
            {info.map(i =>
              <Grid className="mt-2" container key={i.number} spacing={1}>
                <Grid item xs={4} spacing={2}>
                  <TextField
                    size="small"
                    label="Название своиство"
                    variant="filled"
                    value={i.title}
                    onChange={e => changeInfo('title', e.target.value, i.number)}
                  />
                </Grid>
                <Grid item xs={4} spacing={2}>
                  <TextField
                    size="small"
                    label="Описание своиство"
                    variant="filled"
                    value={i.description}
                    onChange={e => changeInfo('description', e.target.value, i.number)}
                  />
                </Grid>
                <Grid container justify='center' alignItems="center" item xs={4} spacing={2}>
                  <Button
                    style={{ width: "max-content", height: "max-content" }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeInfo(i.number)}
                  >
                    Удалить
                  </Button>
                </Grid>
              </Grid>
            )
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            Закрыть
          </Button>
          <Button onClick={addClothe} color="primary" autoFocus>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)

export default CreateClothes;