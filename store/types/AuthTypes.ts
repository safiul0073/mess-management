export interface AuthUserType {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthStateType {
    user: AuthUserType | null;
    token: string | null;
}

export interface LoginResponseType {
    ok: boolean;
    accessToken: string;
    user: AuthUserType;
}

export interface CredentialType {
    username: string;
    password: string;
}
