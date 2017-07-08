import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {CheckLetter, PickLetter, SOUND_PATH} from "../../../types";
import {SelectionService} from "./selection.service";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
  providers: [SelectionService]
})
export class SelectionComponent implements OnInit, OnChanges {

  @Input() word;
  @Input() algorithmChanger: Subject<boolean>;

  // случайное число - чтобы что-то изменялось в компоненте, если нужно
  // вызвать еще раз такой-же, иначе Ангуляр его не перерисовывает
  @Input() hash: number;


  public checkArray: CheckLetter[];
  public pickArray: PickLetter[];
  private audio: HTMLAudioElement;

  constructor(public selectionService: SelectionService) {
  }

  // обработчик выбора буквы
  public selectPickLetter(num: number): void {
    this.selectionService.checkPickLetter(num);
  }

  // обновляет массивы компонента из сервиса
  private updateData(): void {
    this.checkArray = this.selectionService.getCheckArray();
    this.pickArray = this.selectionService.getPickArray();
  }

  // обработчик кнопки прослушивания слова
  public replay(): void {
    this.playSound(this.word);
  }

  // проигрывает звуковой файл
  // имя файла должно соответствовать слову
  // работает только на серверах nginx/apache
  private playSound(soundName: string): void {
    this.audio.src = `${SOUND_PATH + soundName}.mp3`;
    this.audio.load();
    this.audio.play();
  }

  ngOnInit() {
    // подпишемся на событие окончания теста
    this.selectionService.algorithmEnd$$.subscribe((answerWasWrong: boolean) => {
      // сообщить контейнеру об результате теста
      this.algorithmChanger.next(answerWasWrong);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectionService.setNewWord(this.word);
    this.updateData();

    this.audio = new Audio();
    this.playSound(this.word);
  }

}
















