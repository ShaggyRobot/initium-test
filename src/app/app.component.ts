import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { IconService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'initium-test';
  displayedCols: string[] = ['name', 'surname', 'email', 'phone'];

  public clientList = this.clients.clientsList$;

  constructor(
    private readonly clients: ClientsService,
    private readonly icons: IconService
  ) {
    this.icons.registerIcons();
  }

  ngOnInit(): void {
    if (!this.clientList.getValue().length) {
      this.clients.fetchClients();
    }
  }
}
