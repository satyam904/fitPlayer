import "./ChipSection.css";

const chipsList = [
  { id: 1, name: "All" },
  { id: 2, name: "Weightlifting" },
  { id: 3, name: "Yoga" },
  { id: 4, name: "Diet" },
  { id: 5, name: "Zumba" },
];

export const ChipSection = ({ selectCategory, setSelectCategory }) => {
  return (
    <>
      {chipsList.map(({ id, name }) => {
        return (
          <div
            onClick={() => setSelectCategory(name)}
            className={`chip cursor-pointer mx-2 ${
              selectCategory === name && "chip-active"
            }`}
            key={id}
          >
            {name}
          </div>
        );
      })}
    </>
  );
};
