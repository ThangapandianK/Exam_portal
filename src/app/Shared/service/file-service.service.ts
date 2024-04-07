import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor() { }

  createBlobImageFileAndSave(base64ImageUrl: string, ext: string = 'jpeg'): void {
    this.dataURItoBlob(base64ImageUrl, ext).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = this.generateName(ext);
      FileSaver.saveAs(imageBlob, imageName);
    });
  }
  
  
  dataURItoBlob(dataURI: string, ext: string): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: `image/${ext}` });
      observer.next(blob);
      observer.complete();
    });
  }
  
  
  generateName(ext: string): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    return date + "." + text + "." + ext;
  }
}
