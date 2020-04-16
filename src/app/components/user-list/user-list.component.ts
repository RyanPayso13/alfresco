import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: Array<User> = [];
  private subscription: Subscription;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserList().subscribe(data => this.users = data.list.entries)
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }

  }

  remove(id: string): Array<User>{
    return this.users = [...this.users].filter(user => user.entry.id !== id);
  }

}
