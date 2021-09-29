import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  image!: SafeUrl;

  constructor(private fb: FormBuilder, private data: Data, private sanitizer: DomSanitizer) {
    // constructor function
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
          inp_title: this.data.storage.title,
          inp_location: this.data.storage.location,
          inp_text: this.data.storage.text,
          inp_image: this.data.storage.image
    });
    console.log(this.data.storage)
    
    let objectURL = 'data:image/jpeg;base64,' + this.data.storage.image;
    console.log(objectURL);
    console.log(this.sanitizer.bypassSecurityTrustUrl(objectURL));
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
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