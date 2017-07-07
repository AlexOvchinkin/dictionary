import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TranslateService} from "./translate.service";
import {Subject} from "rxjs/Subject";
import {SOUND_PATH} from "../../../types";

// поместил тип сюда, т.к. постоянно
// Warning export type not found
type WordExt = {
  original: string,
  translate: string,
  isWrong?: boolean,
  isRight?: boolean
}

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
  providers: [TranslateService]
})
export class TranslateComponent implements OnInit, OnChanges {

  @Input() testingWord: WordExt;
  @Input() translates: WordExt[];
  @Input() algorithmChanger: Subject<boolean>;

  // случайное число - чтобы что-то изменялось в компоненте, если нужно
  // вызвать еще раз такой-же, иначе Ангуляр его не перерисовывает
  @Input() hash: number;

  private audio: HTMLAudioElement;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.translateService.setNewWord(this.testingWord, this.translates);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.translateService.setNewWord(this.testingWord, this.translates);

    this.audio = new Audio();
    this.playSound(this.testingWord.original);
  }

  // обработка клика по слову
  public checkWord(num: number): void {
    if (this.translateService.check(num)) {
      // сообщить контейнеру об окончании теста
      this.algorithmChanger.next(this.translateService.getAnswerStatus());
    }
  }

  public replay(): void {
    this.playSound(this.testingWord.original);
  }

  private playSound(soundName: string): void {
    this.audio.src = `${SOUND_PATH + soundName}.mp3`;
    this.audio.load();
    this.audio.play();
  }
}
