import {Component, Input, OnInit} from '@angular/core';
import {SelectionService, CheckLetter, PickLetter, UpdateObject} from "./selection.service";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
  providers: [SelectionService]
})
export class SelectionComponent implements OnInit {

  @Input() word;

  public checkArray: CheckLetter[];
  public pickArray: PickLetter[];

  constructor(public selectionService: SelectionService) { }

  public selectPickLetter(num: number): void {
    this.selectionService.checkPickLetter(num);
  }

  ngOnInit() {
    this.selectionService.setNewWord(this.word);

    this.checkArray = this.selectionService.getCheckArray();
    this.pickArray = this.selectionService.getPickArray();

    // подпишемся на обновления массивов
    this.selectionService.updateStream$$.subscribe( (updateObject: UpdateObject) => {
      this.checkArray[updateObject.position] = updateObject.checkLetter;
      this.pickArray[updateObject.position] = updateObject.pickLetter;
    } );
  }

}
