import { Button, withStyles, Checkbox, Grid, TextField, InputAdornment, FormControlLabel } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import woman from '../assets/woman.jpg';
import { PlayArrowRounded, AccountCircle, AlternateEmailRounded, LockOpenRounded } from '@material-ui/icons';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/const';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { registration, login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import ReCAPTCHA from 'react-google-recaptcha';
const CssTextField = withStyles({
  root: {
    '&': {
      width: "100%"
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& label': {
      color: '#fff',
    },
    '& .MuiInput-border:after': {
      borderColor: '#FF7A00',
    },
    '& .MuiInput-underline:hover': {
      borderColor: '#FF7A00',
    },
    '& .MuiOutlinedInput-root': {
      '&': {
        color: '#fff',
      },
      '& fieldset': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: '#c4c4c4',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c4c4c4',
      },

    },
  }

})(TextField);

const GreenCheckbox = withStyles({
  root: {
    color: '#ffffff',
    '&$checked': {
      color: '#ffffff',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Auth = observer(
  () => {
    const { user } = useContext(Context);

    const [checked, setChecked] = useState(false)
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ reToken, setReToken ] = useState('')

    const captcha = useRef();

    const click = async () => {
      try {
        let data;
        debugger
        if (isLogin) {
          data = await login(email, password);
        } else {
          data = await registration(email, password, reToken);
        }
        user.setIsAuth(true)
        user.setUser(user)
        history.push(SHOP_ROUTE)
        setReToken("")
        // setTimeout(captcha.current.reset(), 1000);
      } catch (e) {
        alert(e.response.data.message)
      }

    }

    const handleChange = () => {
      setChecked(!checked)
    }

    return (
      <div className="auth-wrapped" style={{ height: window.innerHeight - 64 }}>
        <div className="auth">
          <div className="auth-content__wrapped_left" style={{ backgroundImage: `url(${woman})` }}>
            <span className="logoArm">ARM</span><span className="logoString">STRING</span>
            <div className="slogan">
              ОДЕВАЙСЯ<br />
              чувствуй<br />
              удовольствие
            </div>
            <Button className="watchButton">
              <PlayArrowRounded />
              Посмотреть видео
            </Button>
          </div>
          <div className="auth-content__wrapped_right">
            <div>
              <div className="auth-attainment">
                Уже как 1 миллиона продаж за 2021 год
              </div>
              <p className="auth-attainment__description">
                Кампания ARMSTRING  - американская компания, крупнейшая в мире на рынках. В данный момент на Amazon присутствует около трех миллионов активных продавцов во всем мире, которые делают до 60% всех продаж на платформе.
              </p>
              {!isLogin &&
                <CssTextField
                  label="Ваше имя"
                  variant="outlined"
                  style={{ marginTop: 10 }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle style={{ color: "#fff" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              }
              <CssTextField
                label="Ваш email"
                variant="outlined"
                style={{ marginTop: 10 }}
                size="small"
                value={email}
                onChange={e => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailRounded style={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <CssTextField
                label="Ваш пароль"
                variant="outlined"
                type="password"
                style={{ marginTop: 10 }}
                size="small"
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenRounded style={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {!isLogin &&
                <Grid container justify="center">
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={checked}
                        onChange={handleChange}
                      />
                    }
                    label="Я согласен с политикой конфиденциальности"
                  />
                </Grid>
              }
              {!isLogin &&
                <ReCAPTCHA 
                  sitekey="6LdJM0wbAAAAAJLPDj0y9_YkdYX5Yv-hEvW9vl_a"
                  onChange={token => setReToken(token)}
                  onExpired={e => setReToken("")}
                  ref={captcha}
                />
              }
              <Button onClick={click} className="auth-button">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
              <Grid container justify="center">
                {
                  isLogin ?
                    <div style={{ fontSize: 10, marginTop: 10 }}>Есть аккаунт? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></div>
                    :
                    <div style={{ fontSize: 10, marginTop: 10 }}>Уже зарегистрировались? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
                }
              </Grid>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default Auth;