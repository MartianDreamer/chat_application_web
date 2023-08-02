import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Observable,
  Subject,
  Subscription,
  combineLatest,
  combineLatestWith,
} from 'rxjs';
import { SelfService } from 'src/app/service/self.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  myAccountStyle = {
    left: `${window.innerWidth / 2.5}px`,
    top: `${window.innerHeight / 2.5}px`,
  };
  mouseDragStartLocation: any;
  openUploadForm = false;
  tempAvatar: string | undefined;
  tempAvatarFile: any;
  isEdittingUsername = false;
  isEdittingEmail = false;
  isEdittingPhone = false;
  isEdittingPassword = false;
  tempUsername = this.selfService.Self?.username;
  tempEmail = this.selfService.Self?.email;
  tempPhoneNumber = this.selfService.Self?.phoneNumber;
  tempPassword: string | undefined;
  @Output() closeMyAccountEvent = new EventEmitter<boolean>();
  @ViewChild('avatarInput') avatarInput: ElementRef | undefined;

  constructor(
    private selfService: SelfService,
    private httpClient: HttpClient
  ) {}

  get Self() {
    return this.selfService.Self;
  }

  get Image() {
    return this.selfService.Image;
  }

  closeMyAccount(e: Event | undefined = undefined) {
    e?.preventDefault();
    this.closeMyAccountEvent.emit(false);
    this.tempAvatar = undefined;
  }

  onDragStartMyAccount(e: MouseEvent) {
    this.mouseDragStartLocation = {
      left: e.clientX,
      top: e.clientY,
    };
  }

  onDragEndMyAccount(e: MouseEvent) {
    e.preventDefault();
    const dragDistance = {
      left: e.clientX - this.mouseDragStartLocation.left,
      top: e.clientY - this.mouseDragStartLocation.top,
    };
    const oldLeft = Number.parseFloat(
      this.myAccountStyle.left.replace('px', '')
    );
    const oldTop = Number.parseFloat(this.myAccountStyle.top.replace('px', ''));
    this.myAccountStyle = {
      left: `${oldLeft + dragDistance.left}px`,
      top: `${oldTop + dragDistance.top}px`,
    };
  }

  openFileSelection(e: MouseEvent) {
    this.avatarInput?.nativeElement.click();
  }

  onAvatarChange(e: any) {
    if (
      e.target.files.length !== 1 ||
      !e.target.files[0].type.startsWith('image')
    ) {
      return;
    }
    this.tempAvatarFile = e.target.files[0];
    const fr = new FileReader();
    fr.onload = () => {
      this.tempAvatar = btoa(fr.result as string);
    };
    fr.readAsBinaryString(e.target.files[0]);
  }

  uploadAvatar() {
    if (!this.tempAvatarFile) {
      return new Observable((subscriber) => subscriber.next('done'));
    }
    const form = new FormData();
    form.append('file', this.tempAvatarFile);
    return this.httpClient.post(
      `${environment.apiUrl}/rest/users/avatar`,
      form
    );
  }

  onSave() {
    const obs = this.selfService.updateSelfInformation({
      username: this.tempUsername,
      password: this.tempPassword,
      email: this.tempEmail,
      phoneNumber: this.tempPhoneNumber,
    });
    const avaObs = this.uploadAvatar();
    obs.pipe(combineLatestWith(avaObs)).subscribe(([user, ava]) => {
      if (this.tempAvatar) {
        this.selfService.Image = this.tempAvatar;
      }
      this.closeMyAccount();
    });
  }

  editUsername() {
    this.isEdittingUsername = !this.isEdittingUsername;
  }
  editEmail() {
    this.isEdittingEmail = !this.isEdittingEmail;
  }
  editPhone() {
    this.isEdittingPhone = !this.isEdittingPhone;
  }

  editPassword() {
    this.isEdittingPassword = !this.isEdittingPassword;
  }
}
