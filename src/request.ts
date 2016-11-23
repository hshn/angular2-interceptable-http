import { RequestOptionsArgs } from '@angular/http';

export interface RequestArgs {
  url: string
  body?: string
  options?: RequestOptionsArgs
}
