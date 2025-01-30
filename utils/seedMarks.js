const Student = require("../models/Student");

const seedMarks = async () => {
  const existingStudents = await Student.countDocuments();
  if (existingStudents === 0) {
    const defaultMarks = [
      {
        name: "Raju",
        class: 9,
        section: "A",
        rollno: 1,
        percentage: 90,
      },
      {
        name: "Kaju",
        class: 9,
        section: "A",
        rollno: 4,
        percentage: 90,
      },
      {
        name: "Reema",
        class: 9,
        section: "B",
        rollno: 5,
        percentage: 60,
      },
      {
        name: "Amit",
        class: 9,
        section: "A",
        rollno: 2,
        percentage: 45,
      },
      {
        name: "Neha",
        class: 9,
        section: "A",
        rollno: 3,
        percentage: 80,
      },
      {
        name: "Vikram",
        class: 9,
        section: "C",
        rollno: 5,
        percentage: 47,
      },
      {
        name: "Suresh",
        class: 9,
        section: "C",
        rollno: 6,
        percentage: 90,
      },
      {
        name: "Kavita",
        class: 9,
        section: "B",
        rollno: 8,
        percentage: 93,
      },
      {
        name: "Sneha",
        class: 9,
        section: "C",
        rollno: 4,
        percentage: 85,
      },
      {
        name: "Rahul",
        class: 9,
        section: "B",
        rollno: 10,
        percentage: 70,
      },
    ];
    await Student.insertMany(defaultMarks);
    console.log("Default students data inserted");
  } else {
    console.log("Students data already exists");
  }
};

module.exports = seedMarks;
