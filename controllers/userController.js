const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Basket } = require("../models/models");
const ApiError = require("../error/ApiError");

const generateJwt = (id, fullName, tel, role) => {
  return jwt.sign({ id, fullName, tel, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { tel, fullName, password, role } = req.body;
    if (!tel || !password) {
      return next(ApiError.badRequest("Некорректный tel или password", res));
    }
    const candidate = await User.findOne({ where: { tel } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким tel уже существует", res)
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      fullName,
      tel,
      role,
      password: hashPassword,
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.fullName, user.tel, user.role);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        tel: user.tel,
        role: user.role,
      },
    });
  }

  async login(req, res, next) {
    const { tel, password } = req.body;
    const user = await User.findOne({ where: { tel } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден", res));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.forbidden("Указан неверный пароль", res));
    }
    const token = generateJwt(user.id, user.fullName, user.tel, user.role);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        tel: user.tel,
        role: user.role,
      },
    });
  }

  async check(req, res, next) {
    const user = {
      id: req.user.id,
      fullName: req.user.fullName,
      tel: req.user.tel,
      role: req.user.role,
    };
    return res.status(200).json(user);
  }

  async editMySelf(req, res, next) {
    try {
      const { fullName, tel, email, birthDate, address } = req.body;
      await User.update(
        { fullName, tel, email, birthDate, address },
        // req.body,
        { where: { id: req.user.id } }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log("!!!!!!\n!!!!\n", err, "\n&&&&&&\n&&&&&&&&");
          res.status(500).json({ message: "Server error" });
        });
        const user = await User.findOne({where: {id: req.user.id}})
        // return res.status(200).json(user);
        return res.status(200).json({ message: "ok", user: {
          id: user.id,
          fullName: user.fullName,
          role: user.role,
          tel: user.tel,
          address: user.address,
          email: user.email,
          birthDate: user.birthDate
        } });
      } catch (error) {
      console.log(
        "++++++++++++\n========\n========\n======\n",
        error,
        "\n---------\n------\n------"
      );
      return next(ApiError.internal("EROR dfdff", res));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 8;
    let offset = page * limit - limit;
    try {
        let users = await User.findAndCountAll({
          limit,
          offset,
        });
      return res.status(200).json(users);
    } catch (error) {
      console.log("get all users err:---->", error);
      return res.status(500).json({ message: "server err" });
    }
  }
}

module.exports = new UserController();
