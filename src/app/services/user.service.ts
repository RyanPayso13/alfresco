import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse } from 'src/models/listResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
    ) {
  }

  getUserList(): Observable<any> {
    return this.http.get<ListResponse>('/api/-default-/public/alfresco/versions/1/people');
  }
}
