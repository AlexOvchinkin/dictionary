import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {WordObject, Algorithm, HOME_PAGE, ENTER_PAGE} from "../../types";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AlgorithmsContainerService {

  public SELECTION: string = 'selection';
  public TRANSLATE: string = 'translate';
  public algorithmNames: string[];

  public allowDeactivate: boolean;
  public deactivateURL: string = '';
  public deactivateStream$$: Subject<boolean> = new Subject();

  private wordArray: WordObject[]; // слово + массив со словами
  private algorithmsArray: Algorithm[]; // имя алгоритма + wordArray

  public currentAlgorithm: Algorithm;
  public currentAlgorithmName: string;

  public hash: number = 0;

  public algorithmChanger$$: Subject<boolean> = new Subject();
  public showComponent$$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // поток, в котором грузим очередную порцию слов с бэкенда
  public loadWords: Observable<WordObject[]> = Observable.create((observer) => {
    // имитация задержки
    setTimeout(() => {
      observer.next(this.loadWordArray());
    }, 3000);
  });


  // КОНСТРУКТОР
  constructor(private router: Router) {
    this.allowDeactivate = false;

    // заполним массив имен алгоритмов
    this.algorithmNames = [
      this.TRANSLATE,
      this.SELECTION
    ];

    // подпишемся на результат загрузки массива с бэкенда
    this.loadWords.subscribe((wordsArray: WordObject[]) => {
      this.wordArray = wordsArray;
      this.algorithmsArray = this.getAlgorithmsArray(this.wordArray);

      // установим текущий алгоритм
      if (this.algorithmsArray) {
        this.setNextAlgorithm();
      }

      this.showComponent$$.next(true);
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

      if (a.name < b.name) {
        return -1
      }

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
      this.allowDeactivate = true;
      this.router.navigate([ENTER_PAGE]);
    }
  }

  // загружает массив с бэкенда
  private loadWordArray(): WordObject[] {

    return [
      {
        word: {
          original: 'bird',
          translate: 'птица'
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
            original: 'bird',
            translate: 'птица'
          },
          {
            original: 'dog',
            translate: 'собака'
          }
        ]
      },
      {
        word: {
          original: 'car',
          translate: 'машина'
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
            original: 'car',
            translate: 'машина'
          }
        ]
      },
      {
        word: {
          original: 'welcome',
          translate: 'добро пожаловать'
        },
        translates: [
          {
            original: 'rat',
            translate: 'крыса'
          },
          {
            original: 'welcome',
            translate: 'добро пожаловать'
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
          original: 'imagination',
          translate: 'воображение'
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
            original: 'imagination',
            translate: 'воображение'
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
