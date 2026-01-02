import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'rf-input-wrapper',
  imports: [],
  templateUrl: './input-wrapper.html',
  styleUrl: './input-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWrapper {
  readonly label = input('');

  // Эта строка позволяет InputWrapper "увидеть" и получить доступ к FormControl (или NgModel, если используется FormsModule) того элемента,
  // который будет передан внутрь rf-input-wrapper (например, <input matInput> или <input> с formControlName).
  readonly control = contentChild.required(NgControl, { read: NgControl });

  // Этот вычисляемый сигнал определяет, является ли элемент управления, внедрённый внутрь rf-input-wrapper,
  // обязательным (required) на основе того, есть ли у него валидатор Validators.required.
  // Это полезно, например, для отображения звёздочки (*) рядом с лейблом в шаблоне.
  readonly isRequired = computed(() => this.control().control?.hasValidator(Validators.required));
}
