interface LoginResponseInterface {
    accessToken: string;
    userName: string;
    refreshToken: string;
}

export interface ResponseRoot {
    data: LoginResponseInterface;
}
