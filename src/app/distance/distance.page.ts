import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { DataService } from '../data.service';
import { StatusBarService } from '../status-bar.service';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule]
})
export class DistancePage implements OnInit {
  sliderValue: number = 0;
  exactDistance: number = 0;
  transport = localStorage.getItem('Transport');
  lowerCaseTransport = this.transport ? this.transport.charAt(0).toLowerCase() + this.transport.slice(1) : '';

  constructor(
    private router:Router,
    private dataService: DataService,
    private statusBarService: StatusBarService
  ) { }

  onSliderChange(event: Event) {
    // Gestion du slider
    const input = event.target as HTMLInputElement;
    this.sliderValue = parseInt(input.value);
    
    // Interpolation de la distances
    const distances = [500, 1000, 2000, 5000, 10000, 15000];
    const minIndex = Math.floor(this.sliderValue / 20);
    const maxIndex = minIndex + 1;
    
    const minValue = distances[minIndex] || distances[0];
    const maxValue = distances[maxIndex] || distances[distances.length - 1];
    
    this.exactDistance = Math.round(
      minValue + ((maxValue - minValue) * ((this.sliderValue % 20) / 20))
    );
  }

  submitDistance() {
    // Ajout de la réponse
    this.dataService.storeResponse("distance", this.exactDistance.toString());
    this.router.navigate(['/merci']);
  }
  ngOnInit(): void {
    this.statusBarService.configureStatusBar();
  }
}
