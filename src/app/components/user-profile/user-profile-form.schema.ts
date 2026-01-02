import { required, schema } from '@angular/forms/signals';
import { UserProfileInterface } from './user-profile-form.interface';

export const profileFormSchema = schema<UserProfileInterface>((path) => {
  required(path.firstName, { message: 'This field is required' });
  required(path.lastName, { message: 'This field is required' });
});
