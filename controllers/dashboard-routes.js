const router = require("express").Router();
const sequelize = require("../config/connection");
const { Job, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    console.log("dashboard-route")
    const dbJobData = await Job.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          //   attributes: ['filename', 'description'],
          attributes: ["email"],
        },
      ],
    });
console.log(dbJobData);
    const jobs = dbJobData.map((job) => job.get({ plain: true }));
console.log(jobs);
    res.render("dashboard", {
      jobs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;