import { Component, ViewChild } from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';
import { OnTabViewWillEnter } from './on-tabs-view-will-enter';
import { Router } from '@angular/router';
import { TabsService } from '../services/tabs.service';
import { TelemetryGeneratorService } from '../services/telemetry/telemetry.generator.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnTabViewWillEnter{
  subscription: any;
  @ViewChild('tabRef', { static: false }) tabRef!: IonTabs;
  constructor(private platform: Platform,
    private router: Router,
    private tabService: TabsService,
    private telemetry: TelemetryGeneratorService) {
  }

  tabViewWillEnter(): void {
    this.tabService.show();
  }

  // Prevent back naviagtion
  ionViewDidEnter() {
    this.tabService.show()
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    }
  )}

  ionViewWillEnter() {
    if (this.tabRef.outlet.component['tabViewWillEnter']) {
      (this.tabRef.outlet.component as unknown as OnTabViewWillEnter).tabViewWillEnter();
    }
  }
  
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionTabsDidChange(event: any) {
    if(event.tab == 'story') {
      this.tabService.hide();
      this.telemetry.generateStartTelemetry('bot', 'story-sakhi');
      this.router.navigate(['/story'])
    } else if(event.tab == 'parent-sakhi') {
      this.tabService.hide();
      this.telemetry.generateStartTelemetry('bot', 'parent-sakhi');
      this.router.navigate(['/parent-sakhi'])
    } else if(event.tab == 'teacher-sakhi') {
      this.tabService.hide();
      this.telemetry.generateStartTelemetry('bot', 'teacher-sakhi');
      this.router.navigate(['/teacher-sakhi'])
    }
  }
}
