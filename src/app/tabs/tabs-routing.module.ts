import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'my-pitara',
        loadChildren: () => import('../pages/mypitara/mypitara.module').then(m => m.MyPitaraPageModule)
      },
      {
        path: 'story',
        loadChildren: () => import('../pages/story/story.module').then(m => m.StoryPageModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('../pages/activity/activity.module').then(m => m.ActivityPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
