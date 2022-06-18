export default interface User {
    username: string;
    email: string;
    password: string;
    preferences: object;
    firstname: string;
    lastname: string;
    admin: boolean;
}