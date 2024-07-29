export default function BottomSummary({ items }) {
  const numItems = items?.length;
  function calculateWeight() {
    if (!items) return;
    return items.reduce((acc, curr) => (acc += Number(curr.weight)), 0);
  }
  function bottomText() {
    if (!numItems) {
      return (
        <em>
          Nie masz jeszcze żadnych przedmiotów. Dodaj pierwszy korzystając z
          przycisku!
        </em>
      );
    }
    return (
      <em>
        Masz łącznie {numItems}
        {numItems === 1
          ? " przedmiot "
          : numItems < 5
          ? " przedmioty "
          : " przedmiotów "}
        o {numItems !== 1 ? "łącznej " : ""}
        wadze {calculateWeight()}
      </em>
    );
  }
  return <footer className="summary">{bottomText()}</footer>;
}
