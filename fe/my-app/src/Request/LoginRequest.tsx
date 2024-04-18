class LoginRequest {
    email:string;
    password:string;
    isRemember:boolean;
    constructor(email:string,password:string,isRemember:boolean) {
        this.email=email;
        this.password=password;
        this.isRemember=isRemember;
    }
}
export default LoginRequest;