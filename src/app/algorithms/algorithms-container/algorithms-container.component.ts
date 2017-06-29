import {Component, OnInit} from '@angular/core';
import {AlgorithmsContainerService} from './algorithms-container.service';
import {Algorithm} from './types';

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

    constructor(public algorithmsContainerService: AlgorithmsContainerService) {
    }

    ngOnInit() {
        this.updateData();

        // подпишемся на результаты тестов
        this.algorithmsContainerService.algorithmChanger$$.subscribe((answerWasWrong: boolean) => {
            this.algorithmsContainerService.change(answerWasWrong);
            this.updateData();
            this.hash++;
        });
    }

    private updateData(): void {
        this.currentAlgorithm = this.algorithmsContainerService.currentAlgorithm;
        this.currentAlgorithmName = this.algorithmsContainerService.currentAlgorithmName;
    }

}
