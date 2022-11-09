import{MessageModel} from "./message-model"
import{UserModel} from "./user-model"

export class RoomModel {
    readonly _id?:string
    ownersID?:UserModel[]
    usersID?:UserModel[]
    messagesID?:MessageModel[]
    }
