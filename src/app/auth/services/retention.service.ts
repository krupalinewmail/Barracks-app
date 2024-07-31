import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RetentionService {

  constructor() { }


  setItem(name: string, value: string) {
    localStorage.setItem(name, value)
  }

  getItem(name: string) {
    return localStorage.getItem(name);
  }
  
}
