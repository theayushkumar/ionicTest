import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.scss'],
})
export class VideoPanelComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: any;

  currentPayId: any = 410;

  isPlaying: boolean = false;
  isFullscreen: boolean = false;
  showSettings: boolean = false;
  currentTime: number = 0;
  duration: number = 0;

  unitId: number = 10;
  video_url: string = 'https://granlighting.co.in/';
  currentVideoPlay: any;
  isLoading: boolean = true;
  videoData: any;

  // Playback speeds
  playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  playbackSpeed: number = 1; // Default speed (Normal)

  // For video quality selection
  selectedQuality: string = ''; // This holds the selected quality value

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getVideoData();
  }

  getVideoData() {
    try {
      this.http.get<any>(`https://granlighting.co.in/api/VideoView?UnitId=${this.unitId}`).subscribe((res: any) => {
        if (res.length === 0) {
          console.log('Video not available');
        } else {
          console.log('Unit Data:', res);
          this.videoData = res;

          const newPlay = this.videoData.filter((v: any) => v.Id === this.currentPayId);

          if (newPlay.length > 0) {
            this.play_video(newPlay);
          } else {
            console.log('No video found for current ID');
          }
        }
      });
    } catch (error) {
      console.error('An error occurred during unit video fetch:', error);
      console.log('An unexpected error occurred. Please try again later.');
    }
  }

  play_video(newPlay: any) {
    this.currentVideoPlay = newPlay[0];
    this.selectedQuality = this.currentVideoPlay?.videoFormat[0]; // Default to the first quality option
  }

  togglePlayPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  onTimeUpdate() {
    const video = this.videoPlayer.nativeElement;
    this.currentTime = video.currentTime;
  }

  onMetadataLoaded() {
    const video = this.videoPlayer.nativeElement;
    this.duration = video.duration;
  }

  seekTo(event: any) {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = event.detail.value;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  changeQuality(event: any) {
    const video = this.videoPlayer.nativeElement;
    const selectedQuality = event.detail.value;
    const selectedQualityIndex = this.currentVideoPlay?.videoFormat.indexOf(selectedQuality);

    // If a valid quality option is selected, change the video source
    if (selectedQualityIndex !== -1) {
      const newSource = this.video_url + this.currentVideoPlay?.videoFormatUrl[selectedQualityIndex];
      video.src = newSource;
      video.load();
      if (this.isPlaying) {
        video.play();
      }
    }
  }

  changePlaybackSpeed(event: any) {
    const video = this.videoPlayer.nativeElement;
    video.playbackRate = event.detail.value; // Update playback speed
  }
}
