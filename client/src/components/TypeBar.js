import { List, ListItem, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';

const TypeBar = observer(
  () => {

    const { clothe } = useContext(Context)

    return (
      <List component="nav" style={{ backgroundColor: "#fff" }}>
        {clothe.types.map(type =>
          <ListItem
            key={type.id}
            button
            onClick={() => clothe.setSelectedType(type)}
            className={ clothe.selectedType.id === type.id ? 'type-list_active' : "" }
          >
            <ListItemText primary={type.name} />
          </ListItem>
        )
        }
      </List>
    )
  }
)

export default TypeBar;