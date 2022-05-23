const { About } = require("../models");

class AboutController {
  static async readAbout(req, res) {
    try {
      const data = await About.findAll();
      console.log(data);
      if (!data.length) return res.json("data not found");
      res.status(200).json(data);
    } catch (error) {
      throw error;
    }
  }

  static async updateAbout(req, res) {
    const role = req.user.role;
    const { title, content } = req.body;
    const payload = {
      title,
      content,
    };
    try {
      if (role === "user") res.json("only admin can update about page");
      await About.update(payload, { where: { id: 1 } });
      res.status(200).json(`data updated success`);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AboutController;
