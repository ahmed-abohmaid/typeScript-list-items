import FullList from '../model/FullList';

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  constructor() {
    this.ul = <HTMLUListElement>document.getElementById('listItems');
  }

  clear(): void {
    this.ul.innerHTML = '';
  }

  render(fullList: FullList): void {
    this.clear();

    const fragment = document.createDocumentFragment();
    fullList.list.forEach((item) => {
      const li = <HTMLLIElement>document.createElement('li');
      li.className = 'item';

      const check = <HTMLInputElement>document.createElement('input');
      check.type = 'checkbox';
      check.id = item.id.toString();
      check.checked = item.checked;
      check.tabIndex = 0;
      li.append(check);

      check.addEventListener('change', () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = <HTMLLabelElement>document.createElement('label');
      label.htmlFor = item.id.toString();
      label.textContent = item.item;
      li.append(label);

      const button = <HTMLButtonElement>document.createElement('button');
      button.className = 'button';
      button.textContent = 'X';
      li.append(button);

      button.addEventListener('click', () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      fragment.append(li);
    });
    this.ul.append(fragment);
  }
}
