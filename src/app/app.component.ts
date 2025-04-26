import { Component, AfterViewInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}

  ngAfterViewInit() {
    // Hide the splash screen after Angular finishes rendering
    SplashScreen.hide();
  }
}
