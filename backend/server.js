import express from 'express';
import cors from 'cors';
import { NoteController } from './model/notes.controller.js'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(express.json({ limit: '20mb' }));

app.get('/', (request, response) => {
    response.send('Hello to the notesapp backend!');
});

app.post("/notes", NoteController.create); // C
app.get("/notes", NoteController.readAll); // R (all)
app.get("/notes/:noteId", NoteController.readOne); // R (one)
app.put("/notes/:noteId", NoteController.update); // U
app.delete("/notes/:noteId", NoteController.delete); // D

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ...`);
    }
});