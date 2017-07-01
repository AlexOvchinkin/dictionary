import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TRAINING_PAGE} from "../types";
import {EnterService} from "./enter.service";

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css'],
  providers: [EnterService]
})
export class EnterComponent implements OnInit {

  public learningWordsCount: number;
  public trainingWordsCount: number;

  constructor(private router: Router, private enterService: EnterService) { }

  public goTraining() {
    this.router.navigate([TRAINING_PAGE]);
  }

  ngOnInit() {
    this.learningWordsCount = this.enterService.learningWordsCount;
    this.trainingWordsCount = this.enterService.trainingWordsCount;
  }

}
