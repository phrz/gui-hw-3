import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MovieListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
