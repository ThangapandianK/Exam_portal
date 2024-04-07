import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommanService } from '../Shared/service/comman.service';

@Component({
  selector: 'app-result-key-count',
  templateUrl: './result-key-count.component.html',
  styleUrls: ['./result-key-count.component.scss']
})
export class ResultKeyCountComponent implements OnInit {
  keyboardData: any = {}; // Initialize as an empty object
  candidateId: any;

  constructor(private route: ActivatedRoute, private commonService: CommanService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.candidateId = params.get('id');
      this.keyBoard(this.candidateId);
    });
  }

   keyBoard(candidateId: any) {
   this.commonService.getKeyBoard(candidateId).subscribe((data:any)=>{
    this.keyboardData=JSON.parse(data.data[0].keyboard);
   })
  }
}
