const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/allStudents", auth, async (req, res) => {
  try {
    const studentDetails = await Student.find();
    res.status(200).json(studentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/averageMarks", auth, async (req, res) => {
  try {
    const bestClassAverage = await Student.aggregate([
      {
        $group: {
          _id: { className: "$class", section: "$section" },
          averageMarks: { $avg: "$percentage" },
        },
      },
      {
        $sort: { averageMarks: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          class: {
            $concat: [{ $toString: "$_id.className" }, "", "$_id.section"],
          },
          average: { $round: ["$averageMarks", 2] },
        },
      },
    ]);
    if (bestClassAverage.length === 0) {
      return res.status(404).json({ message: "No student data found" });
    }
    res.json(bestClassAverage[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
