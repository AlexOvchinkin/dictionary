import { Component, OnInit } from '@angular/core';
import {AlgorithmsContainerService} from './algorithms-container.service';
import {Word} from "./types";


@Component({
  selector: 'app-algorithms-container',
  templateUrl: './algorithms-container.component.html',
  styleUrls: ['./algorithms-container.component.css'],
  providers: [AlgorithmsContainerService]
})
export class AlgorithmsContainerComponent implements OnInit {

  public testingWord: Word;
  public translates: Word[];

  constructor(private algorithmsContainerService: AlgorithmsContainerService) { }

  ngOnInit() {
    this.testingWord = {
      original: 'mouse',
      translate: 'мышь'
    }

    this.translates = [
      {
        original: 'rat',
        translate: 'крыса'
      },
      {
        original: 'mouse',
        translate: 'мышь'
      },
      {
        original: 'horse',
        translate: 'лошадь'
      },
      {
        original: 'cat',
        translate: 'кошка'
      },
      {
        original: 'dog',
        translate: 'собака'
      }
    ]
  }

}
