import Button from "./Button";
import Icon from "./Icon";

export default function Inventory({
  items,
  onDeleteAllItems,
  onCurrentItem,
  toggleModal,
}) {
  return (
    <div className="backpack">
      <div className="inventory">
        {/* iterate through items array to dynamically display every item in the inventory */}
        {items &&
          items.map((i) => (
            <Icon
              src={i.img}
              alt={i.name}
              onClick={() => onCurrentItem(i)}
              key={i.id}
            />
          ))}
      </div>
      <div className="control-panel">
        <Button
          onClick={() => {
            onCurrentItem(null);

            toggleModal();
          }}
        >
          Dodaj przedmiot
        </Button>
        <Button onClick={onDeleteAllItems}>Wyczysc plecak</Button>
      </div>
    </div>
  );
}
