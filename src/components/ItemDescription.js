import Icon from "./Icon";
import Button from "./Button";
export default function ItemDescription({
  currentItem,
  onCurrentItem,
  onDeleteItem,
  toggleModal,
}) {
  if (!currentItem) return; //if there is no item selected from inventory whole componend won't be visible
  return (
    <div className="item-description">
      <div className="item-picture">
        <Icon src={currentItem.img} alt={currentItem.name} />
      </div>
      <div className="item-description-text">
        <h1>{currentItem.name}</h1>
        <p>{currentItem.description}</p>
        <ul>
          <li>Waga: {currentItem.weight}</li>
          <li>Cena: {currentItem.price}</li>
        </ul>
      </div>
      <div className="item-controll-panel">
        <Button onClick={() => onDeleteItem(currentItem.id)}>
          Usuń przedmiot
        </Button>
        <Button onClick={toggleModal}>Edytuj przedmiot</Button>
        <Button onClick={() => onCurrentItem(null)}>Zamknij szczegóły</Button>
      </div>
    </div>
  );
}
