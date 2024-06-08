
import PropTypes from 'prop-types';

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import SuggestionList from "./Suggestion";
import { debounce } from "lodash";

function TypeAhead({
  placeholder,
  customStyles,
  onChange,
  staticData,
  fetchSuggestions,
  customLoading,
  dataKey,
  onSelect,
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleChange = (e) => {
    const inputValue = e.target.value.trim();
    setValue(inputValue);
    onChange(inputValue);
  };

  const getSuggestions = useCallback(
    async (query) => {
      setError("");
      setLoading(true);

      try {
        let result = [];
        if (staticData.length > 0) {
          result = staticData.filter((item) =>
            item.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
          );
        } else if (fetchSuggestions) {
          result = await fetchSuggestions(query);
        }
        if (result !== undefined && Array.isArray(result)) {
          setSuggestions(result);
        }
      } catch (error) {
        setError("Failed to fetch sugesstions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchSuggestions, staticData],
  );

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    [getSuggestions],
  );

  useEffect(() => {
    if (value.length > 2) {
      getSuggestionsDebounced(value);
    } else {
      setSuggestions([]);
    }
  }, [getSuggestions, getSuggestionsDebounced, value]);

  const handleSuggestionClick = (suggestion) => {
    setValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (e.key === "ArrowDown" && selectedItem < suggestions.length - 1) {
      setSelectedItem((prev) => prev + 1);
    }
  };

  return (
    <div id="typeahead">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={customStyles}
        onKeyDown={handleKeyDown}
      />
      {loading && <div className="loading">{customLoading}</div>}
      {error && <div>Error: {error}</div>}
      <ul className="suggestions-list">
        <SuggestionList
          dataKey={dataKey}
          highlight={value}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          selectedItem={selectedItem}
        />
      </ul>
    </div>
  );
}

function TypeAheadComponent() {

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`,
    );
    console.log(" response ", response);

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }

    const result = await response.json();
    console.log(result);
    return result.recipes;
  };
  const handleFocus = () => {};
  const handleBlur = () => {};
  const handleSelect = () => {};
  const handleChange = () => {};

  return (
    <TypeAhead
      placeholder={"type a recipe"}
      staticData={[]}
      fetchSuggestions={fetchSuggestions}
      dataKey={""}
      customLoading={<>Loading recipes...</>}
      onSelect={handleSelect}
      onChange={(val) => handleChange(val)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      customStyles={{}}
    />
  );
}

TypeAhead.propTypes = {
  placeholder: PropTypes.string.isRequired,
  staticData: PropTypes.arrayOf(PropTypes.string),
  fetchSuggestions: PropTypes.func,
  dataKey: PropTypes.string,
  customLoading: PropTypes.element,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  customStyles: PropTypes.object,
}

export default TypeAheadComponent;
