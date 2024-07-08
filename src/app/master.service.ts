import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public masterObject: any = {};
  public nodeUrl: any = "http://localhost:3000";
  public secretKey = "Ram@123";

  constructor(private http: HttpClient) {
    this.loadConnectorConfig();

  }

  // Encrypt data using AES
  encryptData(payload: any, secretKey: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();
  }

  // Decrypt data using AES
  decryptData(encryptedData: string,secretKey: string): any {
    console.log(encryptedData)
 let bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedData)
    //  return decryptedData
    return JSON.parse(decryptedData); // Parse JSON if the original data was an object
  }

  // Load configuration
  async loadConnectorConfig() {
    try {
      this.http.get('assets/connector.json').subscribe(this.observer);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Get API path from configuration
  getApiPath(keyParam: string) {``
    if (Object.keys(this.masterObject).length == 0) {
      this.loadConnectorConfig();
    }

    keyParam = keyParam.split('.').join("']['");
    keyParam = '[\'' + keyParam + '\']';
    return eval('this.masterObject' + keyParam);
  }

  // Observer for handling configuration loading
  public observer = {
    next: (value: any) => {
      this.masterObject = value;
    },
    error: (error: any) => {
      console.error('Error loading configuration:', error);
    },
    complete: () => {
    }
  };
 
  // API call method
  async postApiCall(urlkey: any, apiType: string, payloadData?: any) {
    const ServiceUrl = this.nodeUrl + urlkey;
    let resultData: any;
    // const token = localStorage.getItem('Token');

    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': "application/json",
    //   'token': token
    // });

    const params = { data: this.encryptData(payloadData, this.secretKey) };

    try {
      if (apiType === "post") {
        resultData = await firstValueFrom(this.http.post(ServiceUrl, params));
        resultData['data']= this.decryptData(resultData.data, this.secretKey);
      } else if (apiType === "get") {
        resultData = await firstValueFrom(this.http.get(ServiceUrl));
      }
      else {
        throw new Error(`Invalid API type: ${apiType}`);
      }
        return resultData// Decrypting the received data

    } catch (error:any) {
      console.error('Error during API call:', error);
      // throw error;
      return resultData = error['error'];
    }
  }
}
