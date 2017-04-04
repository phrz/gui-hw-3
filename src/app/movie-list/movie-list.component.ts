import { Component } from '@angular/core';

export class Movie {
	constructor(public title: string, public year: number, public imagePath: string) {}
}

@Component({
  selector: 'movie-list',
  templateUrl: 'app/movie-list/movie-list.component.html',
  styleUrls: ['app/movie-list/movie-list.component.css']
})
export class MovieListComponent  {
	movies = [
		new Movie('Jaws', 2000, 'bleh')
	];
}
