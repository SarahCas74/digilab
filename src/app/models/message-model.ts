import { RoomModel } from "./room-model"
import { UserModel } from "./user-model"

export class MessageModel {
    readonly _id?: string
    userID?: UserModel[]
    roomID?: RoomModel
    friendID?: UserModel
    date?: Date
    content?: string
}
