import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import {
    HelgolandControlModule,
    HelgolandD3GraphModule,
    HelgolandMapViewModule,
    HelgolandPermalinkModule,
    HelgolandSelectorModule,
} from 'helgoland-toolbox';

import { TrajectoriesNavigationComponent } from './navigation/navigation.component';
import { TrajectoriesSelectionComponent } from './selection/selection.component';
import { TrajectoriesConditionalRouter } from './services/trajectories-router.service';
import { TrajectoriesService } from './services/trajectories.service';
import { TrajectoriesViewPermalink } from './view/view-permalink';
import { TrajectoriesViewComponent } from './view/view.component';

const trajectoriesRoutes: Routes = [
  {
    path: 'trajectories',
    component: TrajectoriesNavigationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: TrajectoriesViewComponent
      },
      {
        path: 'selection',
        component: TrajectoriesSelectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HelgolandPermalinkModule,
    HelgolandSelectorModule,
    HelgolandControlModule,
    HelgolandMapViewModule,
    HelgolandD3GraphModule,
    RouterModule.forRoot(
      trajectoriesRoutes,
      { enableTracing: false }
    ),
    NgbTabsetModule
  ],
  declarations: [
    TrajectoriesViewComponent,
    TrajectoriesSelectionComponent,
    TrajectoriesNavigationComponent
  ],
  providers: [
    TrajectoriesService,
    TrajectoriesConditionalRouter,
    TrajectoriesViewPermalink
  ]
})
export class TrajectoriesModule { }