import { useState } from "react";
import { initialItems } from "./resources/initial_items";
import Logo from "./components/Logo";
import ItemDescription from "./components/ItemDescription";
import BottomSummary from "./components/BottomSummary";
import Inventory from "./components/Inventory";
import Modal from "./components/Modal";

export default function App() {
  const [items, setItems] = useState(initialItems); //Actual array of items in the backpack
  const [currentItem, setCurrentItem] = useState(null); //Current item displayed in the top of the page
  const [modal, setModal] = useState(false); //Popup window to updating items array

  const toggleModal = () => {
    //function to change visibility of popup component
    console.log(currentItem);
    setModal(!modal);
  };

  function handleDeleteItem(id) {
    const confirmed = window.confirm("Na pewno chcesz usunąć ten przedmiot?");
    if (confirmed) {
      setItems(items.filter((i) => i.id !== id));
      setCurrentItem(null);
    }
  }

  function handleEditItem(id, newItem) {
    setItems(items.map((i) => (i.id === id ? newItem : i)));
    setCurrentItem(newItem);
  }

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Na pewno chcesz usunąć wszystkie przedmioty z plecaka?"
    );
    setCurrentItem(null);
    if (confirmed) setItems(null);
  }

  return (
    // conditionally selecting page proportion based of visibility of item description component
    <div className={currentItem ? "app app-if-description-open" : "app"}>
      <Modal //popup function
        items={items}
        modal={modal}
        currentItem={currentItem}
        onToggleModal={toggleModal}
        onEditItem={handleEditItem}
        onCurrentItem={setCurrentItem}
        onAddItem={handleAddItem}
        key={currentItem?.id}
      />
      <Logo />
      <ItemDescription
        currentItem={currentItem}
        onCurrentItem={setCurrentItem}
        onDeleteItem={handleDeleteItem}
        onEditItem={handleEditItem}
        modal={modal}
        toggleModal={toggleModal}
      />
      <Inventory
        items={items}
        onDeleteAllItems={handleDeleteAllItems}
        onCurrentItem={setCurrentItem}
        modal={modal}
        toggleModal={toggleModal}
      />
      <BottomSummary items={items} />
    </div>
  );
}
