import { Box, Container, Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Link to="/">
            <Image
              src={Logo}
              alt="CineSaddle Logo"
              width="160px"
              height="auto"
            />
          </Link>

          {/* DESKTOP */}
          <Flex gap="4" alignItems={"center"}>
            <ChakraLink
              as={Link}
              to={"/"}
              color="#e56c68"
              _hover={{ textDecoration: "none" }} // Remove underline on hover
            >
              Home
            </ChakraLink>
            <ChakraLink
              as={Link}
              to={"/movies"}
              color="#e56c68"
              _hover={{ textDecoration: "none" }} // Remove underline on hover
            >
              Movies
            </ChakraLink>
            <ChakraLink
              as={Link}
              to={"/shows"}
              color="#e56c68"
              _hover={{ textDecoration: "none" }} // Remove underline on hover
            >
              TV Shows
            </ChakraLink>
            <ChakraLink
              as={Link}
              to={"/search"}
              color="#e56c68"
              _hover={{ textDecoration: "none" }} // Remove underline on hover
            >
              Search
            </ChakraLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
