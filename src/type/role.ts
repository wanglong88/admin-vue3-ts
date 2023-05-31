export interface roleInt {
  roleName: string;
  roleId: number;
  authority: number[];
}

export class InitData {
  list: roleInt[] = []
}