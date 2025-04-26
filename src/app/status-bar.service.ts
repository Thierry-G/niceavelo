import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';

@Injectable({
   providedIn: 'root',
})
export class StatusBarService {
   // Options de la barre d'option
   async configureStatusBar(overlay: boolean = true): Promise<void> {
      try {
         // Masque la barre de status
         await StatusBar.hide();
         // Affiche la barre de status en transparence
         // await StatusBar.setOverlaysWebView({ overlay });
      } catch (error) {
         console.error('Error configuring the status bar:', error);
      }
   }
}
