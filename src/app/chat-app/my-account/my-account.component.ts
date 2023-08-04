import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, combineLatestWith } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SelfService } from '../service/self.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
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
  error = false;
  @Output() closeMyAccountEvent = new EventEmitter<boolean>();
  @ViewChild('avatarInput') avatarInput: ElementRef | undefined;

  constructor(
    private selfService: SelfService,
    private httpClient: HttpClient
  ) {
  }

  get Self() {
    return this.selfService.Self;
  }

  get Image() {
    return this.selfService.Self?.avatar;
  }

  closeMyAccount(e: Event | undefined = undefined) {
    e?.preventDefault();
    this.closeMyAccountEvent.emit(false);
    this.tempAvatar = undefined;
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
    obs.pipe(combineLatestWith(avaObs)).subscribe({
      next: () => {
        const newSelf = {
          id: this.Self?.id as string,
          username: this.tempUsername as string,
          email: this.tempEmail as string,
          phoneNumber: this.tempPhoneNumber as string,
          online: this.Self?.online as boolean,
          lastSeen: this.Self?.lastSeen as string,
          avatar: undefined,
        };
        this.selfService.Self = newSelf;
        if (this.tempAvatar) this.selfService.Self.avatar = this.tempAvatar;
        this.closeMyAccount();
      },
      error: () => {
        this.error = true;
      },
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
