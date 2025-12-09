import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataTableService } from '../services/dialogs/data-table.service';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-attribute-table',
    imports: [MatIconModule, MatTooltipModule, CdkDrag, MatTableModule],
    templateUrl: './attribute-table.component.html',
    styleUrl: './attribute-table.component.scss',
    animations: [
        trigger('slideInOut', [
            state('true', style({
                transform: 'translateY(300%)'
            })),
            state('false', style({
                transform: 'translateY(0%)'
            })),
            transition('true <=> false', animate('300ms ease-in-out'))
        ])
    ]
})
export class AttributeTableComponent implements OnInit, AfterViewInit {

  dataTabletoggle: boolean = false

  elName: string = ''

  enName: string = ''

  dbName: string = ''

  jsonResponce: any = ''

  dataTableSubscription: any;

  constructor(private srv: DataTableService
  ) {

  }

  ngOnInit(): void {
    this.dataTableSubscription = this.srv.dataTableBtn$.subscribe(btnValue => {
      this.dataTabletoggle = btnValue;
    });

    this.dataTableSubscription = this.srv.dataTableElName$.subscribe(name => {
      this.elName = name;
    });

    this.dataTableSubscription = this.srv.dataTableEnName$.subscribe(name => {
      this.enName = name;
    });

    this.dataTableSubscription = this.srv.databaseName$.subscribe(name => {
      this.dbName = name;
    });

    this.dataTableSubscription = this.srv.jsonResponce$.subscribe(name => {
      this.jsonResponce = name;
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (this.dataTableSubscription) {
      this.dataTableSubscription.unsubscribe();
    }
  }



  // Close dialog function
  closeDialog() {
    this.srv.toggleDataTable()
  }
}
