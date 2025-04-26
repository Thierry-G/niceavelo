import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StatusBarService } from '../status-bar.service';

@Component({
  selector: 'app-merci',
  templateUrl: './merci.page.html',
  styleUrls: ['./merci.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class MerciPage implements OnInit {

  countdown: number = 3;

  constructor(
    private router:Router,
    private statusBarService: StatusBarService
  ) { 
    this.startBubbleAnimation();
    this.startCountdown();
    this.removeTransport();
  }

  removeTransport() {
    // Reinitialise l'entrée Transport
     localStorage.removeItem('Transport');
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; // Decrease the countdown value
      } else {
        clearInterval(interval); // Stop the interval when countdown reaches 0
        this.redirectToHome(); // Redirect after countdown ends
      }
    }, 1000); // Update every second
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  startBubbleAnimation() {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => this.createBubble(), i * 30);
    }
  }

  createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 50 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    bubble.style.top = `${Math.random() * window.innerHeight}px`;
    
    const colors = ["#ff3b3b", "#ff8c3b", "#ffcf3b", "#42ff3b", "#3bffcf", "#3b8cff", "#a03bff"];
    bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const speed = Math.random() * 2 + 0.5;
    bubble.style.animationDuration = `${speed}s`;
    
    document.getElementById('bubbleContainer')?.appendChild(bubble);
    
    setTimeout(() => bubble.remove(), speed * 1000);
  }

  ngOnInit(): void {
    this.statusBarService.configureStatusBar();
  }
}
