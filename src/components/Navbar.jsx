import {
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  IconButton,
  Avatar,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { useEffect } from "react";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const { onOpen, isOpen, onClose } = useDisclosure();

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

          <Flex
            gap="7"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
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
                    >
                      Watchlist
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={handleLogout}
                    _hover={{ bg: "#e56c68", color: "white" }}
                    fontWeight="semibold"
                    bg="#f6e9ca"
                  >
                    Log Out
                  </MenuItem>
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

          {/* Mobile Screens  */}

          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <Search2Icon
                boxSize={6}
                color="#e56c68"
                fontWeight="semibold"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.1)",
                  color: "red.500",
                }}
                verticalAlign="middle"
              />
            </Link>
            <IconButton
              onClick={onOpen}
              icon={
                <HamburgerIcon
                  boxSize={7}
                  color="#e56c68"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.1)",
                    color: "red.500",
                  }}
                />
              }
              aria-label="Open menu"
              variant="ghost"
              display="flex"
              alignItems="center" // This ensures the icon is centered
            />

            <Drawer isOpen={isOpen} placement="right"  onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"#e6736e"} borderRadius={"20px"} border={"1px solid #f6e9ca"} >
                <DrawerCloseButton fontSize={"md"} color={"#f6e9ca"} mt={"2"} mr={"1"} />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar
                        bg={"red.500"}
                        color={"white"}
                        size={"md"}
                        name={user?.displayName}
                        src={user?.photoURL}
                      />
                      <Box fontSize={"md"} fontWeight={"bold"} ml={"2"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"md"}
                      bg={"#eb8c8b"}
                      border={"2px solid  "}
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex
                    flexDirection={"column"}
                    gap={"25"}
                    fontSize={"md"}
                    fontWeight={"semibold"}
                    onClick={onClose}
                  >
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                    {user && (
                      <>
                        <Link to="/watchlist">Watchlist</Link>
                        <Button
                          variant={"solid"}
                          backgroundColor="#f6e9ca" 
                          color="#e87c79"
                          onClick={logout}
                          borderRadius={"20px"}
                          fontSize={"md"}
                          fontWeight={"bold"}
                          border="2px solid white" 
                          boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
                          transition="transform 0.3s ease, box-shadow 0.3s ease"
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
