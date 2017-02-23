import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { UserActions } from '../store/user/user.actions';
import { User } from '../store/user/user.model';

@Component({
  selector: 'my-dashboard',
  styles: [`#my-logout-button { background: #F44336 }`],
  template: `
    <header>
      <h3> Welcome to the Dashboard {{user.name}}!</h3>
    </header>
    <section>
      <form [formGroup]="form" (ngSubmit)="submitState()" autocomplete="off">
        <md-input formControlName="name" [placeholder]="nameLabel"></md-input><br>
        <button md-raised-button color="primary">Update store</button>
        <button md-raised-button color="accent" type="button"
        (click)="clearName()">Clear name</button>
      </form>
      <br><br>
        <button id="my-logout-button" md-raised-button color="accent"
        (click)="logout()">Logout</button>
    </section>  
  `
})

export class DashboardPage implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  form: FormGroup;
  nameLabel = 'Enter your name';
  user: User;
  user$: Observable<User>;
  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions,
  ) {
    this.form = fb.group({
      name: ''
    });
    this.user$ = this.store.select(state => state.user.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user; });
  }

  ngOnInit() {
    this.form.get('name').setValue(this.user.name);
  }

  clearName() {
    this.store.dispatch(this.userActions.editUser(
      Object.assign({}, this.user, { name: '' }
      )));

    this.form.get('name').setValue('');
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  submitState() {
    this.store.dispatch(this.userActions.editUser(
      Object.assign({}, this.user, { name: this.form.get('name').value }
      )));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
