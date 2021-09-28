import { connection as sql } from './db.connection.js';

export const NoteService = {
    create: async(newNote, result) => {
        sql.query("INSERT INTO notes SET ?", newNote, (err, res) => {
            if (err) result(err, null);
            else result(null, { id: res.noteId, ...newNote });
        });
    },
    findById: async(noteId, result) => {
        sql.query(
            `SELECT * FROM notes WHERE id = ?`, [noteId],
            (err, res) => {
                if (err) result(err, null);
                else if (res.length) result(null, res[0]);
                else result({ message: "note not found" }, null);
            }
        );
    },
    getAll: async(result) => {
        sql.query("SELECT * FROM notes", (err, res) => {
            if (err) result(null, err);
            else result(null, res);
        });
    },
    updateById: async(id, note, result) => {
        sql.query(
            "UPDATE notes SET ? where id= ?", [note, id],
            (err, res) => {
                if (err) result(null, err);
                else if (res.affectedRows == 0) result({ message: "note not found" }, null);
                else result(null, { id: id, ...note });
            }
        );
    },
    remove: async(id, result) => {
        sql.query("DELETE FROM notes WHERE id = ?", id, (err, res) => {
            if (err) result(null, err);
            else if (res.affectedRows == 0) result({ message: "note not found" }, null);
            else result(null, res);
        });
    },
    removeAll: async(result) => {
        sql.query("DELETE FROM notes", (err, res) => {
            if (err) result(null, err);
            else result(null, res);
        });
    },
};  