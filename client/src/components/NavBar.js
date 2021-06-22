import React, { useContext } from 'react';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';
import { NavLink, useHistory } from 'react-router-dom';

const NavBar = observer(
  () => {
    const { user } = useContext(Context);
    const history = useHistory();

    const logOut = () => {
      user.setIsAuth(false);
      user.setUser({});
    }

    return (
      <AppBar className="Navbar" position="static">
        <Toolbar className="Navbar__inner">
          {
            user.isAuth &&
            <Grid xs={4}>
              <Button onClick={() => history.push(ADMIN_ROUTE)} >Админ панель</Button>
            </Grid>
          }
          <Grid container justify={user.isAuth ? "center" : "flex-start"} xs={user.isAuth ? 4 : 6}>
            <NavLink to={SHOP_ROUTE}><span className="logoArm">ARM</span><span className="logoString">STRING</span></NavLink>
          </Grid>
          <Grid container justify="flex-end" xs={user.isAuth ? 4 : 6}>
            {
              user.isAuth
                ?
                <Button onClick={() => logOut()}>Выйти</Button>
                :
                <Button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
            }
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
)

export default NavBar;