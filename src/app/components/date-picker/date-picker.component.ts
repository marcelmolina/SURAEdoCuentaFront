import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DatePickerOptions } from '@ngx-tiny/date-picker';
import { es } from 'date-fns/locale';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  singleDate: Date = new Date();
  initDate: any;
  error: boolean = false;
  @Input() dateString: any;
  @Input() clear: number;
  @Input() placeholder;
  @Input() width: number;
  @Input() max: Date;
  @Input() min: Date;
  @Input() isDisabled;
  @Output() action = new EventEmitter<any>();
  singleDatePickerOptions: DatePickerOptions;
  currentPlaceholder;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateString)
      if (changes.dateString.currentValue == null) this.initDate = '';
      else {
        var newdate = this.dateString
          .split('/')
          .reverse()
          .join('/')
          .replaceAll('-', '/');

        if (this.dateString != '') {
          this.initDate = new Date(newdate);
        }
      }

    if (changes.clear) {
      this.initDate = '';
    }
  }

  ngOnInit(): void {
    this.currentPlaceholder = this.placeholder;

    if (this.max)
      this.singleDatePickerOptions = {
        displayFormat: 'dd-MM-yyyy',
        locale: { locale: es },
        barTitleIfEmpty: 'Seleccione una fecha',
        maxDate: new Date(this.max),
      };
    else
      this.singleDatePickerOptions = {
        displayFormat: 'dd-MM-yyyy',
        locale: { locale: es },
        barTitleIfEmpty: 'Seleccione una fecha',
      };

    if (this.min)
      this.singleDatePickerOptions = {
        ...this.singleDatePickerOptions,
        minDate: this.min,
      };

    if (this.dateString) {
      var newdate = this.dateString
        .split('/')
        .reverse()
        .join('/')
        .replaceAll('-', '/');

      this.initDate = new Date(newdate);
    }
  }

  onChangeSingle(d) {
    if (d == '') {
      this.dateString = d;
      return;
    }
    let dateString = d.replaceAll('-', '/');
    let dateMomentObject = moment(dateString, 'DD/MM/YYYY');
    let dateObject = dateMomentObject.toDate();
    this.dateString = dateString;

    // valido que no sea mayor a la fecha actual
    if (this.max) {
      if (dateObject > new Date(this.max)) {
        this.action.emit({ date: dateString, isValid: false });
        this.error = false;
        return;
      }
    }

    if (this.min) {
      if (dateObject < new Date(this.min)) {
        this.action.emit({ date: dateString, isValid: false });
        this.error = false;
        return;
      }
    }

    // valido el formato de la fecha
    let validFormat = dateString.match(
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    );

    if (validFormat) {
      this.action.emit({ date: dateString, isValid: true });
      this.error = false;
    } else this.action.emit({ date: dateString, isValid: false });
  }
  activeError() {
    if (this.dateString == '' || this.dateString == undefined) {
      this.error = true;

      this.action.emit({ date: this.dateString, isValid: false });
    }
  }

  setPlaceholder() {
    if (this.initDate == '' || !this.initDate)
      this.currentPlaceholder = 'dd-mm-aaaa';
  }

  setPlaceholderOut() {
    this.currentPlaceholder = this.placeholder;
  }
}
