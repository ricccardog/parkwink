import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {

  url = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) : Observable<any>{
    
    return this.http.get(this.url+rstate.url)
  }
}
