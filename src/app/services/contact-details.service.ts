import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ContactDetailsService {
  readonly #fb = inject(FormBuilder);

  createContactDetailsFormGroup(): FormGroup {
    return this.#fb.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    });
  }
}
