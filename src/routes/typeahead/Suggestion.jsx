import PropTypes from 'prop-types';

const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
  selectedItem,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.name.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.length > 0 &&
        suggestions.map((suggestion, index) => {
          const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
          return (
            <li
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className={
                selectedItem === index
                  ? "suggestion-item active"
                  : "suggestion-item"
              }
            >
              {getHighlightedText(currSuggestion, highlight)}
            </li>
          );
        })}
    </>
  );
};

SuggestionList.propTypes = {
  suggestions: PropTypes.array,
  highlight: PropTypes.string,
  dataKey: PropTypes.string,
  onSuggestionClick: PropTypes.func,
  selectedItem: PropTypes.number,
};

export default SuggestionList;
