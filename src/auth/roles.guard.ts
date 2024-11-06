import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "./roles.decorator";
import { Role } from "./schemas/user.schema";

@Injectable()

export class RolesGuard implements CanActivate{
    constructor (private reflector: Reflector){}
    
    canActivate(context: ExecutionContext): boolean{
            const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY,[
                context.getHandler(),
                context.getClass()

            ]);
            if(!requiredRoles){
                return true
            }

            const user = context.switchToHttp().getRequest();
            return requiredRoles.some((role) => user?.role === role);
    }
    }
    
