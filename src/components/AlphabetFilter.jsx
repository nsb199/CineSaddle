import { Button, Flex } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const AlphabetFilter = ({ setAlphabetFilter }) => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <Flex wrap="wrap" gap="2" mb="4">
      {alphabets.map((letter) => (
        <Button
          key={letter}
          onClick={() => setAlphabetFilter(letter)}
          fontWeight="bold"
          bg="#f6e9ca"
          color="#e56c68"
          _hover={{ bg: "#e56c68", color: "#f6e9ca" }}
          transition="all 0.3s ease"
        >
          {letter}
        </Button>
      ))}
      <Button
        onClick={() => setAlphabetFilter("1-9")}
        fontWeight="bold"
        bg="#f6e9ca"
        color="#e56c68"
        _hover={{ bg: "#e56c68", color: "#f6e9ca" }}
        transition="all 0.3s ease"
      >
        1-9
      </Button>
    </Flex>
  );
};

AlphabetFilter.propTypes = {
  setAlphabetFilter: PropTypes.func.isRequired,
};

export default AlphabetFilter;
