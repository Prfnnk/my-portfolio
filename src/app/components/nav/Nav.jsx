import React, { useEffect, useState } from 'react';
import './nav.scss';

const Nav = ({ navArr, entryId, sectionScrollY }) => {
  const [positionObject, setPositionObject] = useState({});

  useEffect(() => {
    setPositionObject(sectionScrollY);
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();
    window.scrollTo({
      top: positionObject[item],
      behavior: 'smooth',
    });
  };
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navArr.map((item) => (
          <li
            className={`nav__item ${entryId === item ? 'nav__item--active' : ''}`}
            key={item}
            onClick={(e) => handleClick(e, item)}
          >
            <p className="nav__item-link">
              <span className="nav__item-name">{item}</span>
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
