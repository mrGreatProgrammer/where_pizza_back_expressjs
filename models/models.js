const sequelize = require("../settings/db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  birthDate: {type: DataTypes.DATEONLY, allowNull: true},
  address: {type: DataTypes.STRING, allowNull: true}
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  discount: { type: DataTypes.INTEGER, allowNull: true },
  about: { type: DataTypes.STRING, allowNull: true },
  img: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
});

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  totalPrice: {type: DataTypes.INTEGER, allowNull: false},
  totalCount: {type: DataTypes.INTEGER, allowNull: false},
  orderStatus: {type: DataTypes.STRING, allowNull: true},
  payedStatus: {type: DataTypes.STRING, allowNull: true},
  orderedProducts: {type: DataTypes.TEXT, allowNull: false}
})

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  Order
};
