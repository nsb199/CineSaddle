import {
  Box,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { CheckIcon } from "@chakra-ui/icons";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = (event) => {
    event.stopPropagation(); 
    event.preventDefault();
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Box
      position={"relative"}
      borderRadius="20px"
      overflow="hidden"
      borderWidth="1px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      _hover={{
        transform: "translateY(-10px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
        zIndex: "10",
        "& .overlay": {
          opacity: 1,
        },
      }}
    >
      {/* Link to detailed view */}
      <Link to={`/${type}/${item.id}`}>
        <Image
          src={`${imagePath}/${item.poster_path}`}
          alt={item.title || item.name}
          borderRadius="20px"
          objectFit="cover"
          height={"100%"}
          width={"100%"}
        />
      </Link>

      {/* Overlay with Title and Release Year */}
      <Box
        className="overlay"
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        width={"100%"}
        height={{ base: "30%", sm: "20%" }}
        bg={"rgba(229, 108, 104, 1)"} // Background color for the overlay
        opacity={"0"}
        transition={"opacity 0.4s ease-in-out"}
        p="2"
      >
        <Text
          color="#f6e9ca"
          fontWeight="bold"
          fontSize={{ base: "x-small", sm: "x-small", md: "small" }} 
          textAlign={"center"}
        >
          {item?.title || item?.name}
        </Text>
        <Text
          textAlign={"center"}
          fontSize={{ base: "xx-small", sm: "x-small", md: "small" }} 
          fontWeight={"semibold"}
          color={"green.200"}
          display={{ base: "none", sm: "block" }}
        >
          {new Date(item?.release_date || item?.first_air_date).getFullYear() || "N/A"}
        </Text>
      </Box>

      {/* Remove from Watchlist Button */}
      <Tooltip label="Remove from watchlist">
        <IconButton
          borderRadius={"50%"}
          border={"1px solid #ef9c9d"}
          aria-label="Remove from watchlist"
          icon={<CheckIcon fontSize={"md"} />}
          size={"md"}
          colorScheme="green"
          position={"absolute"}
          zIndex={"2"} 
          top="3"
          right="3"
          onClick={handleRemoveClick}
          _hover={{
            bg: "green.300",
            color: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            transform: "scale(1.2)",
          }}
          transition="all 0.3s ease"
        />
      </Tooltip>
    </Box>
  );
};

export default WatchlistCard;
