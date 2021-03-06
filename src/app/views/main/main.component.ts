import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  form: FormGroup;
  desde: any;
  hasta: any;
  rangeDate1: Date;
  rangeDate2: Date;
  validDate1: boolean;
  validDate2: boolean;
  clearDP: boolean;
  today: Date;
  dateString1: any;
  dateString2: any;
  getDateFrom: any;
  getDateTo: any;
  tipoReporte = 'bonos';
  tipoRol = 'agentes';
  _baseURL: string;
  apiBusy = false;
  errorMsg;
  errorMes;
  menu = [
    // {
    //   menu: 'GMM',
    //   subMenu: [
    //     {
    //       label: 'Dashboard',
    //       routerLink: '/gmm/dashboard',
    //     },
    //     {
    //       label: 'Mis Trámites',
    //       routerLink: '/gmm/mis-tramites',
    //     },
    //     {
    //       label: 'Reportes',
    //       routerLink: '/gmm/reportes',
    //     },
    //   ],
    // },
    // {
    //   menu: 'Configuración',
    //   subMenu: [
    //     {
    //       label: 'Reglas de asignación',
    //       routerLink: '/configuracion/reglas-de-asignacion',
    //     },
    //     {
    //       label: 'Configurador de trámites',
    //       routerLink: '/configuracion/configurador-de-tramites',
    //     },
    //     {
    //       label: 'Reglas SE',
    //       routerLink: '/configuracion/reglas-se',
    //     },
    //   ],
    // },
  ];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this._baseURL = environment.apiURL;
  }

  ngOnInit(): void {
    this.today = new Date();
    this.form = this.fb.group({
      codigo: [null, Validators.required],
      mes: [null],
      anio: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  setDesde(e) {
    this.desde = e.date;
    if (e.isValid) {
      let formatDate = e.date.split('/');

      this.rangeDate1 = new Date(
        parseInt(formatDate[2]),
        parseInt(formatDate[1]) - 1,
        parseInt(formatDate[0])
      );

      this.validDate1 = e.isValid;
    } else {
      this.validDate1 = e.isValid;
    }

    let x = this.getFormattedDate(e.date, 'yyyy-mm-dd');
    if (x) this.getDateFrom = x.replaceAll('/', '-');
    else this.getDateFrom = x;
    this.dateString1 = e.date;

    if (e.date != '') this.f.mes.setValue(null);
  }

  setHasta(e) {
    this.hasta = e.date;
    if (e.isValid) {
      let formatDate = e.date.split('/');

      this.rangeDate2 = new Date(
        parseInt(formatDate[2]),
        parseInt(formatDate[1]) - 1,
        parseInt(formatDate[0])
      );

      this.validDate2 = e.isValid;
    } else {
      this.validDate2 = e.isValid;
    }

    let x = this.getFormattedDate(e.date, 'yyyy-mm-dd');
    if (x) this.getDateTo = x.replaceAll('/', '-');
    else this.getDateTo = x;
    this.dateString2 = e.date;

    if (e.date != '') this.f.mes.setValue(null);
  }

  getFormattedDate(dateString, format) {
    if (!dateString) return null;

    const regexDDmmYYYY =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const regexYYYYmmDD = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

    if (format == 'dd/mm/yyyy') {
      if (dateString.match(regexDDmmYYYY))
        return dateString.replaceAll('-', '/');
      if (dateString.match(regexYYYYmmDD)) {
        var dateParts = dateString.split('-');
        return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
      }
      return null;
    }

    if (format == 'yyyy-mm-dd') {
      dateString = dateString.replaceAll('/', '-');

      if (dateString.match(regexYYYYmmDD)) return dateString;
      if (dateString.match(regexDDmmYYYY))
        return dateString.split('-').reverse().join('-');
      return null;
    }
  }

  resetFilters() {
    this.clearDP = !this.clearDP;
    this.dateString1 = null;
  }

  getFile(doc) {
    this.apiBusy = true;
    this.errorMsg = null;

    const { codigo } = this.form.value;
    const desde = this.getFormattedDate(this.dateString1, 'yyyy-mm-dd');
    const hasta = this.getFormattedDate(this.dateString2, 'yyyy-mm-dd');
    const params = { codigo, desde, hasta };

    // this.apiService.getFile(params, this.tipoReporte, doc).subscribe((res) => {
    //   console.log(res);
    // });

    let type;

    if (doc === 'pdf') type = 'application/pdf';
    else
      type =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';

    const url =
      `${this._baseURL}/estados-cuenta/${this.tipoRol}/${this.tipoReporte}/${doc}?` +
      new URLSearchParams(params);

    fetch(url, {
      method: 'GET',
      headers: new Headers({
        Accept: '*/*',
        responseType: 'arraybuffer',
      }),
    }).then((response) => {
      if (response.ok)
        response
          .blob()
          .then((blob) => {
            var file = new Blob([blob], { type });
            var fileURL = URL.createObjectURL(file);

            var link = document.createElement('a');
            link.href = fileURL;
            link.download = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            link.click();

            this.apiBusy = false;
          })
          .catch((error) => {
            console.log(error);
            this.apiBusy = false;
            this.errorMsg =
              'Se ha producido un error. Por favor intenta mas tarde.';
          });
      else {
        this.apiBusy = false;
        this.errorMsg =
          'Se ha producido un error. Por favor intenta mas tarde.';
      }
    });
  }

  changeTipoReporte(e) {
    this.tipoReporte = e;
  }

  changeTipoRol(e) {
    this.tipoRol = e;
  }

  changeMes(e) {
    const anio = e.split('-')[0];
    const mes = e.split('-')[1];
    const clave = this.tipoRol[0].toUpperCase();
    const params = { mes, anio, clave };

    this.apiService.getPeriodo(params).subscribe(
      (res) => {
        this.errorMes = null;
        this.dateString1 = res.desde;
        this.dateString2 = res.hasta;
      },
      (e) => {
        this.errorMes = e.error.message;
        this.dateString1 = null;
        this.dateString2 = null;
      },
      () => {
        setTimeout(() => {
          this.f.mes.setValue(e);
        }, 1);
      }
    );
  }
}
