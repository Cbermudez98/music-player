import { song } from './../../entities/song';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})
export class ListSongsComponent implements OnInit {
  public listSongs: song[] = [];
  @Output() songSelected: EventEmitter<any> = new EventEmitter();
  constructor(private songSrv: SongService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    setInterval(() => {
      this.listSongs = this.songSrv.getAllSongs();
    }, 1000);
  }

  public selectSong(event: any) {
    this.songSelected.emit(event);
  }

}
