import { Component } from '@angular/core';
import { NewService } from 'src/app/service/new.service';
import { CommonModule } from '@angular/common';  
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist = [];
  constructor(public server: NewService) {}

  ngOnInit(): void {
    const options = {
      documentName: 'watchlist',
      params: {}
    }
    const Promise = this.server.getData(options);
    Promise.then((result)=>{
      this.watchlist = result.length == 0 ? [[]] : result;
    }) .catch((err) => {
      throw err;
    });
  }

  onButtonClick(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.delWatchlist(id);
  }  

  delWatchlist(_id): void {
    const options = {
      documentName: 'watchlist',
      params:{_id:_id}
    }
    
    const savePromise = this.server.del(options);
    savePromise.
      then((results) => {
        if(results == 'ok'){
          window.location.reload();
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}