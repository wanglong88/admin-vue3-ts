export interface userList {
  id: number;
  nickName: string;
  userName: string;
  role: RoleInit[];
}

export interface RoleInit {
  role: number;
  roleName: string;
}

export interface SelectDataInt {
  role: number
  nickName: string
}

export interface RoleListInt {
  roleName: string;
  roleId: number;
  authority: number[];
}

export interface ActiveInt {
  id: number;
  nickName: string;
  userName: string;
  role: number[];
}

export class InitData {
  selectData: SelectDataInt = {
    nickName: '',
    role: 0,
  }
  list: userList[] = [] //接受用户信息
  clonelist: userList[] = [] //接受用户信息<clone>
  rolelist: RoleListInt[] = [] //接受角色信息
  isShow = false
  active: ActiveInt = {
    id: 0,
    nickName: '',
    userName: '',
    role: [],
  }
}




