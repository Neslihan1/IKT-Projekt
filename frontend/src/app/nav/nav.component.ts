import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NoteService } from '../noteService';
import { Note } from '../backend.service';
import { Router } from '@angular/router';
import { Data } from '../data';

export interface Section {
  title: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  notes: Note[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private data: Data, private breakpointObserver: BreakpointObserver, private router: Router, private ns: NoteService,) {
    this.notes = ns.getNotes();
  }

  route(note: Note) {

    console.log(note);
    this.data.storage = note;
    let route = '/show';
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate([route]));
    
  }
}
