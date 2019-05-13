import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies'
import { HomesComponent } from './homes.component';
import { DataService } from '../../services/data.service';
import {of} from 'rxjs';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers: [
        {provide: DataService, useFactory: ()=>spyOnClass(DataService)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;

  });

  beforeEach(()=>{
    dataService = TestBed.get(DataService);

    dataService.getHomes$.and.returnValue(of([
      {
        title: 'Home 1',
        image: 'assets/listing.png',
        location: 'New York'
      },
      {
        title: 'Home 2',
        image: 'assets/listing.png',
        location: 'Boston'
      },
      {
        title: 'Home 3',
        image: 'assets/listing.png',
        location: 'Chicago'
      }
    ]));
    fixture.detectChanges();
  })
  it('should show homes', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
  });

  it('should show home info', () => {
   const home = fixture.nativeElement.querySelector('[data-test="home"]');
   expect(home.querySelector('[data-test="location"]').innerText).toEqual('New York');
   expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });
});
