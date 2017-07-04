import {Component, OnInit} from '@angular/core';
import {AlgorithmsContainerService} from './algorithms-container.service';
import {Algorithm} from '../../types';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'app-algorithms-container',
    templateUrl: './algorithms-container.component.html',
    styleUrls: ['./algorithms-container.component.css'],
    providers: [AlgorithmsContainerService]
})
export class AlgorithmsContainerComponent implements OnInit {

    public currentAlgorithm: Algorithm;
    public currentAlgorithmName: string;
    public hash: number = 0;
    public askDeactivate: boolean;

    constructor(public algorithmsContainerService: AlgorithmsContainerService, private router: Router) {
    }

    ngOnInit() {
        this.updateData();
        this.askDeactivate = false;

        // подпишемся на результаты тестов
        this.algorithmsContainerService.algorithmChanger$$.subscribe((answerWasWrong: boolean) => {
            this.algorithmsContainerService.change(answerWasWrong);
            this.updateData();
            this.hash++;
        });

        // подпишемся на результаты кликов по кнопкам всплывающего окна
        this.algorithmsContainerService.deactivateStream$$.subscribe( (result: boolean) => {
            this.algorithmsContainerService.allowDeactivate = result;
            this.askDeactivate = false;

            if (result) {
                this.router.navigate([this.algorithmsContainerService.deactivateURL]);
            }
        } );
    }

    public canDeactivate(url: string): boolean {
        this.askDeactivate = true;
        this.algorithmsContainerService.deactivateURL = url;
        return this.algorithmsContainerService.allowDeactivate;
    }

    // обработчик клика по кнопкам всплывающего окна
    public deactivate(result: boolean): void {
        this.algorithmsContainerService.deactivateStream$$.next(result);
    }

    private updateData(): void {
        this.currentAlgorithm = this.algorithmsContainerService.currentAlgorithm;
        this.currentAlgorithmName = this.algorithmsContainerService.currentAlgorithmName;
    }

}
