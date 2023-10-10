import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/interfaces/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameId: string = ""
  game!: Game
  gameRating = 0

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService
    ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
    this.gameId = params['id']
    this.gameDetails(this.gameId)
    })
  }

  gameDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp

     setTimeout(() => {
      this.gameRating = this.game.metacritic;
     }, 1000);
    })
  } 

  getColor(value: number): string {
    return (value > 75) ? '#5ee432'
      : (value > 50) ? '#fffa50'
      : (value > 30) ? '#f7aa38'
      : '#ef4655'
  }

}
