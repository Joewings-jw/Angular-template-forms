import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './userSettings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get_subscription_types():Observable<string[]>{
    return of(['Monthly', 'Annual', 'Lifetime']);

  }

  post_user_settingsForm(user_settings: UserSettings):Observable<any>{
   return this.http.post('https://putsreq.hiveeyes.org/CCORORIgRrISR98TCx4N',user_settings)
  }
}
