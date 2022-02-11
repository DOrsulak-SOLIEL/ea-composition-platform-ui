/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
// import { AppLayoutComponent } from '../app-layout/app-layout.component';

@Component({
    selector: 'app-under-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {
    // @Input() appLayout: AppLayoutComponent;

    constructor( // private appLayout: AppLayoutComponent
    ) { }

    ngOnInit(): void {
    //    this.appLayout.setCurrentLocation('/home/news');
    }
}
