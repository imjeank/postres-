
import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../addpost-modal/addpost-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;
  isloading: boolean = false;
  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}

  ngOnInit(){
    console.log('Init Home');
    this.loadPosts();
    this.postService.postcreated.subscribe((newPost: any)=>{
      this.posts = (newPost);
    })
  }

  async addPost(){
    console.log('Add Post');
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps:{}
    });
    return await modal.present();
  }

  loadPosts(event?: any){
    console.log('Load Posts');
    this.isloading = true;

    this.postService.getPosts(this.page, this.limit).then(
      (data: any)=>{
        if (data.length > 0){
          this.posts = [...this.posts, ...data];
          this.page++;
        }else{
          this.hasMore = false;
        }
        this.isloading = false;
        if (event){
          event.target.complete();
        }
      },
      (error)=>{
        console.log(error);
        this.isloading = false;
        if (event){
          event.target.complete();
        }
      }
    )
  }
}