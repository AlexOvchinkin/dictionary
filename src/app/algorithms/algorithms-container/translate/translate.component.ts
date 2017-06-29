import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TranslateService} from "./translate.service";
import {Subject} from "rxjs/Subject";
import {WordExt} from "../types";

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

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        this.translateService.setNewWord(this.testingWord, this.translates);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.translateService.setNewWord(this.testingWord, this.translates);
    }

    // обработка клика по слову
    public checkWord(num: number): void {
        if (this.translateService.check(num)) {
            // сообщить контейнеру об окончании теста
            this.algorithmChanger.next(this.translateService.getAnswerStatus());
        }
    }
}
