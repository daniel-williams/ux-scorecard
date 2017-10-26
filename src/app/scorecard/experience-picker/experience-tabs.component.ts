import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  animate,
  keyframes,
  state,
  style,
  trigger,
  transition,
} from '@angular/animations';

import { Experience, StudyOptions } from '../types';
import { IAppState, Status, UserActions } from '../../store';

@Component({
  selector: 'experience-tabs',
  templateUrl: './experience-tabs.component.html',
  styleUrls: ['./experience-tabs.component.scss'],
  animations: [
    trigger('state', [
      transition(`:enter`, [
        style({ opacity: 0.5}),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class ExperienceTabs {
  @select(['experiences', 'experienceList']) experienceList$: Observable<{[key: string]: Experience[]}>;
  @select(['user', 'selectedExperience']) selectedExperience$: Observable<Experience>;
  @select(['user', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  private subs: Subscription[] = [];

  private experiences: Experience[] = [];
  private selectedExperience: Experience;
  private selectedStudy: StudyOptions;

  constructor(
    private actions: UserActions,
    private ngRedux: NgRedux<IAppState>) {

    this.subs.push(this.experienceList$.subscribe(x => {
      if(x && this.selectedStudy) {
        this.experiences = x[this.selectedStudy.id]
          ? x[this.selectedStudy.id]
          : [];
      }
    }));
    this.subs.push(this.selectedExperience$.subscribe(x => this.selectedExperience = x));
    this.subs.push(this.selectedStudy$.subscribe(study => this.selectedStudy = study));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  selectExperience(experience: Experience) {
    this.actions.setSelectedExperience(experience);
  }
}
