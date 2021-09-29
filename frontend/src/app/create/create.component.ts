import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;
  errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  formGroup!: FormGroup;
  imageBase64!: string;

  constructor(private fb: FormBuilder, private bs: BackendService,) {
    // constructor function
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    });
    this.formGroup = this.fb.group({
          inp_title: ['', Validators.required],
          inp_location: ['', Validators.required],
          inp_text: ['', Validators.required],
          inp_image: ['', Validators.required]
    });
  }

  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);
    this.showWebcam = false;
    this.uploadCameraFileEvt(webcamImage);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
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

  async onSubmit(): Promise<void>
  {
      const note = {
        id: null,
        title: this.inp_title.value,
        location: this.inp_location.value,
        text: this.inp_text.value,
        image: this.imageBase64
      }
      console.log('note : ', note);

      await this.bs.addNote(note).then(() => window.location.reload());
  }

  uploadCameraFileEvt(webcamImage: WebcamImage) {
    this.imageBase64 = webcamImage.imageAsBase64;
    console.log('base64', this.imageBase64);
    (this.formGroup.get('inp_image') as FormControl).setErrors(null);
    
  }

  uploadFileEvt(imgFile: any): void {
    console.log('upload', imgFile.target.files);
    if (imgFile.target.files && imgFile.target.files[0]) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;
          console.log('base64', imgBase64Path);
          this.imageBase64 = imgBase64Path.substr(imgBase64Path.indexOf(',') + 1);

        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

    }
  }

}