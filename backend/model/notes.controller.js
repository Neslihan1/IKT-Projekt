import { NoteService } from '../database/db.sqlqueries.js';

export const NoteController = {

    readAll: (req, res) => {
        NoteService.getAll((err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while getting all notes",
                });
            else res.json(result);
        });
    },

    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
        }
        const note = {...req.body };
        NoteService.create(note, (err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the note.",
                });
            else res.json(result);
        });
    },

    delete: (req, res) => {
        NoteService.remove(req.params.noteId, (err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while delete the note",
                });
            else res.json(result);
        });
    },

    update: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
        }
        const note = {...req.body };
        NoteService.updateById(
            req.params.noteId,
            note,
            (err, result) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occurred while update the note",
                    });
                else res.json(result);
            }
        );
    },

    readOne: (req, res) => {
        NoteService.findById(req.params.noteId, (err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while getting one note",
                });
            else res.json(result);
        });
    },
};