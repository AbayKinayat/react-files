import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import CreateTypes from '../components/modals/CreateTypes';
import CreateBrands from '../components/modals/CreateBrands';
import CreateClothes from '../components/modals/CreateClothes';

const Admin = () => {

  const [ openTypes, setOpenTypes ] = useState(false);
  const [ openBrands, setOpenBrands ] = useState(false);
  const [ openClothes, setOpenClothes ] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpenTypes(true)} variant="outlined" style={{width: "100%", marginTop: 10}}>
        Добавить тип
      </Button>
      <Button onClick={() => setOpenBrands(true)} variant="outlined" style={{width: "100%", marginTop: 10}}>
        Добавить брэнд
      </Button>
      <Button onClick={() => setOpenClothes(true)} variant="outlined" style={{width: "100%", marginTop: 10}}>
        Добавить одежду
      </Button>
      <CreateTypes open={openTypes}  onClose={() => setOpenTypes(false)}/>
      <CreateBrands open={openBrands}  onClose={() => setOpenBrands(false)}/>
      <CreateClothes open={openClothes} onClose={() => setOpenClothes(false)}/>
    </div>
  )
}

export default Admin;