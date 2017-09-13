import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  EllipsisPipe,
  ExpVideo,
  FeedbackCard,
  Header,
  HeaderNav,
  InfiniteScrollDirective,
  PastStudies,
  ScoreBreakdown,
  ScoreMeter,
  UxScorecardService,
  VideoModalModule,
} from './shared';

import { ScorecardRoutingModule } from './scorecard-routing.module';
import { ScorecardComponent } from './scorecard.component';


@NgModule({
  imports: [
    CommonModule,
    ScorecardRoutingModule,
    VideoModalModule,
  ],
  declarations: [
    EllipsisPipe,
    ExpVideo,
    FeedbackCard,
    Header,
    HeaderNav,
    InfiniteScrollDirective,
    PastStudies,
    ScoreBreakdown,
    ScoreMeter,
    ScorecardComponent
  ],
  providers: [
    UxScorecardService,
  ],
})
export class ScorecardModule {}
