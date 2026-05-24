import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  
  stats = [
    { value: '150+', label: 'Projets réalisés' },
    { value: '50+', label: 'Clients satisfaits' },
    { value: '3+', label: 'Années d\'expérience' },
    { value: '24/7', label: 'Support client' }
  ];

  founder = {
    name: 'Nathanael Kouassi',
    role: 'Fondateur & CEO',
    description: 'Développeur passionné avec plus de 3 ans d\'expérience dans le développement web et mobile. Expert en Angular, React, Node.js et Firebase.',
    image: 'assets/images/founder.jpg',
    skills: ['Angular', 'React', 'Node.js', 'Firebase', 'Flutter', 'UI/UX Design']
  };

  ngAfterViewInit() {
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 200
    });
  }
}
