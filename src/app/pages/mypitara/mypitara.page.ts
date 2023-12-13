import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { EditRemovedModalComponent } from 'src/app/components/edit-removed-modal/edit-removed-modal.component';
import { AppHeaderService } from 'src/app/services/app-header.service';
import { ContentService } from 'src/app/services/content/content.service';
import { PlayList } from 'src/app/services/playlist/models/playlist.content';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

@Component({
  selector: 'app-mypitara',
  templateUrl: 'mypitara.page.html',
  styleUrls: ['mypitara.page.scss']
})
export class MyPitaraPage {
  contentList: any;
  playlists: Array<any> = [];

  constructor(private headerService: AppHeaderService,
    private contentService: ContentService,
    private router: Router,
    private playListService: PlaylistService,
    private modalCtrl: ModalController) {
    this.headerService.showHeader("My Jaadui Pitara");
  }

  async ngOnInit(): Promise<void> {
    this.headerService.deviceBackbtnEmitted$.subscribe((event: any) => {
      if(event.name = "backBtn") {
        this.getPlaylistContent();
      }
    })
  
  }

  ionViewWillEnter() {
    this.getRecentlyviewedContent();
    this.getPlaylistContent();
  }

  viewAllCards(event: string) {
    this.router.navigate(['/view-all'], {state: {type: event}})
  }

  async getPlaylistContent() {
    this.playlists = [];
    await this.playListService.getAllPlayLists('guest').then((result: Array<PlayList>) => {
      this.playlists = result;
      console.log('playlists', this.playlists);
    }).catch((error) => {
      console.log('error', error)
    })
  }

  async getRecentlyviewedContent() {
    await this.contentService.getRecentlyViewedContent('guest').then((result) => {
      this.contentList = result;
      console.log('contentList', this.contentList);
    }).catch((err) => {
      console.log('error', err)
    })
  }
  
  createList() {
    this.router.navigate(['/create-playlist'])
  }

  async deletePlaylist(content: any) {
    await this.playListService.deletePlayList(content.identifier).then((data) => {
      this.getPlaylistContent()
    }).catch((err) => {
      console.log('err', err)
    })
  }

  async openModal(content?: any) {
    const modal = await this.modalCtrl.create({
      component: EditRemovedModalComponent,
      cssClass: 'add-to-pitara',
      breakpoints: [0, 1],
      showBackdrop: false,
      initialBreakpoint: 1,
      handle: false,
      handleBehavior: "none"
    });
    await modal.present();
    modal.onWillDismiss().then((result) => {
      if(result && result.data.type === 'delete') {
        this.deletePlaylist(content);
      }
    });
  }
}
