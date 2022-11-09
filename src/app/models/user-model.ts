// // --------------exemple héritage-----------------------------
// class Role {
//     //inférence TS devine le type
//     public isAdmin = true;



//     constructor(isAdmin = false) {
//         this.isAdmin = isAdmin
//     }
// }

// //-------------------Class du modèle avec l'implémentation de l'interface' IUser-----------------------
// // Avec le mot clé "extends" on peut accéder aux attributs de la classe héritage Role et avec le mot super
// export class UserModel extends Role implements IUser {

//     public email!: string;

//     //! Inférence : deviner le type de l'attribut en fonction de l'initialisation de cet attribut
//     //! L'ordre dans le constructor est important
//     constructor(email = '', isAdmin: boolean) {
//         console.log(super(isAdmin))
//         this.email = email;
//     }

//     getEmail(): string {
//         return this.email
//     }

// }

// //-------------------on créé une interface et on déclare les méthodes----------------
// // pour imposer des attributs et des méthodes à ceux qui utilisent ces interfaces
// interface IUser {

//     //obligatoire de déclarer tous les attributs de la méthode
//     email: string,

//     //on déclare le type de retour de la méthode (pas d'implémentation)
//     getEmail(): string;

// }
import { MessageModel } from "./message-model"
import { RoomModel } from "./room-model"

export class UserModel {

    username!: string
    firstName!: string
    lastName!: string
    avatar!: string
    email!: string
    readonly _id?: string
    password?: string
    roomsID?: RoomModel[]
    sentMessagesID?: MessageModel[]
    receivedMessagesID?: MessageModel[]
    isLoggedIn?: boolean
    token?: string
    country?: string
    city?: string
    street?: string
    zipCode?: number
    phoneNumber?: string
    dialCode?: string
    skills?: string[]
    role?: string
    friendsID?: UserModel[]
    dateOfBirth?:string | Date
    confirmPassword?:string
    
    constructor() { }

}
