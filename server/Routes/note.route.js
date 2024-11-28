const express = require('express');
const router = express.Router();
const noteModel = require('../models/note.model');


const getNotes = async (req, res) => {
    try {
      const notes = await noteModel.find();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getNote = async (req, res) => {
  console.log(req.body);
      try {
      const id = req.params.id;
      const note = await noteModel.findById(id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      res.status(200).json(note);
      } catch (error) {
        console.log(req.body);
      res.status(500).json({ message: error.message });
    }
};
  
const addNote = async (req, res) => {
       const { title, content } = req.body;
        const newNote = new noteModel({
            title: title,
            content:content,
        });
        
        try {
            const note = await newNote.save();
            res.status(201).json(note);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
  
const updateNote = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedNote = await noteModel.findByIdAndUpdate(
          id,
          {
            title: req.body.title,
            content: req.body.content,
          },
          { new: true }
        );
    
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(updatedNote);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};
  
const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedNote = await noteModel.findByIdAndDelete(id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    
  };
  

//retrieve all notes
router.get('/', getNotes);

//retreive note by id
router.get('/:id', getNote);

//add note
router.post('/', addNote);

//update note by id
router.put('/:id', updateNote);

//delete note by id
router.delete('/:id', deleteNote);

module.exports = router;
