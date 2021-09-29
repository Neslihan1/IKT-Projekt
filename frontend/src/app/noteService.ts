import { Injectable } from "@angular/core";
import { BackendService, Note } from "./backend.service";

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private notes: Note[] = []

    constructor(private bs: BackendService,){}

    getNotes() {
        this.bs.getNotes().then((notes: Note[]) =>{
            this.notes.push(...notes);
        });
        return this.notes;
    }

}