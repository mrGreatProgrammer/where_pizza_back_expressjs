const { Product, Order } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
  async addOrder(req, res, next) {
    const { totalPrice, totalCount, products } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      totalPrice,
      totalCount,
      orderedProducts: products,
    });

    return res.status(200).json({
      message: "success",
      order,
    });
  }

  async editOrder(req, res, next){
    const {id, userId, orderStatus, payedStatus} = req.body;


    const order = await Order.update({orderStatus, payedStatus}, {where: {id, userId}});

    return res.status(200).json({message: 'success'})
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;

    const userId = req.user.id;

    page = page || 1;
    limit = limit || 4;
    let offset = page * limit - limit;
    let orders;
    if (!brandId && !typeId) {
      orders = await Order.findAndCountAll({
        limit,
        offset,
        where: { userId },
      });
    }

    return res.json(orders);
  }
}

module.exports = new OrderController();
