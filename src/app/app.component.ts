import { Component, OnInit} from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const dentroSesion = this.userService.dentroSesion();
    if (dentroSesion) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

 
}
