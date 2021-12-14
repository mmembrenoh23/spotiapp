//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent  {

  /*paises:any[]=[];
  constructor(private http: HttpClient) {

    //console.log(this.http.get('https://restcountries.eu/rest/v2/lang/es'));
    this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (data:any)=>{
      this.paises = data;
    });

  }*/

  newReleases:any[]=[];
  loading:boolean;
  error:boolean;
  error_message:string;
  title_error:string;

  constructor(private spotify:SpotifyService){
    this.loading=true;
    this.error=false;

   this.spotify.getNewReleases().subscribe((data:any)=>{
      this.newReleases = data;
      this.loading=false;
    },(error_service)=>{
      this.error=true;
      this.loading=false;
      this.title_error = error_service.error.error.message;
      this.error_message = error_service.message;
      console.log(error_service)
    });
  }


}
