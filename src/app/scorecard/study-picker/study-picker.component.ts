import { Component, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, Status, StudyActions } from '../../store';
import { Study, StudyOptions } from '../types';


@Component({
  selector: 'study-picker',
  templateUrl: './study-picker.component.html',
  styleUrls: ['./study-picker.component.scss']
})
export class StudyPicker implements OnDestroy {
  @select(['study', 'studyList']) studyList$: Observable<Study[]>;
  @select(['study', 'studyListStatus']) studyListStatus$: Observable<Status>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  private showPanel: boolean = false;
  private studyList: Study[] = [];
  private selectedStudy: StudyOptions;
  private subs: Subscription[] = [];

  constructor(
    private browserActions: BrowserActions,
    private studyActions: StudyActions) {

    this.subs.push(this.studyList$.subscribe(x => this.studyList = x));
    this.subs.push(this.selectedStudy$.subscribe(study => this.selectedStudy = study));
    this.subs.push(this.studyListStatus$.subscribe(x => {
      if(x === Status.notFetched) {
        this.studyActions.fetchStudyOptions();
      }
    }));
  }

  togglePanel(evt: any) {
    this.showPanel = !this.showPanel;
  }

  openPanel(evt: any) {
    this.showPanel = true;
  }

  closePanel(evt: any) {
    this.showPanel = false;
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
