import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  //Data table
  private dataTableBtn = new BehaviorSubject<boolean>(false);
  dataTableBtn$ = this.dataTableBtn.asObservable();

  //Data table
  public dataTableElName = new BehaviorSubject<string>('');
  dataTableElName$ = this.dataTableElName.asObservable();


  //Data table
  public dataTableEnName = new BehaviorSubject<string>('');
  dataTableEnName$ = this.dataTableEnName.asObservable();

  //Data table
  public databaseName = new BehaviorSubject<string>('');
  databaseName$ = this.databaseName.asObservable();

  //Data table
  public jsonResponce = new BehaviorSubject<Record<string, any>>({});
  jsonResponce$ = this.jsonResponce.asObservable();



  constructor(private http: HttpClient) { }

  toggleDataTable() {
    this.dataTableBtn.next(!this.dataTableBtn.getValue());

    const topicsPerThemesApiUrl = `http://localhost:8000/api/beaches/`;

    //Get themes
    this.http
      .get(topicsPerThemesApiUrl)
      .subscribe({
        next: (response: any) => {
          this.jsonResponce = response
          console.log(this.jsonResponce);
          let cols = Object.keys(response[0]);
          console.log("Keys:", cols);
        },
        error: (error) => {
          console.log(error);
        },
      });



  }
}
