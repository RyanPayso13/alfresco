import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let el: DebugElement;
  let users: any = [{
    "entry": {
      "firstName": "Ryan",
      "id": "ryan",
      "enabled": false,
    }
  },
    {
      "entry": {
        "firstName": "Administrator",
        "id": "admin",
        "enabled": true,
      }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [UserService],
      imports: [HttpClientModule, MatChipsModule, MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load users OnInit', fakeAsync(() => {
      spyOn(userService, 'getUserList').and.returnValue(of({
          list: {
            entries: users
          }
      }).pipe(delay(1)));

      fixture.detectChanges();

      expect(component.users).toEqual([]);
      expect(userService.getUserList).toHaveBeenCalled();

      tick(1);

      expect(component.users).toEqual(users);
  }));

  it('render the user list', fakeAsync(() => {
      spyOn(userService, 'getUserList').and.returnValue(of({
          list: {
            entries: users
          }
      }).pipe(delay(1)));

      fixture.detectChanges();
      tick(1);
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('mat-chip-list'));
      expect(el).toBeDefined();
      expect(el.queryAll(By.css('mat-chip')).length).toEqual(2);
  }));

  it('should remove a user from the list', fakeAsync(() => {
    spyOn(userService, 'getUserList').and.returnValue(of({
        list: {
          entries: users
        }
    }).pipe(delay(1)));
    spyOn(component, 'remove').and.callThrough();

    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();

    let removeIcons = fixture.debugElement.queryAll(By.css('mat-icon'));

    expect(removeIcons.length).toEqual(1);

    removeIcons[0].triggerEventHandler('click', {stopPropagation: function(){return false;}});

    fixture.detectChanges();

    expect(component.remove).toHaveBeenCalled();
    expect(component.remove).toHaveBeenCalledWith('admin');
    expect(component.users.length).toEqual(1);

    let chips = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chips.length).toEqual(1);
  }));

  it('should differentiate an "enabled" user', () => {
    component.users = users;
    fixture.detectChanges();
    let chips = fixture.nativeElement.querySelectorAll('mat-chip');
    component.users.forEach((user, index) => {
        expect(chips[index].classList.contains('mat-chip-with-trailing-icon')).toBe(user.entry.enabled ? true : false);
        expect(window.getComputedStyle(fixture.nativeElement.querySelectorAll('mat-chip')[index]).backgroundColor).toBe(user.entry.enabled ? 'rgb(173, 255, 47)' : 'rgb(224, 224, 224)');
    });
  });

});
