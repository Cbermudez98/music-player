import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("musicInput") music!: ElementRef;
  public src: any;
  public reproductor: any;
  public nameSong!: string;
  public dvd = "../../../assets/dvd.gif"
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.reproductor = <HTMLAudioElement>document.getElementById("reproductor")
  }

  selectSong(event: any) {
    const type = event.target.files[0].type;
    if (type !== "audio/mpeg") {
      alert("Seleccione un archivo mp3");
      this.music.nativeElement.value = null;
      return;
    }
    this.nameSong = event.target.files[0].name;
    this.audioToBase64(event.target.files[0])
      .then((res: any) => {
        this.src = this.domSanitizer.bypassSecurityTrustUrl(res);
      });
    setTimeout(() => {
      this.play();
    }, 1000);
  }

  play() {
    this.reproductor.play();
  }

  stop() {
    this.reproductor.pause()
  }

  async audioToBase64(audioFile: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => resolve(e?.target?.result);
      reader.readAsDataURL(audioFile);
    });
  }

}
