import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  async GetCoordsFromAddr(addr: string): Promise<any>{
    let res: any = await this.http.get(addr, {responseType: 'text'}).toPromise();
    res = JSON.parse(res);
    let lat = res[0].lat;
    let lon = res[0].lon;
    return {lat, lon};
  }
  async ParseCoords(res: any){
  }
}
