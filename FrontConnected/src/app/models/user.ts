export class User {
    userId: number;
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
    role: string;
    picByte: string;
    retrievedImage: string;
    token?: string;
    constructor(userId: number, name: string, email: string){
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
}
