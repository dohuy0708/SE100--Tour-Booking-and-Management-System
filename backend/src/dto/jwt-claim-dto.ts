export class JwtClaimDto {
    id!: string;
    username!: string;
    roleId!: string;
  
    constructor(id: string, username: string, roleId: string) {
      this.id = id;
      this.username = username;
      this.roleId = roleId;
    }
  }
  