const HobbyItem = ({ hobby }) => {
  return (
    <div
      className={`hobbies__item hobbies__item--${hobby.title.toLowerCase()}`}
    >
      <div className="hobbies__inner">
        <strong className="hobbies__item-title">{hobby.title}</strong>
        <p className="hobbies__item-description">{hobby.description}</p>
      </div>
    </div>
  );
};

export default HobbyItem;
