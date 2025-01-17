import { CanDeactivateFn } from '@angular/router';
import { UsersService } from '../services/user.service';
import { inject } from '@angular/core';

export const authDeactivateGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const auhService: UsersService = inject(UsersService);
  // console.log(component);
  // console.log(currentRoute);
  // console.log(currentState);
  // console.log(nextState);
  return auhService.correo !== null;
};
