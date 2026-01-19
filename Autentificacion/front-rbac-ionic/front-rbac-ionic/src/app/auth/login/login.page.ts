import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  doLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: (err) => alert(err?.error?.message ?? 'Login inválido'),
    });
  }
}
