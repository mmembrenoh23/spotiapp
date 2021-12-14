import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artists:any[]=[];
  loading:boolean;
  error:boolean;
  title_error:string;
  error_message:string;

  constructor(private spotify:SpotifyService) { }

  buscar(termino:string){
    this.loading=true;
    this.spotify.searchArtist(termino).subscribe((data:any)=>{
      this.artists = data;
      this.loading=false;
      this.error=false;
    },(error_service)=>{
      this.error=true;
      this.loading=false;
      this.title_error = error_service.error.error.message;
      this.error_message = error_service.message;
    });
  }

}
