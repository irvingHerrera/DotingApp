import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AlertifyService } from 'src/app/service/AlertifyService';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    console.log('this.user.photos', this.getImages());
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for(const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }

    return imageUrls;

  }

  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id'])
    .subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
