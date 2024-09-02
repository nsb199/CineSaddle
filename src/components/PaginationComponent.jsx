import { Button, Flex, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';


const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <Flex mb={"50px"} gap={"2"} alignItems={"center"}>
 <Flex gap={"2"} maxW={"250px"} my={"10"}>
  <Button
    onClick={() => setActivePage(activePage - 1)}
    isDisabled={activePage === 1}
    fontWeight="bold"
    bg="#f6e9ca"
    color={"#e56c68"}
    transition="all 0.5s ease"
    _hover={{
      color: "#f6e9ca", 
      bg: "#e56c68",
      transition: "all 0.3s ease",
    }}
  >
    Prev
  </Button>
  <Button
    onClick={() => setActivePage(activePage + 1)}
    isDisabled={activePage === totalPages}
    fontWeight="bold"
    bg="#f6e9ca"
    color={"#e56c68"}
    transition="all 0.5s ease"
    _hover={{
      color: "#f6e9ca", 
      bg: "#e56c68",
      transition: "all 0.3s ease",
    }}
  >
    Next
  </Button>
</Flex>


  <Flex gap={"1"}>
    <Text fontWeight="bsemiold" color="#e56c68">
      {activePage}
    </Text>
    <Text fontWeight="semibold" color="#e56c68">
      of
    </Text>
    <Text fontWeight="semibold" color="#e56c68">
      {totalPages}
    </Text>
  </Flex>
</Flex>

  
  )
};

PaginationComponent.propTypes = {
    activePage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setActivePage: PropTypes.func.isRequired,
    
};

export default PaginationComponent