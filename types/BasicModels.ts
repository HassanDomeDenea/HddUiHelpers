import type { GlobalOptionData, UserOptionsData } from '@/types/laravel_generated';

export interface BasicUserData {
  id: number | string;
  username: string;
  name: string;
  options: UserOptionsData;
  global_options: GlobalOptionData;
  permission_names?: string[] | null;
  role_names?: string[] | null;
}
