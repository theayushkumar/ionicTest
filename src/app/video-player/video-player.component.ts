import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  isPlaying: boolean = true;  // Track the playing state

  constructor() {}

  ngOnInit() {}

  togglePlayPause(videoElement: HTMLVideoElement) {
    if (this.isPlaying) {
      videoElement.pause();  // Pause the video
    } else {
      videoElement.play();   // Play the video
    }
    this.isPlaying = !this.isPlaying;  // Toggle the play/pause state
  }
  
}
