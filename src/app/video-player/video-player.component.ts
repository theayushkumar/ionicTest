import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('popover') popover!: { event: Event; };

  currentTime: number = 0;
  duration: number = 0;
  isPlaying: boolean = false; 
  isFullscreen: boolean = false;
  isOpen = false;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.addEventListener('timeupdate', this.updateVideoTime.bind(this));
    video.addEventListener('loadedmetadata', this.setVideoDuration.bind(this));
    video.addEventListener('play', this.onPlay.bind(this));   // Event listener for play
    video.addEventListener('pause', this.onPause.bind(this)); // Event listener for pause
  }

  // Update currentTime as the video plays
  updateVideoTime() {
    this.currentTime = this.videoPlayer.nativeElement.currentTime;
  }

  // Set video duration once the metadata is loaded
  setVideoDuration() {
    this.duration = this.videoPlayer.nativeElement.duration;
  }

  // Update play state when the video starts playing
  onPlay() {
    this.isPlaying = true;
  }

  // Update play state when the video is paused
  onPause() {
    this.isPlaying = false;
  }

  // Play or Pause the video
  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  // Skip backward by 10 seconds
  skipBackward() {
    const video = this.videoPlayer.nativeElement;
    video.currentTime -= 10;
  }

  // Skip forward by 10 seconds
  skipForward() {
    const video = this.videoPlayer.nativeElement;
    video.currentTime += 10;
  }

  onRangeChange(event: any) {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = event.detail.value;
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }


  toggleFullscreen() {
    const video = this.videoPlayer.nativeElement;
    if (!this.isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

}
