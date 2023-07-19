import './css/style.css';
import FullList from './model/FullList';
import LisetItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = new FullList();
  const template = new ListTemplate(
    <HTMLUListElement>document.getElementById('listItems')
  );

  const formElement = <HTMLFormElement>document.getElementById('itemEntryForm');
  const clearBtn = <HTMLButtonElement>(
    document.getElementById('clearItemsButton')
  );
  const addInput = <HTMLInputElement>(
    document.querySelector('.newItemEntry__input')
  );

  formElement.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();

    const inputValue: string = addInput.value;
    if (!inputValue.length) return;

    const itemId: number = fullList.list.length
      ? fullList.list[fullList.list.length - 1].id + 1
      : 1;
    const listItem = new LisetItem(itemId, inputValue);

    fullList.addItem(listItem);
  });

  clearBtn.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
