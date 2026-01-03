import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputWrapper } from '../input-wrapper/input-wrapper';

@Component({
  selector: 'rf-contact-details',
  imports: [ReactiveFormsModule, InputWrapper],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetails {
  readonly details = input.required<FormGroup>();
}
