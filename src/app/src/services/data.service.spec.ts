import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
describe('DataService', () => {

  let httpClient: HttpClient;
  let dataService: DataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should return the list of homes', () => {

    httpClient = TestBed.get(HttpClient);

    const homesMock = [
      {
        title: 'Home 1',
        image: 'assets/listing.jpg',
        location: 'New York'
      },
      {
        title: 'Home 2',
        image: 'assets/listing.jpg',
        location: 'Boston'
      },
      {
        title: 'Home 3',
        image: 'assets/listing.jpg',
        location: 'Chicago'
      }
    ];

    spyOn(httpClient, 'get').and.returnValue(of(homesMock))

    dataService = TestBed.get(DataService);
    const spy = jasmine.createSpy('spy');
    dataService.getHomes$().subscribe(spy);

    expect(spy).toHaveBeenCalledWith(homesMock);

    expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');
  });
});
