import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent{

  loading:boolean;
  artist:any;
  topTracks:any[]=[];
  error:boolean;
   title_error:string;
  error_message:string;

  constructor( private route: ActivatedRoute, private spotify: SpotifyService) {
    this.loading=true;
    this.route.params.subscribe(
      params=>{
        this.getArtist(params['id']);
        this.getTopTracking(params['id']);
      }
    )
   }


   getArtist(id:string){
     this.spotify.getArtist(id).subscribe(data=>{
       this.artist = data;
       console.log(this.artist);
       this.loading=false;
       this.error=false;
      },(error_service)=>{
      this.error=true;
      this.loading=false;
      this.title_error = error_service.error.error.message;
      this.error_message = error_service.message;
    });
   }

   getTopTracking(id:string){
     this.spotify.getTopTracks(id).subscribe(data=>{
        this.topTracks = data;
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
