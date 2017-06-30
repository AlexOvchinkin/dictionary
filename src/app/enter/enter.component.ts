import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TRAINING_PAGE} from "../algorithms/algorithms-container/types";

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(private router: Router) { }

  public goTraining() {
    this.router.navigate([TRAINING_PAGE]);
  }

  ngOnInit() {
  }

}
