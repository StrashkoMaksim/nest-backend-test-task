interface CreatorInfo {
  nickname: string;
  uid: string;
}

export class Tag {
  private id: number;
  private creator: string;
  private name: string;
  private sortOrder: number;
  private creatorInfo: CreatorInfo | undefined = undefined;

  constructor(id: number, creator: string, name: string, sortOrder: number) {
    this.id = id;
    this.creator = creator;
    this.name = name;
    this.sortOrder = sortOrder;
  }

  getId() {
    return this.id;
  }

  getCreator() {
    return this.creator;
  }

  getName() {
    return this.name;
  }

  getSortOrder() {
    return this.sortOrder;
  }

  getCreatorInfo() {
    return this.creatorInfo;
  }

  setId(id: number) {
    this.id = id;
  }

  setCreator(creator: string) {
    this.creator = creator;
  }

  setName(name: string) {
    this.name = name;
  }

  setSortOrder(sortOrder: number) {
    this.sortOrder = sortOrder;
  }

  setCreatorInfo(creatorInfo: CreatorInfo) {
    this.creatorInfo = creatorInfo;
  }
}
