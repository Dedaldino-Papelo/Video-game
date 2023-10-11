import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseAPI = environment.apiUrl
  private apiKey = 'ba96dde96dd34487999fd4bfb8d66128'

  constructor(private http: HttpClient) {}

  gameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let getGames = `${this.baseAPI}/games`
    let params = new HttpParams().set('ordering', ordering)

    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(getGames, {
      params: params
    })
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${this.baseAPI}/games/${id}?key=${this.apiKey}`);
    const gameTrailersRequest = this.http.get(`${this.baseAPI}/games/${id}?key=${this.apiKey}/movies`);
    const gameScreenshotsRequest = this.http.get(`${this.baseAPI}/games/${id}?key=${this.apiKey}/screenshots`);

    return forkJoin({
      gameInfoRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
        };
      })
    );
  }
}
