import { Component, VERSION, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from './data.service';
import {ChartsPerTestComponent} from './charts-per-test/charts-per-test.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  settings: object;
  source: LocalDataSource;
  dataWithTestName = [];


  constructor(private dataService: DataService, private modalService: NgbModal) {
  }

  ngOnInit() {
    // merging array with test names into array with aggregated data.
    this.dataWithTestName = this.dataService.aggregatedMeasurements.map((item, i) =>
      Object.assign({}, item, this.dataService.tests[i]));

    console.log(this.dataService.aggregatedMeasurements);
// settings for the table.
    this.settings = {
      actions: false,
      columns: {
        test_name: {
          title: 'Test Name',
          filter: false,
          type: 'string',
        },
        min: {
          title: 'Minimum',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell: number) => {
            if ((cell <= 49) && (cell >= 0)) {
              return '<p class="colorGreen">' + cell + '</p>';
            } else if ((cell <= 99) && (cell >= 50)) {
              return '<p class="colorYellow">' + cell + '</p>';
            }
            else if ((cell <= 149) && (cell >= 100)) {
              return '<p class="colorOrange">' + cell + '</p>';
            }
            else if ((cell <= 200) && (cell >= 150)) {
              return '<p class="colorRed">' + cell + '</p>';
            }
          }
        },
        average: {
          title: 'Average',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell: number) => {
            if ((cell <= 49) && (cell >= 0)) {
              return '<p class="colorGreen">' + cell + '</p>';
            } else if ((cell <= 99) && (cell >= 50)) {
              return '<p class="colorYellow">' + cell + '</p>';
            }
            else if ((cell <= 149) && (cell >= 100)) {
              return '<p class="colorOrange">' + cell + '</p>';
            }
            else if ((cell <= 200) && (cell >= 150)) {
              return '<p class="colorRed">' + cell + '</p>';
            }
          }
        },
        max: {
          title: 'Maximum',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell: number) => {
            if ((cell <= 49) && (cell >= 0)) {
              return '<p class="colorGreen">' + cell + '</p>';
            } else if ((cell <= 99) && (cell >= 50)) {
              return '<p class="colorYellow">' + cell + '</p>';
            }
            else if ((cell <= 149) && (cell >= 100)) {
              return '<p class="colorOrange">' + cell + '</p>';
            }
            else if ((cell <= 200) && (cell >= 150)) {
              return '<p class="colorRed">' + cell + '</p>';
            }
          }
        }
      }
    };
    this.source = new LocalDataSource(this.dataWithTestName);
  }

  // on event occurs ex. opening a popup when clicked on the row.
  onCustomAction(event: any) {
    const modalRef = this.modalService.open(ChartsPerTestComponent, {size: 'lg', centered: true, scrollable: true,
      backdrop: 'static'} );
    modalRef.componentInstance.test_id = event.data.test_id;
    modalRef.componentInstance.test_name = event.data.test_name;
  }
}
