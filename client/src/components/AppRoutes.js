import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes/routes';
import { SHOP_ROUTE } from '../utils/const';

const AppRoutes = observer(
  () => {
    const { user } = useContext(Context)

    return (
      <Switch>
        {user.isAuth && authRoutes.map(({ path, component }) =>
          <Route key={path} path={path} component={component} exact />
        )}
        {publicRoutes.map(({ path, component }) =>
          <Route key={path} path={path} component={component} exact />
        )}
        <Redirect to={SHOP_ROUTE} />
      </Switch>
    )
  }
)

export default AppRoutes;