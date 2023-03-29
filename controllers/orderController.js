const { Product, Order } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
  async addOrder(req, res, next) {
    const {
      totalPrice,
      totalCount,
      products,
      userFullName,
      phoneNumber,
      email,
      deliveryMode,
      street,
      house,
      proch,
      floor,
      apartment,
      intercom,
      restaurant,
      fastPrepareTheOrder,
      timePrepareTheOrder,
      paymentType,
      withChange,
      withChangeNum,
      userComments,
    } = req.body;

    try {
      
      
      const order = await Order.create({
        userId: req.user.id,
        totalPrice,
        totalCount,
        orderedProducts: products,
        userFullName,
        phoneNum: phoneNumber,
        email,
        deliveryMode,
        street,
        house,
        proch,
        floor,
        apartment,
        intercom,
        restaurant,
        fastPrepareTheOrder,
        timePrepareTheOrder,
        paymentType,
        withChange,
        withChangeNum,
        userComments,
      });
      
      console.log("*****\n*****\n*****\n*****\n*****\n*****\n*****\n", {userId: req.user.id,
        totalPrice,
        totalCount,
        orderedProducts: products,
        userFullName,
        phoneNum: phoneNumber,
        email,
        deliveryMode,
        street,
        house,
        proch,
        floor,
        apartment,
        intercom,
        restaurant,
        fastPrepareTheOrder,
        timePrepareTheOrder,
        paymentType,
        withChange,
        withChangeNum,
        userComments,})
      return res.status(200).json({
        message: "success",
        order,
      });
    } catch (error) {
      // console.log("*****\n*****\n*****\n*****\n*****\n*****\n*****\n", {userId: req.user.id,
      //   totalPrice,
      //   totalCount,
      //   orderedProducts: products,
      //   userFullName,
      //   phoneNum: phoneNumber,
      //   email,
      //   deliveryMode,
      //   street,
      //   house,
      //   proch,
      //   floor,
      //   apartment,
      //   intercom,
      //   restaurant,
      //   fastPrepareTheOrder,
      //   timePrepareTheOrder,
      //   paymentType,
      //   withChange,
      //   withChangeNum,
      //   userComments,})
      console.log("----->", error)
      return res.status(500).json({message: "err"})
    }
  }

  async editOrder(req, res, next) {
    const { id, userId, orderStatus, payedStatus } = req.body;

    const order = await Order.update(
      { orderStatus, payedStatus },
      { where: { id, userId } }
    );

    return res.status(200).json({ message: "success" });
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
  async getAllForAdmin(req, res) {
    let { brandId, typeId, limit, page } = req.query;

    page = page || 1;
    limit = limit || 4;
    let offset = page * limit - limit;
    let orders;
    if (!brandId && !typeId) {
      orders = await Order.findAndCountAll({
        limit,
        offset,
      });
    }

    return res.status(200).json(orders);
  }
}

module.exports = new OrderController();
