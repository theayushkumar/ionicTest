import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('popover') popover!: { event: Event };

  currentTime: number = 0;
  duration: number = 0;
  isPlaying: boolean = false;
  isFullscreen: boolean = false;
  isOpen = false;
  controlsVisible: boolean = true;
  private controlsTimeout: any;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.addEventListener('timeupdate', this.updateVideoTime.bind(this));
    video.addEventListener('loadedmetadata', this.setVideoDuration.bind(this));
    video.addEventListener('play', () => (this.isPlaying = true));
    video.addEventListener('pause', () => (this.isPlaying = false));
    this.showControlsTemporarily();
  }

  updateVideoTime() {
    this.currentTime = this.videoPlayer.nativeElement.currentTime;
  }

  setVideoDuration() {
    this.duration = this.videoPlayer.nativeElement.duration;
  }

  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    video.paused ? video.play() : video.pause();
    this.showControlsTemporarily();
  }

  skipBackward() {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = Math.max(video.currentTime - 10, 0);
    this.showControlsTemporarily();
  }

  skipForward() {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = Math.min(video.currentTime + 10, this.duration);
    this.showControlsTemporarily();
  }

  onRangeChange(event: any) {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = event.detail.value;
    this.showControlsTemporarily();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
    this.showControlsTemporarily();
  }

  toggleFullscreen() {
    const videoPanel = document.querySelector('.videoPanel') as HTMLElement;

    if (!this.isFullscreen) {
      if (videoPanel.requestFullscreen) {
        videoPanel.requestFullscreen();
      } else if ((videoPanel as any).webkitRequestFullscreen) {
        (videoPanel as any).webkitRequestFullscreen(); // For iOS Safari
      }

      if ((screen.orientation as any)?.lock) {
        (screen.orientation as any).lock('landscape').catch(console.warn);
      }

      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }

      if ((screen.orientation as any)?.unlock) {
        (screen.orientation as any).unlock();
      }

      this.isFullscreen = false;
    }
    this.showControlsTemporarily();
  }

  showControlsTemporarily() {
    this.controlsVisible = true;

    clearTimeout(this.controlsTimeout);
    this.controlsTimeout = setTimeout(() => {
      this.controlsVisible = false;
    }, 3000);
  }
}
