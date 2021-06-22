import { List, ListItem, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';

const BrandBar = observer(
  () => {
    const { clothe } = useContext(Context)
    return (
      <List style={{ backgroundColor: "#fff" }}>
        <div className="brand-list">
          {clothe.brands.map(brand =>
            <ListItem
              key={brand.id}
              button
              onClick={() => clothe.setSelectedBrand(brand)}
              className={clothe.selectedBrand.id === brand.id ? 'type-list_active' : ""}
              style={{width: 'max-content'}}
            >
              <ListItemText primary={brand.name} />
            </ListItem>
          )
          }
        </div>
      </List>

    )
  }
)

export default BrandBar;