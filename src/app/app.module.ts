import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
    NgbAccordionModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CachingInterceptor, HttpCache, LocalHttpCache, Settings } from 'helgoland-toolbox';

import { AppComponent } from './app.component';
import { LocalSelectorImplComponent } from './components/local-selector/local-selector.component';
import { ProfilesModule } from './profiles/profiles.module';
import { SettingsService } from './services/settings.service';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { TrajectoriesModule } from './trajectories/trajectories.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LocalSelectorImplComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TimeseriesModule,
    TrajectoriesModule,
    ProfilesModule,
    HttpClientModule,
    NgbTabsetModule.forRoot(),
    NgbAccordionModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot()
  ],
  providers: [
    {
      provide: Settings,
      useClass: SettingsService
    },
    {
      provide: HttpCache,
      useClass: LocalHttpCache
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }