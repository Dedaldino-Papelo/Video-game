import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game, APIResponse } from 'src/app/interfaces/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public sort: string = ""
  public games: Game[] = []

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search'])
      } else {
        this.searchGames('metacrit')
      }
    }) 
  }

  searchGames(sort: string, search?: string):void {
    this.httpService
      .gameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results
    })
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id])
  }
}
