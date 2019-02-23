import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {

  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
