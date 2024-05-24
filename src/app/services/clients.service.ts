import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';

export type Client = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

export type ClientWithId = Client & { id: string };

type ClientsDTO = {
  users: Array<Client>;
};

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public clientsList$ = new BehaviorSubject<ClientWithId[]>([]);

  constructor(private http: HttpClient) {
    const localClients = localStorage.getItem('initiumClientList');

    if (localClients) {
      try {
        const parsedLocalClients: ClientWithId[] = JSON.parse(localClients);

        this.clientsList$.next(parsedLocalClients);
      } catch (error) {
        console.error(
          `Can not parse local clients: ${(error as Error).message}`
        );
      }
    }
  }

  private updateLS(): void {
    localStorage.setItem(
      'initiumClientList',
      JSON.stringify(this.clientsList$.getValue())
    );
  }

  public fetchClients(): void {
    this.http.get<ClientsDTO>(`${env.baseUrl}/task1`).subscribe({
      next: (data) => {
        const { users } = data;
        const usersWithIds = users.map((user, idx) => ({
          ...user,
          id: crypto.randomUUID(),
        }));

        localStorage.setItem('initiumClientList', JSON.stringify(usersWithIds));
        this.clientsList$.next(usersWithIds);
      },
      error(error) {
        console.error(
          `Can not fetch from API: ${(error as HttpErrorResponse).message}`
        );
      },
    });
  }

  public addClient(client: Client): void {
    const clientWithId: ClientWithId = { id: crypto.randomUUID(), ...client };

    this.clientsList$.next([clientWithId, ...this.clientsList$.getValue()]);

    this.updateLS();
  }

  public editClient(editedClient: ClientWithId): void {
    const newClients = this.clientsList$
      .getValue()
      .map((client) => (client.id === editedClient.id ? editedClient : client));

    this.clientsList$.next(newClients);

    this.updateLS();
  }

  public deleteClients(idList: Array<string>): void {
    this.clientsList$.next(
      this.clientsList$
        .getValue()
        .filter((client) => !idList.includes(client.id))
    );

    this.updateLS();
  }
}
