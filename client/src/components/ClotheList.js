import React, { useContext } from 'react';
import { Context } from '../index';
import { Card, CardActionArea, CardMedia, CardContent, Button, CardActions, Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { CLOTHE_ROUTE } from '../utils/const';

const ClotheList = observer(
  () => {
    const { clothe } = useContext(Context)
    const history = useHistory()
    console.log(clothe.clothes.rows)

    return (
      <Grid style={{ marginTop: 20 }} container spacing={2}>
        {clothe.clothes.map(clothe =>
          <Grid key={clothe.id} item xs={4} spacing={3}>
            <Card>
              <CardActionArea onClick={() => history.push(CLOTHE_ROUTE + '/' + clothe.id)}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="300"
                  image={clothe.img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <div>
                    {clothe.name}
                  </div>
                  <h5>
                    {clothe.price}тг
                  </h5>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => history.push(CLOTHE_ROUTE + '/' + clothe.id)}>
                  Посмотреть
                </Button>
                <Button size="small" color="primary">
                  В корзину
                </Button>
              </CardActions>
            </Card>
          </Grid>

        )
        }
      </Grid>
    )
  }
)

export default ClotheList;

