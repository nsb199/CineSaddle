import {
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";


const Navbar = () => {
  
  return (
    <Box py="4" mb="1" mt="1"  >
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Link to="/">
            <Image
              src={Logo}
              alt="CineSaddle Logo"
              width="219px"
              height="auto"
            />
          </Link>

          {/* DESKTOP  */}

          <Flex gap="7" alignItems={"center"}>
            <ChakraLink
              as={Link}
              to={"/"}
              color="#e56c68"
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "2px",
                backgroundColor: "#e56c68",
                transition: "width 0.3s ease",
              }}
              _hover={{
                _after: {
                  width: "100%",
                },
              }}
            >
              Home
            </ChakraLink>
            <ChakraLink
              as={Link}
              to={"/movies"}
              color="#e56c68"
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "2px",
                backgroundColor: "#e56c68",
                transition: "width 0.3s ease",
              }}
              _hover={{
                _after: {
                  width: "100%",
                },
              }}
            >
              Movies
            </ChakraLink>
            <ChakraLink
              as={Link}
              to={"/shows"}
              color="#e56c68"
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "2px",
                backgroundColor: "#e56c68",
                transition: "width 0.3s ease",
              }}
              _hover={{
                _after: {
                  width: "100%",
                },
              }}
            >
              TV Shows
            </ChakraLink>
            <ChakraLink
              as={Link}
              to={"/search"}
              color="#e56c68"
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0%",
                height: "2px",
                backgroundColor: "#e56c68",
                transition: "width 0.3s ease",
              }}
              _hover={{
                _after: {
                  width: "100%",
                },
              }}
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
