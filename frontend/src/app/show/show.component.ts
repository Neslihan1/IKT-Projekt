import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Route } from '@angular/router';
import { BackendService, Note } from '../backend.service';
import { Data } from '../data';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  formGroup!: FormGroup;
  note!: Note;
  imageBase64!: '';

  constructor(private fb: FormBuilder, private data: Data) {
    // constructor function
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
          inp_title: this.data.storage.title,
          inp_location: this.data.storage.location,
          inp_text: this.data.storage.text,
          inp_image: this.data.storage.image
    });
  }

  get inp_title(): FormControl {
    return this.formGroup.get('inp_title') as FormControl;
  }

  get inp_location(): FormControl {
    return this.formGroup.get('inp_location') as FormControl;
  }

  get inp_text(): FormControl {
    return this.formGroup.get('inp_text') as FormControl;
  }

  get inp_image(): FormControl {
    return this.formGroup.get('inp_image') as FormControl;
  }

}