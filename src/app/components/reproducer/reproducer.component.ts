import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { song } from 'src/app/entities/song';
import { SongService } from 'src/app/services/song.service';
@Component({
  selector: 'app-reproducer',
  templateUrl: './reproducer.component.html',
  styleUrls: ['./reproducer.component.scss']
})
export class ReproducerComponent implements OnInit {
  @ViewChild("musicInput") music!: ElementRef;
  public src: any;
  public reproductor: any;
  public nameSong!: string;
  public dvd = "../../../assets/dvd.gif"
  public listSongs: song[] = [];
  constructor(
    private domSanitizer: DomSanitizer,
    private toast: ToastrService,
    private songSrv: SongService) { }

  ngOnInit(): void {
    this.reproductor = <HTMLAudioElement>document.getElementById("reproductor")
  }

  selectSong(event: any) {
    const type = event.target.files[0].type;
    if (type !== "audio/mpeg") {
      this.toast.error("Seleccione un archivo mp3","Error", {
        timeOut: 3000,
        positionClass: "toast-bottom-right"
      });
      this.music.nativeElement.value = null;
      return;
    }
    this.nameSong = event.target.files[0].name;
    this.audioToBase64(event.target.files[0])
      .then((res: any) => {
        this.src = this.domSanitizer.bypassSecurityTrustUrl(res);
        const songToAdd: song = {
          name: event.target.files[0].name,
          song: res
        }
        this.songSrv.addSong(songToAdd);
        this.listSongs = this.songSrv.getAllSongs();
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

  songSelected(event: any) {
    console.log(event);
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
