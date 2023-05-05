import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, map} from "rxjs/operators";
import {Post} from "./post.model";
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(
    private http: HttpClient,
    private postService: PostsService,
  ) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .pipe(delay(2000))
      .subscribe(
        (posts => {
          this.loadedPosts = posts;
          this.isFetching = false;
        })
      );
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {

    this.postService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
  }
}
