import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {WordObject, Algorithm, HOME_PAGE} from "./types";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Injectable()
export class AlgorithmsContainerService {

    public SELECTION: string = 'selection';
    public TRANSLATE: string = 'translate';
    public algorithmNames: string[];

    private wordArray: WordObject[]; // слово + массив со словами
    private algorithmsArray: Algorithm[]; // имя алгоритма + wordArray

    public currentAlgorithm: Algorithm;
    public currentAlgorithmName: string;

    public hash: number = 0;

    public algorithmChanger$$: Subject<boolean> = new Subject();

    // поток, в котором грузим очередную порцию слов с бэкенда
    public loadWords: Observable<WordObject[]> = Observable.create((observer) => {
        observer.next(this.loadWordArray());
    });


    // КОНСТРУКТОР
    constructor(private router: Router) {
        // заполним массив имен алгоритмов
        this.algorithmNames = [
            this.SELECTION,
            this.TRANSLATE
        ]

        // подпишемся на результат загрузки массива с бэкенда
        this.loadWords.subscribe((wordsArray: WordObject[]) => {
            this.wordArray = wordsArray;
            this.algorithmsArray = this.getAlgorithmsArray(this.wordArray);

            // установим текущий алгоритм
            if (this.algorithmsArray) {
                this.setNextAlgorithm();
            }
        });
    }

    private getAlgorithmsArray(array: WordObject[]): Algorithm[] {
        // создадим пустой массив
        let algorithms: Algorithm[] = [];

        // для каждого тестируемого объекта
        for (let wordObject of array) {

            // для каждого алгоритма
            for (let algorithmName of this.algorithmNames) {

                // создадим элемент в новом массиве
                algorithms.push({
                    name: algorithmName,
                    data: wordObject
                });
            }
        }

        // отсортируем по названиям алгоритмов
        algorithms.sort((a, b): number => {
            if (a.name > b.name) {
                return 1
            }
            ;
            if (a.name < b.name) {
                return -1
            }
            ;
            return 0;
        });

        return algorithms;
    }

    // меняет алгоритм
    public change(answerWasWrong: boolean): void {
        if (answerWasWrong) {
            this.algorithmsArray.push(this.currentAlgorithm);
        }

        this.setNextAlgorithm();
    }

    // делает переход к следующему алгоритму
    private setNextAlgorithm() {
        if (this.algorithmsArray.length > 0) {
            this.currentAlgorithm = this.algorithmsArray.shift();
            this.currentAlgorithmName = this.currentAlgorithm.name;
            this.hash++;
        } else {
            // этот пул тестов закончен
            // сохранить результаты на бэкенд и
            // переход на главную страницу
            this.router.navigate([HOME_PAGE]);
        }
    }

    // загружает массив с бэкенда
    private loadWordArray(): WordObject[] {

        return [
            {
                word: {
                    original: 'mouse',
                    translate: 'мышь'
                },
                translates: [
                    {
                        original: 'rat',
                        translate: 'крыса'
                    },
                    {
                        original: 'mouse',
                        translate: 'мышь'
                    },
                    {
                        original: 'horse',
                        translate: 'лошадь'
                    },
                    {
                        original: 'cat',
                        translate: 'кошка'
                    },
                    {
                        original: 'dog',
                        translate: 'собака'
                    }
                ]
            },
            {
                word: {
                    original: 'dog',
                    translate: 'собака'
                },
                translates: [
                    {
                        original: 'mouse',
                        translate: 'мышь'
                    },
                    {
                        original: 'rat',
                        translate: 'крыса'
                    },
                    {
                        original: 'horse',
                        translate: 'лошадь'
                    },
                    {
                        original: 'dog',
                        translate: 'собака'
                    },
                    {
                        original: 'cat',
                        translate: 'кошка'
                    }
                ]
            },
            {
                word: {
                    original: 'rat',
                    translate: 'крыса'
                },
                translates: [
                    {
                        original: 'rat',
                        translate: 'крыса'
                    },
                    {
                        original: 'cat',
                        translate: 'кошка'
                    },
                    {
                        original: 'dog',
                        translate: 'собака'
                    },
                    {
                        original: 'mouse',
                        translate: 'мышь'
                    },
                    {
                        original: 'horse',
                        translate: 'лошадь'
                    }
                ]
            },
            {
                word: {
                    original: 'horse',
                    translate: 'лошадь'
                },
                translates: [
                    {
                        original: 'rat',
                        translate: 'крыса'
                    },
                    {
                        original: 'mouse',
                        translate: 'мышь'
                    },
                    {
                        original: 'horse',
                        translate: 'лошадь'
                    },
                    {
                        original: 'cat',
                        translate: 'кошка'
                    },
                    {
                        original: 'dog',
                        translate: 'собака'
                    }
                ]
            },
            {
                word: {
                    original: 'cat',
                    translate: 'кошка'
                },
                translates: [
                    {
                        original: 'mouse',
                        translate: 'мышь'
                    },
                    {
                        original: 'rat',
                        translate: 'крыса'
                    },
                    {
                        original: 'horse',
                        translate: 'лошадь'
                    },
                    {
                        original: 'cat',
                        translate: 'кошка'
                    },
                    {
                        original: 'dog',
                        translate: 'собака'
                    }
                ]
            }
        ]
    }
}
