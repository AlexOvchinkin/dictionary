import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AlgorithmsContainerService {

    public algorithmChanger$$: Subject<boolean> = new Subject();

    constructor() {
    }

    public change(answerWasWrong: boolean): void {
        if (answerWasWrong) {
            console.log(`Answer was WRONG`)
        } else {
            console.log(`Answer was RIGHT`)
        }
    }
}
