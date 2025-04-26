import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Share } from '@capacitor/share';
import { Device, DeviceId } from '@capacitor/device';
import { Dialog } from '@capacitor/dialog';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { download, trash, save } from 'ionicons/icons';
import { IonContent, IonHeader, IonToolbar, IonButton, IonCard, IonItem, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonInput, IonLabel } from '@ionic/angular/standalone';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonLabel, IonLabel, IonInput, IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonItem, IonCard, IonButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule ]

})
export class AdminPage implements OnInit {
  deviceID: string = '';
  isEmpty = true;
  password: string = '';
  username: string = '';
  fileName: String  = '';
  isAuthenticated = false;

  constructor(
    private router: Router
  ) { 
    addIcons({ download, trash, save });
  }

  async authenticate(): Promise<void> {
    // Authentification
    // A modifier pour sécuriser !
    const validUsername = 'admin';
    const validPassword = 'admin123';

    if (this.username === validUsername && this.password === validPassword) {
      this.isAuthenticated = true;
      this.password = ''; // Clear password for security
    } else {
        await this.showAlert('Accès refusé', 'Coucou, les hackers ;-\)');
    }
  }

  getDataSize(): any {
    const data = localStorage.getItem('responses');
    let parsedData = data ? JSON.parse(data) : [];
    if (parsedData.length <= 1) {
      this.isEmpty = true;
      return 0;
    } else {
      if (parsedData > 300) {
       const recoElement = document.getElementById('reco');
       if (recoElement) {
         recoElement.style.display = 'block';
       }
      }
      this.isEmpty = false;
      return parsedData.length;
    }
  }

  getFormattedDate(): string {
    // Date
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = String(date.getFullYear()).slice(-2); // 2 derniers chiffres de l'année

    return `${day}-${month}-${year}`;
  }

  updateButtonState(): void {
    // Desactive les boutons lorsqu'il y a rien à exporter.
    let data = localStorage.getItem('responses');
    let parsedData = data ? JSON.parse(data) : [];
    this.isEmpty = parsedData.length === 0;

    document.querySelectorAll('.action-button').forEach(button => {
      button.setAttribute('disabled', this.isEmpty.toString());
    });
  }

  exit() {
    this.router.navigate(['/']);
  }

  async exportAndShare(): Promise<void> {
    // Données du sondage
    const surveyData = localStorage.getItem('responses');
  
    if (!surveyData) {
      await this.showAlert('No job!', 'Aucune donnée à exporter.');
      return;
    }
  
    // Formatage des données en JSON
    const jsonData = JSON.stringify(JSON.parse(surveyData), null, 2);
  
    try {
      // Ecriture des données dans le dossier Documents
      const fileName  = `NiceaVelo_${this.deviceID}_${Date.now().toString()}.json`;
      const result = await Filesystem.writeFile({
        path: fileName,
        data: jsonData,
        directory: Directory.Documents, // Dossier Documents
        encoding: Encoding.UTF8,
      });

      // Retrieve the correct URI for the file
      const fileUri = await Filesystem.getUri({
        path: fileName,
        directory: Directory.Documents,
      });

      // Export the file using the correct URI
      await Share.share({
        title: 'Enquete Nice à vélo',
        text: 'Fichier de collecte des données.',
        url: fileUri.uri, // Correct URI for sharing
        dialogTitle: 'Export des données du questionnaire'
      });

    } catch (e) {
      console.error('Error writing or sharing file', e);
    }

  }
  
  async clearData() {
    localStorage.removeItem('responses');
    //console.log('Cleared local storage.');
  }

  async getDeviceId(): Promise<DeviceId> {
    // Récupération du device Id
    const id = await Device.getId();
    return id;
  };

  async showAlert(header: string, message: string): Promise<void> {
    await Dialog.alert({
      title: header,
      message: message,
    });
  }

  async ngOnInit(): Promise<void> {
    const deviceId = await this.getDeviceId();
    this.getDataSize();
    this.deviceID = deviceId.identifier;
  }

}
