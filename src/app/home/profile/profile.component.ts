import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
  }
}
