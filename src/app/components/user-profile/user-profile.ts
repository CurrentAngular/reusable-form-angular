import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { initialFormData } from './user-profile-form.model';
import { form, Field, submit } from '@angular/forms/signals';
import { profileFormSchema } from './user-profile-form.schema';
import { ContactDetailsService } from '../../services/contact-details.service';
import { ContactDetails } from '../contact-details/contact-details';
import { compatForm } from '@angular/forms/signals/compat';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'rf-user-profile',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, Field, ContactDetails],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfile {
  readonly contactDetails = inject(ContactDetailsService).createContactDetailsFormGroup();

  readonly #formModel = signal({
    ...initialFormData,
    contactDetails: this.contactDetails,
  });

  // compatForm - позволяет объединять в одну форму - сигнальную и реактивные формы
  readonly form = compatForm(this.#formModel, profileFormSchema);

  onSubmit(): void {
    submit(this.form, async (form) => {
      console.log(this.#extractCompatValues(this.form().value()));

      // сбрасываем состояние сигнальной формы
      form().reset();

      // сбрасываем значения реактивной формы
      this.contactDetails.reset();

      // сбрасываем значения сигнальной формы
      this.#formModel.set({
        ...initialFormData,
        contactDetails: this.contactDetails,
      });
    });
  }

  #isReactiveControl(value: any): value is AbstractControl {
    return value instanceof AbstractControl;
  }

  #extractCompatValues(formValue: any): any {
    return Object.entries(formValue).reduce(
      (acc, [key, control]) => {
        acc[key] = this.#isReactiveControl(control) ? control.value : control;
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }
}
