export interface BasicUserData {
  id: number | string;
  username: string;
  name: string;
  avatar_url?: string;
  avatar_thumb_url?: string;
  options: UserOptionsMap;
  global_options: GlobalOptionsMap;
  permission_names?: HddPermission[] | null;
  role_names?: HddRole[] | null;
}

export type ToMap<T extends string> = { [K in T]: true };

export interface RolesMap extends Record<string, any> {}
export interface PermissionsMap {}
export interface GlobalOptionsMap {
  app_name?: any;
}
export interface UserOptionsMap {
  language?: string;
  dark_mode?: "light" | "dark" | "auto";
}

export type HddRole = keyof RolesMap & string;
export type HddPermission = keyof PermissionsMap;
export type HddGlobalOption = keyof GlobalOptionsMap;
export type HddUserOption = keyof UserOptionsMap;

declare module "vue-router" {
  interface RouteMeta {
    roles?: HddRole | HddRole[];
    permissions?: HddPermission | HddPermission[];
    auth?: boolean;
    title?: string;
  }
}

// To expand the permissions or options, use this in your app types.d.ts
/*
declare module '@hassandomedenea/hdduihelpers/types/types' {
  interface PermissionsMap {
    'manage-users': true
    'delete-posts': true
    'view-reports': true
  }
  // OR
  interface PermissionsMap extends ToMap<Permission>
}
*/

export interface ApiResponseData<TData = any> {
  success: boolean;
  data: TData;
}

export interface InfiniteScrollResponseData {
  items: any | Array<any>;
  total: number;
}

export interface OptionInterface {
  name: string;
  id: number | string;
}

export interface ValueInterface {}
