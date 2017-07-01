import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

export type CheckLetter = {
    letter: string,
    isShown: boolean,
    isEmpty: boolean
}

export type PickLetter = {
    letter: string,
    isShown: boolean,
    isWrong: boolean
}

export type UpdateObject = {
    position: number,
    checkLetter: CheckLetter,
    pickLetter: PickLetter
}

@Injectable()
export class SelectionService {

    private currentLetter: number;

    private checkArray: CheckLetter[];
    private pickArray: PickLetter[];
    private answerWasWrong: boolean;

    public algorithmEnd$$: Subject<boolean> = new Subject();
    public updateStream$$: Subject<any> = new Subject();

    constructor() { }

    public getCheckArray(): CheckLetter[] {
        return this.checkArray;
    }

    public getPickArray(): PickLetter[] {
        return this.pickArray;
    }

    // запускает процесс установки нового слова
    public setNewWord(word: string): void {
        let lettersArray: string[] = word.split('');
        this.checkArray = this.getCheckLetters(lettersArray);
        this.pickArray = this.getPickLetters(lettersArray);

        this.currentLetter = 0;
        this.answerWasWrong = false;
    }

    // получает массив объектов CheckLetter из массива букв
    private getCheckLetters(lettersArray: string[]): CheckLetter[] {
        let array: CheckLetter[] = [];

        for (let letter of lettersArray) {
            array.push({
                letter: letter,
                isShown: false,
                isEmpty: letter.trim() ? false : true
            });
        }

        return array;
    }

    // получает массив объектов PickLetter из массива букв
    private getPickLetters(lettersArray: string[]): PickLetter[] {
        let array: PickLetter[] = [];

        for (let letter of lettersArray) {
            // пробелы не пишем
            if (letter.trim()) {
                array.push({
                    letter: letter,
                    isShown: true,
                    isWrong: false
                });
            }
        }

        return this.getRandomArray(array);
    }

    // перемешивает элементы массива
    private getRandomArray(array: PickLetter[]): PickLetter[] {
        let newArray: PickLetter[] = [];
        let min: number = 0;

        while (array.length > 0) {
            let max: number = array.length;
            let letter: PickLetter = array.splice(this.getRandomInt(min, max), 1)[0];
            newArray.push(letter);
        }

        return newArray;
    }

    // возвращает случайное число
    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // проверка правильности выбранной буквы буквы
    public checkPickLetter(num: number): void {
        // если текущая буква - пробел, то пропустим ее
        if (!this.checkArray[this.currentLetter].letter.trim()) {
            this.currentLetter++;
        }

        if (this.pickArray[num].letter == this.checkArray[this.currentLetter].letter) {
            // если правильно
            this.setRightAnswer(num);
            this.currentLetter++;
        } else {
            // если НЕ правильно
            this.setWrongAnswer(num);
        }

        // конец теста
        if (this.currentLetter == this.checkArray.length) {
            // сообщение о конце теста
            this.algorithmEnd$$.next(this.answerWasWrong);
        }
    }

    // действует при правильном ответе
    private setRightAnswer(num: number): void {
        // проверяемую букву покажем
        this.checkArray[this.currentLetter].isShown = true;

        // нажатую скроем
        this.pickArray[num].isShown = false;
    }

    // действует при НЕправильном ответе
    private setWrongAnswer(num: number): void {
        this.pickArray[num].isWrong = true;
        this.answerWasWrong = true;

        setTimeout(((num: number) => {
            return () => {
                this.pickArray[num].isWrong = false;
            }
        })(num), 500);
    }
}



























