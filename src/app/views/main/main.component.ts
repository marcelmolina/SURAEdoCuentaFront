import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  form: FormGroup;

  test = 'atenci&#243;n&#160;'.toString();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
}
