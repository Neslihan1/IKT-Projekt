import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Note {
  id: number;
  title: string;
  location: string;
  text: string;
  image: '';
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiUrl = 'http://localhost:3000/notes';
  constructor(private http: HttpClient) { }


  public addNote(note: { id: null; title: any; location: any; text: any, image: string; }): Promise<Note> {
    return this.http
      .post<Note>(`${this.apiUrl}`, note, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Type': 'application/json',
        }),
      })
      .toPromise();
  }
  
  public getNotes(): Promise<Array<Note>> {
    return this.http
      .get<Array<Note>>(`${this.apiUrl}`).toPromise();
  }
}