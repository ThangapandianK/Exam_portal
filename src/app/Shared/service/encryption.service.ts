import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 

import { SECRET_KEY } from '../constant/constant';
@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  public secretKey = SECRET_KEY;

  constructor() {}

  // Function to encrypt a value
  encrypt(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    return encryptedData;
  }

  // Function to decrypt a value
  decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
