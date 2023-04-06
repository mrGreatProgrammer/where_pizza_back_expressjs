const { Restaurant } = require("../models/models");

class UserController {
  async createRestaurant(req, res, next) {
    try {
      const restaurant = await Restaurant.create({
        title: req.body.title,
        lat: req.body.lat,
        lang: req.body.lang,
      });

      return res.status(200).json({ message: "done", restaurant });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "err" });
    }
  }
  async getRestaurants(req, res, next) {
    try {
      const restaurants = await Restaurant.findAll();

      return res.status(200).json(restaurants);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "err" })
    }
  }
}

module.exports = new UserController();
