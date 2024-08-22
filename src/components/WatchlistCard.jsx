import {
    Box,
    Flex,
    Heading,
    IconButton,
    Image,
    Text,
    Tooltip,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { imagePath } from "../services/api";
  import { useFirestore } from "../services/firestore";
  import { useAuth } from "../context/useAuth";
  import { CheckIcon, StarIcon } from "@chakra-ui/icons";
  
  const WatchlistCard = ({ type, item, setWatchlist }) => {
    const { removeFromWatchlist } = useFirestore();
    const { user } = useAuth();
  
    const handleRemoveClick = (event) => {
      event.preventDefault(); // Prevent the default behavior (link redirection)
      removeFromWatchlist(user?.uid, item.id).then(() => {
        setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
      });
    };
  
    return (
      <Flex
        gap="4"
        borderRadius="20px"
        overflow="hidden"
        bg={"#ffe9ca   "}
        boxShadow="md"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.01)",
          transition: "all 0.3s ease",
        }}
        position="relative"
        p="4"
 
      >
        <Box position={"relative"} w={"150px"} cursor="pointer">
          <Link to={`/${type}/${item.id}`}>
            <Image
              src={`${imagePath}/${item.poster_path}`}
              alt={item.title}
              height={"200px"}
              minW={"150px"}
              objectFit={"cover"}
              borderRadius="20px"
            />
          </Link>
        </Box>
  
        <Box flex="1">
          <Link to={`/${type}/${item.id}`}>
            <Heading
              fontSize={{ base: 'sm', md: "2xl" }}
              color="#e56c68"
              fontWeight="bold"
              noOfLines={1}
            >
              {item?.title || item?.name}
            </Heading>
          </Link>
          <Heading
            fontSize={"sm"}
            color={"#d9534f"}
            mt="2"
            fontWeight="semibold"
          >
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} color="#f0ad4e" />
            <Text textAlign={"center"} fontSize="small" color="#f0ad4e" fontWeight="bold">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: "xs", md: "sm" }} color="gray.500" noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
  
        <Tooltip label="Remove from watchlist">
  <IconButton
    borderRadius={"50%"}
    border={"1px solid #ef9c9d"}
    aria-label="Remove from watchlist"
    icon={<CheckIcon fontSize={"md"} />}
    size={"lg"}
    colorScheme="green"
    position={"absolute"}
    zIndex={"999"}
    top="9"
    right="4"
    onClick={handleRemoveClick}
    _hover={{
      bg: "green.300",
      color: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", 
      transform: "scale(1.1)", 
    }}
    transition="all 0.3s ease" 
  />
</Tooltip>


      </Flex>
    );
  };
  
  export default WatchlistCard;
  