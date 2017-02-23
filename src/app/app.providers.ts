import { UserActions } from './store/user/user.actions';
import { UserService } from './store/user/user.service';

export const APP_PROVIDERS = [
  UserActions,
  UserService
];
