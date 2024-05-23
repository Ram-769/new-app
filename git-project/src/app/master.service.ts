import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public masterObject: any = {};
  public nodeUrl:any="http://localhost:3000";
  private apiUrl = 'https://movies-api14.p.rapidapi.com/movies';
  public observer = {
    next: (value:any) => {
      // Process the received value (e.g., update UI, log data)
      console.log('this.masterObject[value.key] = value;:', this.masterObject[value.key] = value);
      this.masterObject= value;
      console.log( this.masterObject, this.masterObject)
      
    },
    error: (error:any) => {
      // Handle the error gracefully (e.g., display error message)
      console.error('Error:', error);
    },
    complete: () => {
      // Perform any actions upon stream completion (optional)
      console.log('Observable completed');
    }
  };
  constructor(private http: HttpClient, private _rout: Router) {
    this.loadConnectorConfig();
  }
  //Loading connocterJson MasterObject
  async loadConnectorConfig() {   
    try {
       this.http.get('assets/connector.json').subscribe(this.observer);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  //getApi Path by this function we get
  getApiPath(keyParam: string) {
    // return this.masterObject?.apiUrl || '';
    if (Object.keys(this.masterObject).length == 0) {
     this.loadConnectorConfig();
    }

    keyParam = keyParam.split('.').join("']['");
    keyParam = '[\'' + keyParam + '\']';
    return eval('this.masterObject' + keyParam);
  }
  //api call
  async postApiCall(urlkey: any,apiType:any, payloadData?:any ) {
    let ServiceUrl = this.nodeUrl+urlkey;
    let resultData: any;
    let token:any=localStorage.getItem('Token');
 
    var httpHeaders = new HttpHeaders({
      'conteentType':"application",
      'token': token
    });
    if(apiType == "post"){
   
   // { headers: httpHeaders }
    try {
        resultData = await firstValueFrom(this.http.post(ServiceUrl, payloadData));
       
   return  resultData;
    } catch (error) {
      console.error('Error:', error);
    }
 
    } 
    if(apiType == "get"){
      try {
          resultData = await firstValueFrom(this.http.post(ServiceUrl, payloadData,{ headers: httpHeaders }));
         
     return  resultData;
      } catch (error) {
        console.error('Error:', error);
      }
   
    }
  
}
}

