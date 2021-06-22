import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import { observer } from 'mobx-react-lite';
import ClotheList from '../components/ClotheList';
import { Context } from '..';
import { fetchBrands, fetchClothes, fetchTypes } from '../http/clotheAPI';
import Pages from '../components/Pages';

const Shop = observer(
  () => {
    const { clothe } = useContext(Context);

    useEffect(() => {
      fetchTypes().then(data => clothe.setTypes(data));
      fetchBrands().then(data => clothe.setBrands(data));
      fetchClothes(null, null, 1, 6).then(data => { 
        clothe.setClothes(data.rows) 
        clothe.setTotalCount(data.count) 
      });
    }, [clothe])

    useEffect(() => {
      fetchClothes(clothe.selectedType.id, clothe.selectedBrand.id, clothe.page, 6).then(data => { 
        clothe.setClothes(data.rows) 
        clothe.setTotalCount(data.count) 
      });
    }, [clothe.page, clothe.selectedType, clothe.selectedBrand])

    return (
      <div style={{ maxWidth: 1110, margin: "0 auto" }}>
        <Grid spacing={2} container>
          <Grid item xs={3}>
            <TypeBar />
          </Grid>
          <Grid item xs={9} spacing={3}>
            <BrandBar />
            <ClotheList />
            <Pages />
          </Grid>
        </Grid>
      </div>
    )
  }
)

export default Shop;
