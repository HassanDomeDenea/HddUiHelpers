import { UserOptionsData } from '@/types/laravel_generated';

export interface BasicUserData {
    username: string;
    name: string;
    options: UserOptionsData
}
