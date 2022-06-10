const { About } = require("../models");

class AboutController {
  static async readAbout(req, res) {
      About.findByPk(1)
        .then((data) => {
          return res.status(201).json({
            title: data.title,
            content: data.content,
          })
        })
        .catch((err) => {
          console.log(err)
        })
  }

  static async updateAbout(req, res) {
    const { title, content } = req.body;
    const payload = {
      title,
      content,
    };
    About.update(payload, {
      where: {
        id: 1
      }
    })
      .then(() => {
        res.status(201).json({message: "Success"})
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = AboutController;
