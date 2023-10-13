export interface UserModel {
    userId: string,
    updated:{
        firstName: string,
        lastName: string,
        phoneNum: number | string,
        address:{
            street: string,
            city: string,
            state: string,
            zip: number | string
        }
    }

}