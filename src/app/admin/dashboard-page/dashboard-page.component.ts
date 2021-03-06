import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Array<Post> = []
  pSub: Subscription
  dSub: Subscription
  search: '';

  constructor(
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe(posts => {
      console.log(posts)
      this.posts = posts
    })
  }
  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
