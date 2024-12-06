import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
  }
}
