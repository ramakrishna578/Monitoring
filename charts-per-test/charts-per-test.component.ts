import { Component, OnInit, NgZone, Input, OnDestroy} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '.././data.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-charts-per-test',
  templateUrl: './charts-per-test.component.html',
  styleUrls: ['./charts-per-test.component.css']
})
export class ChartsPerTestComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:variable-name
  @Input() test_id;
  // tslint:disable-next-line:variable-name
  @Input() test_name;
  chart: am4charts.XYChart;
  filteredData = [];
  convertedDateData = [];
  testName: string;

  constructor( private zone: NgZone, public activeModal: NgbActiveModal, private dataService: DataService) { }

  ngOnInit() {
    this.testName = this.test_name;
    this.filteredData = this.dataService.measurments.filter(x => x.test_id === this.test_id);
    this.convertedDateData = this.filteredData.map(x => x.measurements.map(y => ({value: y.value, date: new Date(y.time)})));
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);

      // chart.paddingRight = 20;
      chart.data = this.convertedDateData[0];

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0.5;
      // dateAxis.renderer.minGridDistance = 50;
      dateAxis.gridIntervals.setAll([
        { timeUnit: 'hour', count: 1 },
        { timeUnit: 'hour', count: 6 },
      ]);

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 30;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';

      series.tooltipText = '{valueY.value}';
      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;

      this.createGrid(50, 'Normal');
      this.createGrid(100, 'Warnung');
      this.createGrid(150, 'Schwer Warnung');
      this.createGrid(200, 'Kritische Warnung');
    });
  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  createGrid(value: number, label: string) {
    const valueAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    const range = valueAxis.axisRanges.create();
    range.value = value;
    range.label.text = label;
    // range.label.inside = true;
    range.label.horizontalCenter = 'left';
    range.label.verticalCenter = 'top';
    // range.label.dx = 400;
    range.label.dy = -165;
  }
}
