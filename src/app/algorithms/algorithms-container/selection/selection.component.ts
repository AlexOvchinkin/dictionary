import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {CheckLetter, PickLetter} from "../../../types";
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

  constructor(public selectionService: SelectionService) {
  }

  public selectPickLetter(num: number): void {
    this.selectionService.checkPickLetter(num);
    this.updateData();
  }

  ngOnInit() {
    this.selectionService.algorithmEnd$$.subscribe((answerWasWrong: boolean) => {
      // сообщить контейнеру об результате теста
      this.algorithmChanger.next(answerWasWrong);
    });
  }

  private updateData(): void {
    this.checkArray = this.selectionService.getCheckArray();
    this.pickArray = this.selectionService.getPickArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectionService.setNewWord(this.word);
    this.updateData();
  }

}
















