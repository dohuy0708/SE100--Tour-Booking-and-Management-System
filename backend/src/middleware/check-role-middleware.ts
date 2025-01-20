import { JwtClaimDto } from '../dto/jwt-claim-dto';
import { ErrorCode } from '../enum/error-code-enum';
import BaseError from '../utils/base-error';

export const checkPermission = (roles: string[]) => (req: any, res: any, next: any) => {
  try {
    const user: JwtClaimDto = req.user;
    const userRoles = user.roleId;

    const hasRole = roles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw new BaseError(ErrorCode.PERMISSION_01, "Your role doesn't have permission to access this resource");
    }
    next();
  } catch (error) {
    next(error);
  }
};
