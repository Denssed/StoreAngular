import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-presentation-modal',
  imports: [],
  templateUrl: './presentation-modal.component.html',
  styleUrl: './presentation-modal.component.scss'
})
export class PresentationModalComponent {

  title: string = '';
  text: string = '';

  isLoading: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  //Modal Type
  @Input ()isLoginSuccess: boolean = false;
  @Input ()isLoginFail: boolean = false;
  @Input ()isServerError: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.isLoginSuccess) this.onLoginSuccess() 
    if (this.isLoginFail) this.onLoginFail()
    if (this.isServerError) this.onServerError()

      setTimeout(() => {
        this.close();
      }, 3000);
  }

  close() {
    this.closeModal.emit();
  }

  onLoginSuccess() {
    this.title = 'Usuario Autorizado';
    this.text = 'Seras regidirido en breve.';
  }

  onLoginFail() {
    this.title = 'Usuario No Autorizado';
    this.text = 'Usuario o contraseña incorrectos.';
  }

  onServerError() {
    this.title = 'Tenemos un inconvenientes tecnicos';
    this.text = 'Porfavor intenta mas tarde, o comuniquese con soporte al cliente';
  }
  
}
