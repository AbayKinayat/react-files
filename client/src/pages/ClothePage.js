import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneClothe } from '../http/clotheAPI';

const ClothPage = () => {

  const [clothe, setClothe] = useState({info: []})
  const {id} = useParams();
  console.log(id)

  useEffect(() => {
    fetchOneClothe(id).then(data => {
      setClothe(data)
    })
  }, [])

  return (
    <div style={{ display: 'flex', maxWidth: 1000, margin: "20px auto" }}>
      <img alt="одежда" width="335px" height="501px" style={{ objectFit: 'cover' }} src={clothe.img} />
      <div style={{ maxWidth: 400, width: '100%', marginLeft: 30 }}>
        <div className="clothe-page__top-info">
          <h5>{clothe.name}</h5>
          <h5>Рейтинг: {clothe.rating}</h5>
          <h5>Цена: {clothe.price}тг</h5>
          <Button variant="outlined">
            Добавить в корзину
          </Button>
        </div>
        <div>
          {
            clothe.info.map((description, index) =>
              <div style={{ padding: "5px 10px", background: index % 2 === 0 ? "#E2B661" : "#fff" }} key={description.id}>
                {description.title + ": " + description.description}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ClothPage;