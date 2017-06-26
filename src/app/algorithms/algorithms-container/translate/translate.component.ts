import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from "./translate.service";
import {WordExt} from "../types";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
  providers: [TranslateService]
})
export class TranslateComponent implements OnInit {

  @Input() testingWord: WordExt;
  @Input() translates: WordExt[];

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.setNewWord(this.testingWord, this.translates);
  }

  // обработка клика по слову
  public checkWord(num: number): void {
    if (this.translateService.check(num)) {
      // сообщить наверх об окончании теста
    }
  }
}
