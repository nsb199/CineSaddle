import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

const Protected = ({ children }) => {
  const { user, isLoading, signInWithGoogle } = useAuth();

  if (isLoading) {
    return null; 
  }

  if (!user) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
        bg="#f6e9ca"  
      >
        <VStack spacing={4}>
          <Text 
            color="#e56c68" 
            fontSize="xl" 
            fontWeight="bold"
            textAlign="center"
            textTransform="uppercase"
          >
            Sign In to See and Manage Your Watchlist
          </Text>
          <Button 
            onClick={signInWithGoogle}
            colorScheme="red"
            bg="#e56c68" 
            color="white" 
            size="lg" 
            fontWeight="bold"
            textTransform="uppercase"
            _hover={{
              
              transform: "scale(1.01)",
              boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
            }}
            _active={{
              bg: "#d05c5a",
              transform: "scale(0.98)",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            borderRadius="full"
          >
            Sign In
          </Button>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
