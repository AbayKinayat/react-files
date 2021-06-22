const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const { default: axios } = require('axios');

const generateJwt = ( id, email, role ) => {
  return jwt.sign(
    {id, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role, reToken } = req.body;

    if (!reToken) {
      return next(ApiError.forbidden('ReCaptcha token отсуствует!'));
    }

    try {
      const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=6LdJM0wbAAAAALgS_AM4AaDROXqMck_ZV0wlsMGU&response=${reToken}`
      const response = await axios.post(googleVerifyUrl);
      const { success } = response.data;
      if (success) {
        if (!email && !password) {
          return next(ApiError.badRequest('Некорректный email или password'));
        }
    
        const candidate = await User.findOne({ where: { email } });
    
        if (candidate) {
          return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
    
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
    
        let token = generateJwt(user.id, user.email, user.role)
    
        return res.json({token})
      } else {
        return next(ApiError.forbidden('Неверный reCaptcha. Попробуйте еще раз!'));
      }
    } catch(e) {
      return next(ApiError.forbidden('reCaptcha error'));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email} });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Не верный пароль'));
    }

    let token = generateJwt(user.id, user.email, user.role);

    return res.json({token});
  }

  async check(req, res, next) {
    let token = generateJwt(req.user.id, req.user.email, req.user.role);

    return res.json({token});
  }
}

module.exports = new UserController()