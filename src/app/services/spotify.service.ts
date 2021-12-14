import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  query="https://api.spotify.com/v1/";

  config: Tokens;

  constructor(private client: HttpClient) {

     this.getSpotifyToken();
  }
  private getQuery(query:string){
    console.log(this.config)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAWEVX59IOPvN9P1orviG4QAv-3AxaZedNjXWxUhxEIo6DI9tJ2cM3pgVSNzqAM4sNT5SMScOkS-UbUf5c'//this.config.token_type+" "+this.config.access_token
    });

    return this.client.get(`https://api.spotify.com/v1/${query}`,{headers});
  }

  private getSpotifyToken(){
    this.client.get("http://127.0.0.1:8000/api/spotify/client_id/client_secret")
    .subscribe((data:any)=>{
      this.access_token= data.access_token;
      this.expires_in = data.expires_in;
      this.token_type = data.token_type;
     },(error_service)=>{
            error_service.error.error.message;
            error_service.message;
            this.getSpotifyToken();
     });
  }

  getNewReleases(){

    return  this.getQuery("browse/new-releases?limit=20")
          .pipe(map(data=>data['albums'].items));
  }

  searchArtist(term:string){
     return  this.getQuery(`search/?q=${term}&type=artist`)
            .pipe(map(data=> data['artists'].items));
  }

  getArtist(id:string){

    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map(data=>data['tracks']));
  }
}

export interface Tokens {
  access_token:string,
  expires_in:string,
  token_type:string
}
