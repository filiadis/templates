import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-splash-screen',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent {

  btnOn: boolean = environment.splashScreen;

  hide() {
    this.btnOn = false
  }

}
