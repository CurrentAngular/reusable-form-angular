import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { initialFormData } from './user-profile-form.model';
import { form, Field, submit } from '@angular/forms/signals';
import { UserProfileInterface } from './user-profile-form.interface';
import { profileFormSchema } from './user-profile-form.schema';

@Component({
  selector: 'rf-user-profile',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, Field],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfile {
  readonly #formModel = signal<UserProfileInterface>(initialFormData);
  readonly form = form(this.#formModel, profileFormSchema);

  onSubmit(): void {
    submit(this.form, async (form) => {
      const values = form().value();
      console.log(values);

      form().reset();
      this.#formModel.set(initialFormData);
    });
  }
}
