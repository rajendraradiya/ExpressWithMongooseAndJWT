const noteModel = require("../model/notes");
const logger = require("../plugin/logger");

const getNotes = async (req, res) => {
  try {
    const notesList = await noteModel.find({});
    res.status(200).json({ data: notesList });
  } catch (error) {
    logger.fatal(error);
    res.status(500).json("Something when wrong");
  }
};

const createNotes = async (req, res) => {
  const { title, description, id } = req.body;
  const newNotes = noteModel({
    title: title,
    description: description,
    userId: id,
  });
  try {
    const result = await newNotes.save();
    res
      .status(201)
      .json({ data: result, message: "Notes Added Successfully!" });
  } catch (error) {
    logger.fatal(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getNotes, createNotes };
