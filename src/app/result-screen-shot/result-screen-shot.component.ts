import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommanService } from '../Shared/service/comman.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result-screen-shot',
  templateUrl: './result-screen-shot.component.html',
  styleUrls: ['./result-screen-shot.component.scss']
})
export class ResultScreenShotComponent implements OnInit {
  candidateId:any;
  image: any;
  images: any;
  public imgURL = environment.IMG_URL

  constructor( private route: ActivatedRoute,private commonService: CommanService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.candidateId = params.get('id')
    })
    this.screenShot(this.candidateId);
  }

  screenShot(candidateId:any){
    this.commonService.getscreenShot(candidateId).subscribe((data: any) => {
      this.image=data;
      this.images = this.image.image
    });
  }

}
