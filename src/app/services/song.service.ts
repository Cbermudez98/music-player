import { Injectable } from '@angular/core';
import { song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  public list: song[] = [];
  constructor() { }

  public addSong(data: song) {
    const find = this.list.find(x => x.name === data.name);
    if (!find) {
      this.list.push(data);
    }
  }

  public getAllSongs() {
    return this.list;
  }
}
