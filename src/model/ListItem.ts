export interface Item {
  id: number;
  item: string;
  checked: boolean;
}

export default class LisetItem implements Item {
  constructor(
    private _id: number = 0,
    private _item: string = '',
    private _checked: boolean = false
  ) {}

  public get checked(): boolean {
    return this._checked;
  }
  public set checked(value: boolean) {
    this._checked = value;
  }
  public get item(): string {
    return this._item;
  }
  public set item(value: string) {
    this._item = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
}
