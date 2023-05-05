import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, map} from "rxjs/operators";
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];
  isFetching = false;


  @ViewChild('postForm') postForm: NgForm;

  constructor(
    private http: HttpClient,
    private postService: PostsService,
  ) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .pipe(delay(1200))
      .subscribe(
        (posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        })
      );
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .pipe(delay(1200))
      .subscribe(
        (posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        })
      );
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
    setTimeout(() => {
      this.onFetchPosts();
    },300)
  }

  onClearPosts() {
    this.postService.deletePost()
      .subscribe(
        () => {
          this.loadedPosts = [];
        }
      );
  }

  private fetchPosts() {
    this.isFetching = true;
  }
}
