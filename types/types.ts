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
  _?: any;
}
export interface UserOptionsMap {
  _?: any;
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
