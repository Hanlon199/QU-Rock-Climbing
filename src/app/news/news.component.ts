import { Component, OnInit } from '@angular/core';
import { CommonNewsService } from '../admin/common.adminNewsService';
import { News } from '../includes/models/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private newsList: News[];
  private loading: boolean = true;
  constructor(private newsService: CommonNewsService) {}

  ngOnInit() {
    this.newsService.getNews().subscribe((res:any) => {
      let resParsed = JSON.parse(res._body);
      this.newsList = [];
      resParsed.data.map(e => {
        this.newsList.push(new News(e._id, e.name, e.description, e.link));
      });
      this.loading = false;
    })
  }

  onNavigate() {
    
  }
}
