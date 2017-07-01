import { Injectable } from '@angular/core';
import {LearningData} from "../types";

@Injectable()
export class EnterService {

  private _learningWordsCount: number;
  private _trainingWordsCount: number;

  constructor() {
    let learningData: LearningData = this.getLearningDataCount();
    this.learningWordsCount = learningData.learning;
    this.trainingWordsCount = learningData.training;
  }

  private getLearningDataCount(): LearningData {
    // пока заглушка
    return {
      learning: 18,
      training: 67
    }
  }

  get learningWordsCount(): number {
    return this._learningWordsCount;
  }

  set learningWordsCount(count: number) {
    this._learningWordsCount = count;
  }

  get trainingWordsCount(): number {
    return this._trainingWordsCount;
  }

  set trainingWordsCount(count: number) {
    this._trainingWordsCount = count;
  }
}
