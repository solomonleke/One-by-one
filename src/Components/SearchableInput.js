import React, { useState } from 'react';
import { Box, Input, List, ListItem, Text } from '@chakra-ui/react';

const SearchableInput = ({ label, value, id, onChange, options, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    if (query.length > 0) {
      const filtered = options.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsListVisible(true);
    } else {
      setFilteredOptions([]);
      setIsListVisible(false);
    }
  };

  const handleOptionClick = (option) => {
    setInputValue(option.name);
    onChange({ target: { id, value: option } });
    setFilteredOptions([]);
    setIsListVisible(false);
  };

  return (
    <Box position="relative">
      <Text mb="2">{label}</Text>
      <Input
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => {
          if (inputValue) {
            setIsListVisible(true);
            setFilteredOptions(options.filter((option) =>
              option.name.toLowerCase().includes(inputValue.toLowerCase())
            ));
          }
        }}
        onBlur={() => setTimeout(() => setIsListVisible(false), 200)}
      />
      {isListVisible && filteredOptions.length > 0 && (
        <List
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="white"
          border="1px solid #ccc"
          borderRadius="md"
          zIndex="1000"
          maxH="200px"
          overflowY="auto"
        >
          {filteredOptions.map((option) => (
            <ListItem
              key={option.id}
              p="2"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              onMouseDown={() => handleOptionClick(option)}
            >
              {option.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchableInput;
