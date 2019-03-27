import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: any;

  constructor() { 
    this.news = [
      {'title': 'article 1', 'info': 'he climbed whaaaat!', 'link': ''},
      {'title': 'article 2', 'info': 'Ryan sends his first v9!', 'link': ''},
      {'title': 'article 3', 'info': 'Kyle still cant climb a v0...', 'link': ''},
    ];
  }

  ngOnInit() {
  }

}
