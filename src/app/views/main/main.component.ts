import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  menu = [
    {
      menu: 'GMM',
      subMenu: [
        {
          label: 'Dashboard',
          routerLink: '/gmm/dashboard',
        },
        {
          label: 'Mis Trámites',
          routerLink: '/gmm/mis-tramites',
        },
        {
          label: 'Reportes',
          routerLink: '/gmm/reportes',
        },
      ],
    },
    {
      menu: 'Configuración',
      subMenu: [
        {
          label: 'Reglas de asignación',
          routerLink: '/configuracion/reglas-de-asignacion',
        },
        {
          label: 'Configurador de trámites',
          routerLink: '/configuracion/configurador-de-tramites',
        },
        {
          label: 'Reglas SE',
          routerLink: '/configuracion/reglas-se',
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.today = new Date();
    this.form = this.fb.group({
      rol: ['', Validators.required],
      usuario: ['', Validators.required],
      estado: ['', Validators.required],
      agente: [null, Validators.required],
      grupo: ['', Validators.required],
      subgrupo: ['', Validators.required],
      rfc: [null, Validators.required],
      tipoTramite: ['', Validators.required],
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
}
