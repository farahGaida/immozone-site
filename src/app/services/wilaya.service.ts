import { Injectable } from '@angular/core';
import { WILAYAS } from '../shared/wilayaData';

@Injectable({
  providedIn: 'root'
})
export class WilayaService {

  getForSale() {
    return WILAYAS.map(w => ({
      ...w,
      mode: 'sale'
    }));
  }

  getForRent() {
    return WILAYAS.map(w => ({
      ...w,
      mode: 'rent'
    }));
  }
}
