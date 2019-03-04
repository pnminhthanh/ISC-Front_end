import { Component, OnInit, ViewChild } from '@angular/core';
import { Classroom, ClassroomService} from 'src/app/services/classroom.service';
import { ModalDirective } from 'ngx-bootstrap';
import { userInfo } from 'os';
import { stringify } from 'querystring';
import { load } from '@angular/core/src/render3';
import { LearnResult, LearnresultService } from 'src/app/services/learnresult.service';
@Component({
  selector: 'app-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: ['./learning-result.component.css']
})
export class LearningResultComponent implements OnInit {
  learnResults : LearnResult[];
  learnResult: LearnResult = {} as LearnResult;
  constructor(private learnResultService : LearnresultService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.learnResultService.getall().subscribe(result => {
       this.learnResults = result.data;
    });
  }

}
