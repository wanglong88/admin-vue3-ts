export interface ListData {

}

export interface ListData {
  name: string;
  roleId: number;
  viewRole: string;
  roleList?: ListData[];
}

export class InitData {
  id: number
  authority: number[]
  constructor(id: number, authority: number[]) {
    this.id = id
    this.authority = authority
  }
  list: ListData[] = []
  treeRef: any
}