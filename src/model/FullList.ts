import LisetItem from './ListItem';

interface List {
  list: LisetItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: LisetItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  constructor(private _list: LisetItem[] = []) {}

  public get list(): LisetItem[] {
    return this._list;
  }
  public set list(value: LisetItem[]) {
    this._list = value;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('List');

    // Check if the list is empty
    if (typeof storedList !== 'string') return;

    const parsedList: LisetItem[] = JSON.parse(storedList);

    parsedList.forEach((item) => {
      const newListItem = new LisetItem(item.id, item.item, item.checked);
      this.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem('List', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: LisetItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id != id);
    this.save();
  }
}
