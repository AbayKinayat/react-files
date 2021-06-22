import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRoutes from './components/AppRoutes';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { CircularProgress, Grid } from '@material-ui/core';

const App = observer(
  () => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
          user.setIsAuth(true);
          user.setUser(true);
        }).finally(setLoading(false))
    }, [user])

    if (loading) {
      return <Grid style={{width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)"}} container justify='center' alignItems="center"> <CircularProgress color="inherit"/> </Grid>
    }
    console.log(process.env.PORT)


    return (
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    );
  }
)

export default App;
