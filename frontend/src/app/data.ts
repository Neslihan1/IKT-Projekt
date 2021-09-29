import { Injectable } from "@angular/core";
import { Note } from "./backend.service";

@Injectable()
export class Data {
    public storage!: Note;
    public constructor() {}
}