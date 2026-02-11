import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzIconModule,
    NzButtonModule,
    NzSpinModule,
    NzInputModule,
    NzFormModule,
    NzLayoutModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.message.warning("Por favor completa todos los campos correctamente");
      return;
    }

    this.isSpinning = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          };
          StorageService.saveToken(res.jwt);
          StorageService.saveUser(user);

          if (StorageService.isAdminLoggedIn()) {
            this.message.success("Bienvenido administrador!");
            this.router.navigate(['/admin/dashboard']);
          } else if (StorageService.isCustomerLoggedIn()) {
            this.message.success("Bienvenido cliente!");
            this.router.navigate(['/customer/dashboard']);
          }
        } else {
          this.message.error("Credenciales incorrectas", { nzDuration: 5000 });
        }
      },
      error: () => {
        this.message.error("Error al iniciar sesión", { nzDuration: 5000 });
      },
      complete: () => {
        this.isSpinning = false;
      }
    });
  }
}
