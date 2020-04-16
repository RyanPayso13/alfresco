import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { ListResponse } from 'src/models/listResponse';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  const resp: ListResponse = {
    "list": {
      "pagination": {
        "count": 4,
        "hasMoreItems": false,
        "totalItems": 4,
        "skipCount": 0,
        "maxItems": 100
      },
      "entries": [
        {
          "entry": {
            "lastName": "Beecher",
            "userStatus": "Helping to design the look and feel of the new web site",
            "jobTitle": "Graphic Designer",
            "statusUpdatedAt": "2011-02-15T20:20:13.432+0000",
            "mobile": "0112211001100",
            "emailNotificationsEnabled": true,
            "description": "Alice is a demo user for the sample Alfresco Team site.",
            "telephone": "0112211001100",
            "enabled": false,
            "firstName": "Alice",
            "skypeId": "abeecher",
            "avatarId": "198500fc-1e99-4f5f-8926-248cea433366",
            "location": "Tilbury, UK",
            "company": {
              "organization": "Moresby, Garland and Wedge",
              "address1": "200 Butterwick Street",
              "address2": "Tilbury",
              "address3": "UK",
              "postcode": "ALF1 SAM1"
            },
            "id": "abeecher",
            "email": "abeecher@example.com"
          }
        },
        {
          "entry": {
            "firstName": "Administrator",
            "emailNotificationsEnabled": true,
            "company": {},
            "id": "admin",
            "enabled": true,
            "email": "admin@alfresco.com"
          }
        }
      ]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects service to fetch list data',
  inject([HttpTestingController, UserService],
    (httpMock: HttpTestingController, service: UserService) => {
      service.getUserList().subscribe(data => {
        expect(data.data).toEqual(resp);
      });
      const req = httpMock.expectOne('/api/-default-/public/alfresco/versions/1/people');
      expect(req.request.method).toEqual('GET');
      req.flush({data: resp});
    })
);

});
