"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Movie = (function () {
    function Movie(title, year, imagePath) {
        this.title = title;
        this.year = year;
        this.imagePath = imagePath;
    }
    return Movie;
}());
exports.Movie = Movie;
var MovieListComponent = (function () {
    function MovieListComponent() {
        this.movies = [
            new Movie('Jaws', 2000, 'bleh')
        ];
    }
    return MovieListComponent;
}());
MovieListComponent = __decorate([
    core_1.Component({
        selector: 'movie-list',
        templateUrl: 'app/movie-list/movie-list.component.html',
        styleUrls: ['app/movie-list/movie-list.component.css']
    })
], MovieListComponent);
exports.MovieListComponent = MovieListComponent;
//# sourceMappingURL=movie-list.component.js.map