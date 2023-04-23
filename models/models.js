const sequelize = require("../settings/db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  birthDate: { type: DataTypes.DATEONLY, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ProductsGroup = sequelize.define("products_group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Ingredient = sequelize.define("ingredient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  discount: { type: DataTypes.INTEGER, allowNull: true },
  about: { type: DataTypes.STRING, allowNull: true },
  img: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userFullName: { type: DataTypes.STRING, allowNull: false },
  phoneNum: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },

  totalPrice: { type: DataTypes.INTEGER, allowNull: false },
  totalCount: { type: DataTypes.INTEGER, allowNull: false },
  orderStatus: { type: DataTypes.STRING, allowNull: true },
  payedStatus: { type: DataTypes.STRING, allowNull: true },
  orderedProducts: { type: DataTypes.JSON, allowNull: false },
  deliveryMode: { type: DataTypes.BOOLEAN },
  street: { type: DataTypes.STRING, allowNull: true },
  house: { type: DataTypes.STRING, allowNull: true },
  proch: { type: DataTypes.STRING, allowNull: true },
  floor: { type: DataTypes.STRING, allowNull: true },
  apartment: { type: DataTypes.STRING, allowNull: true },
  intercom: { type: DataTypes.STRING, allowNull: true },
  restaurant: { type: DataTypes.STRING, allowNull: true },

  fastPrepareTheOrder: { type: DataTypes.BOOLEAN },
  timePrepareTheOrder: { type: DataTypes.STRING, allowNull: true },
  paymentType: { type: DataTypes.INTEGER, allowNull: true },

  withChange: { type: DataTypes.BOOLEAN },
  withChangeNum: { type: DataTypes.STRING, allowNull: true },

  userComments: { type: DataTypes.TEXT, allowNull: true },
});

const Product_Ingregient = sequelize.define("Product_Ingregient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Restaurant = sequelize.define("Restaurant", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  // location: {type: DataTypes.STRING}
  lat: { type: DataTypes.FLOAT },
  lang: { type: DataTypes.FLOAT },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

ProductsGroup.hasMany(Product, { as: "products" });
Product.belongsTo(ProductsGroup);

// Product.hasMany(ProductsGroup);
// ProductsGroup.belongsTo(Product);

// Product.hasMany(ProductReciep, { as: "productReciep" });
// ProductReciep.belongsTo(Product);

// ProductReciep.hasMany(Product, {as: "product_recieps"});
// Product.belongsTo(ProductReciep);
Product.belongsToMany(Ingredient, {
  through: Product_Ingregient,
  //    as: "ingredients",
  // foreignKey: "productIngredient_id"
});
Ingredient.belongsToMany(Product, {
  through: Product_Ingregient,
  //   , as: "products",
  // foreignKey: "product_id"
});

// ProductReciep.belongsToMany(Product, { through: TypeBrand });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  ProductsGroup,
  Ingredient,
  Order,
  Product_Ingregient,
  Restaurant,
};
