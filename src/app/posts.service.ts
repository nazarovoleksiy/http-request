import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Post } from "./post.model";
import {catchError, map} from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {

  error = new Subject<string>();

  constructor(
    private http: HttpClient,

  ) {}

    createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content}
      this.http
        .post<{ name: string }>(
          'https://angular-http-nazarov-default-rtdb.firebaseio.com/posts.json',
          postData
        ).subscribe(responseData => {
        console.log(responseData);
      }, error => {
          this.error.next(error.message)
      })

    }

    fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
      return this.http
        .get<{ [key: string]: Post }>('https://angular-http-nazarov-default-rtdb.firebaseio.com/posts.json',
          {
            headers: new HttpHeaders({
              'Custom-header': 'Hello',
              'Another-custom-header': 'Bye'
            }),
            params: searchParams
          }
        )
        .pipe(map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key });
            }
          }
          return postArray;
        }),
          catchError(errorRes => {
            return throwError(errorRes);
          }));
    }

    deletePost() {
      return  this.http.delete('https://angular-http-nazarov-default-rtdb.firebaseio.com/posts.json')
    }
}
