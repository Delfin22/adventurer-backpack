//credits to @TheWebSchool for this modal idea

import { useEffect, useState } from "react";
import Button from "./Button";
export default function Modal({
  items,
  modal,
  currentItem,
  onToggleModal,
  onEditItem,
  onAddItem,
}) {
  const [name, setName] = useState(currentItem?.name);
  const [description, setDescription] = useState(currentItem?.description);
  const [price, setPrice] = useState(currentItem?.price);
  const [weight, setWeight] = useState(currentItem?.weight);
  const [img, setImg] = useState(currentItem?.img);
  const id = currentItem?.id;
  //effect to keep in sync popup component
  useEffect(() => {
    setName(currentItem?.name);
    setDescription(currentItem?.description);
    setPrice(currentItem?.price);
    setWeight(currentItem?.weight);
    setImg(currentItem?.img);
  }, [currentItem]);
  //simple function to get exclusive id - normally this should be fetched from database
  function getNewId() {
    const id = items.reduce((acc, curr) => Math.max(acc, curr.id), 0);
    return id + 1;
  }
  //this function allows user to confirm adding items using button and enter.
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !weight || !img) {
      alert("Wypełnij wszystkie pola!");
      return;
    }
    const newItem = {
      id: !currentItem ? getNewId() : id,
      name: name,
      description: description,
      img: img,
      price: price,
      weight: weight,
    };

    onToggleModal();
    currentItem ? onEditItem(id, newItem) : onAddItem(newItem);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={onToggleModal} className="overlay"></div>
          <div className="modal-content" onSubmit={handleSubmit}>
            <div>
              <h1>Szczegóły Przedmiotu</h1>
            </div>

            <form className="modal-form">
              <input
                type="Text"
                placeholder="Nazwa przedmiotu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="Text"
                placeholder="Opis przedmiotu"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="Text"
                placeholder="Zdjęcie przedmiotu (url)"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <input
                type="Text"
                placeholder="Cena przedmiotu"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <input
                type="Text"
                placeholder="Waga przedmiotu"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
              <div>
                <Button>Zapisz</Button>
                <Button onClick={onToggleModal}>Anuluj</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
