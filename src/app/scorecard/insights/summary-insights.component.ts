import { Component, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, IAppState, Status, IStudyState, StudyActions } from '../../store';
import { Study, StudyOptions } from '../types';

@Component({
  selector: 'summary-insights',
  templateUrl: './summary-insights.component.html',
  styleUrls: ['./summary-insights.component.scss']
})
export class SummaryInsight implements OnDestroy {
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['study', 'insights']) insights$: Observable<string[]>;

  private subs: Subscription[] = [];
  private insights: string[] = [];

  constructor(private studyActions: StudyActions) {

    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.studyActions.fetchInsights(x.id);
      }
    }));
    this.subs.push(this.insights$.subscribe(x => this.insights = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}