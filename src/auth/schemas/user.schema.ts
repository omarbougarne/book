import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum Role{
    User = 'User',
    Admin = 'Admin'
}
@Schema({
    timestamps: true 
})
export class User{
    @Prop()
    name: string
    @Prop({unique: [true]})
    email: string
    @Prop()
    password: string

    @Prop()
    role: Role
   
}
export const UserSchema = SchemaFactory.createForClass(User)