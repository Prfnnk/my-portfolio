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
          >
            <a className="nav__item-link" onClick={(e) => handleClick(e, item)}>
              <span className="nav__item-name">{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
