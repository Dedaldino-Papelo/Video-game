import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseAPI = environment.apiUrl

  constructor(private http: HttpClient) {}

  gameList(ordering: string, search?: string): Observable<APIResponse<Game>>{
    let getGames = `${this.baseAPI}/games`
    let params = new HttpParams().set('ordering', ordering)

    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(getGames, {
      params: params
    })
  }
}
