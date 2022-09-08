export class Tag {
  private id: number;
  private creator: string;
  private name: string;
  private sortOrder: number;

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
}
