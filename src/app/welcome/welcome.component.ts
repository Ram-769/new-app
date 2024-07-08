import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  OnInit(){
    const videoPlayer = document.getElementById('videoPlayer') as HTMLVideoElement | null;
  
    if (videoPlayer) {
      // Event listener for when the video ends
      videoPlayer.addEventListener('ended', () => {
        videoPlayer.currentTime = 0; // Reset to the beginning
        videoPlayer.play(); // Start playing again
      });
  
      // Start playing the video initially
      videoPlayer.play();
    } else {
      console.error('Video player element not found');
    }

  }
  
 
  
}
