import {
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAuth } from "../context/useAuth";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect } from "react";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload(); // Reload the page after logout
    } catch (error) {
      console.log("err", error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     console.log("User:", user);
  //   }
  // }, [user]);

  return (
    <Box py="4" mb="1" mt="1">
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
              position="relative"
              display="flex"
              alignItems="center"
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
              
            >
              <Search2Icon
                boxSize={6} 
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.1)",
                }}
                verticalAlign="middle" 
              />
            </ChakraLink>

            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.displayName}
                    src={user?.photoURL} 
                  />
                </MenuButton>
                <MenuList
                bg="#f6e9ca"
                fontWeight="semibold"
                color="#e56c68"
                borderRadius="10px"
                border="none"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                >
                  <Link to="/watchlist">
                    <MenuItem
                     _hover={{ bg: "#e56c68", color: "white" }}
                     fontWeight="semibold"
                     bg="#f6e9ca"
                    >Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}
                   _hover={{ bg: "#e56c68", color: "white" }}
                   fontWeight="semibold"
                   bg="#f6e9ca"
                  >Log Out</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={"sm"}
                bg={"#eb8c8b"}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>
        </Flex>
        
      </Container>
    </Box>
  );
};

export default Navbar;
