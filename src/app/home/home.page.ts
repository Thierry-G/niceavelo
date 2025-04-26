import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { StatusBarService } from '../status-bar.service';
import { IonContent } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule],
})
export class HomePage implements OnInit {

  private routerSubscription: Subscription | undefined;

  transports = [
    // Données du sondage.
    { id: '000', image: 'velo.svg', title: 'A vélo' },
    { id: '001', image: 'troti.svg', title: 'En trottinette' },
    { id: '002', image: 'TP.svg', title: 'En transport en commun' },
    { id: '003', image: 'pieton.svg', title: 'À pied' },
    { id: '004', image: 'moto.svg', title: 'À moto/scooter' },
    { id: '005', image: 'car.svg', title: 'En voiture' }
  ];

  constructor(
    private router: Router,
    private dataService: DataService,
    private statusBarService: StatusBarService
  ) {
    //this.shuffleArray();
  }

  shuffleArray() {
    // Distribution aléatoire des questions.
    this.transports = this.transports.sort(() => Math.random() - 0.5);
  }

  storeSelection(selectedItem: any) {
    //  Enregistre le titre pour la page suivante
    // Enregistre la première réponse du partricipant.
    localStorage.setItem('Transport', selectedItem.title);
    this.dataService.storeResponse('id', selectedItem.id);
    this.router.navigate(['/distance']);
  }

  toAdmin() {
    // Accès à la page d'admin
    // Supprime cette session de l'enregistremant automatique.
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      const responses = JSON.parse(localStorage.getItem('responses') || '[]');
      const updatedResponses = responses.filter((session: any) => session.sessionId !== sessionId);
      localStorage.setItem('responses', JSON.stringify(updatedResponses));
      localStorage.removeItem('sessionId');
    }
    // Navigation vers admin page
    this.router.navigate(['/admin']);
  }

  ngOnInit() {
    this.statusBarService.configureStatusBar();
    // Ecoute les events de navigation pour détecter quand la page est visitée.
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/') {
        this.shuffleArray();
        this.dataService.startNewSession();
      }
    });
  }
  ngOnDestroy() {
    // Evite les problèmes de mémoire en arrétant l'écoute
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
