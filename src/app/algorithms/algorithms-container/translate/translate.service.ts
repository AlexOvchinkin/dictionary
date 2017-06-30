import {Injectable} from '@angular/core';
import {WordExt} from "../../../types";


@Injectable()
export class TranslateService {

    private testingWord: WordExt;
    private translates: WordExt[];
    private answerWasWrong: boolean;

    constructor() { }

    public getAnswerStatus() {
        return this.answerWasWrong;
    }

    // с этой функции начинается новый тест
    public setNewWord(word: WordExt, translates: WordExt[]): void {
        this.testingWord = word;
        this.translates = translates;
        this.answerWasWrong = false;

        this.translates.forEach( (item) => {
            item.isRight = false;
            item.isWrong = false;
        } );
    }

    // проверка - правильно ли указано проверяемое слово
    public check(num: number): boolean {
        if (this.translates[num].original == this.testingWord.original) {
            this.setRightAnswer(num);
            return true;
        }

        this.setWrongAnswer(num);
        return false;
    }

    // правильный ответ
    private setRightAnswer(num: number): void {
        this.translates[num].isRight = true;
    }

    // неправильный ответ
    private setWrongAnswer(num: number): void {
        this.translates[num].isWrong = true;

        // зафиксируем, что был неправильный ответ
        this.answerWasWrong = true;

        setTimeout(((num: number) => {
            return () => {
                this.translates[num].isWrong = false;
            }
        })(num), 500);
    }

}
