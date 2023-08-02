import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-avatar-click-menu',
  templateUrl: './avatar-click-menu.component.html',
  styleUrls: ['./avatar-click-menu.component.css'],
})
export class AvatarClickMenuComponent implements OnInit, OnDestroy {
  @Input() location: any;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() myAccountClickEvent = new EventEmitter<boolean>();
  private justInit = true;
  private contextMenuListener: any;
  private clickListener: any;

  userMenuStyle = {
    display: 'block',
    position: 'absolute',
  };

  constructor(
    private authService: AuthenticationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userMenuStyle = {
      ...this.userMenuStyle,
      ...this.location,
    };
    this.clickListener = this.renderer.listen('window', 'click', (e: any) => {
      if (!this.justInit) this.closeEvent.emit(false);
      this.justInit = false;
    });
    this.contextMenuListener = this.renderer.listen(
      'window',
      'contextmenu',
      (e: any) => {
        e.preventDefault();
        if (!this.justInit) this.closeEvent.emit(false);
        this.justInit = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.clickListener();
    this.contextMenuListener();
  }

  onLogoutClick() {
    this.authService.deleteToken();
    location.reload();
  }

  onMyAccountClick() {
    this.myAccountClickEvent.emit(true);
  }
}
