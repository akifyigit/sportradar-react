import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const SearchableSelectBox = ({
  items = [],
  value = "",
  onChange = () => {},
  onSelect = () => {},
  placeholder = "Search",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const selectWrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!selectWrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  const handleSelect = (item) => {
    setInputValue(item.homeTeam?.name + " vs " + item.awayTeam?.name);
    onSelect(item); // will be forwarded to event detail from here
    setIsOpen(false);
  };

  const filteredItems = items.filter((item) => {
    const searchText = inputValue.toLowerCase();
    return (
      item.homeTeam?.name.toLowerCase().includes(searchText) ||
      item.awayTeam?.name.toLowerCase().includes(searchText) ||
      item.sport.toLowerCase().includes(searchText)
    );
  });

  return (
    <div ref={selectWrapperRef} className="w-full relative">
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul className="absolute w-full mt-1 border bg-white max-h-40 overflow-y-auto z-10">
          {filteredItems.length ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item.homeTeam?.name} vs {item.awayTeam?.name} ({item.sport})
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

SearchableSelectBox.propTypes = {
  items: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchableSelectBox;
