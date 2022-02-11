import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-alert-fouo',
    templateUrl: 'alert-fouo.component.html',
    styleUrls: ['alert-fouo.component.scss']
})
export class AlertFOUOComponent implements OnInit {
    @Input() position = '';

    constructor() {}

    ngOnInit(): void {
        if (this.position !== 'bottom') {
            this.position = '';
        }
    }
}
