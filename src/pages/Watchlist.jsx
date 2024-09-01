import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import WatchlistCard from "../components/WatchlistCard";
import BackToTopButton from "../utils/backtotop";

const Watchlist = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
          setFilteredWatchlist(data);
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredWatchlist(watchlist);
    } else {
      setFilteredWatchlist(watchlist.filter(item => item.type === filter));
    }
  }, [filter, watchlist]);

  const getCountText = () => {
    const movieCount = watchlist.filter(item => item.type === "movie").length;
    const tvShowCount = watchlist.filter(item => item.type === "tv").length;

    if (filter === "all") {
      return `${movieCount} ${movieCount === 1 ? "movie" : "movies"} & ${tvShowCount} ${tvShowCount === 1 ? "TV show" : "TV shows"} in watchlist`;
    } else if (filter === "movie") {
      return `${movieCount} ${movieCount === 1 ? "movie" : "movies"} in watchlist`;
    } else if (filter === "tv") {
      return `${tvShowCount} ${tvShowCount === 1 ? "TV show" : "TV shows"} in watchlist`;
    }
    return "";
  };

  return (
    <Container maxW={"container.xl"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="baseline"
        gap={{ base: "4", md: "5" }}
        my={{ base: "4", md: "7" }}
      >
        <Heading
          as="h2"
          fontSize={{ base: "lg", sm: "xl" }}
          textTransform="uppercase"
          color="#e56c68"
        >
          Your Watchlist
        </Heading>

        <Flex
          alignItems="center"
          gap={{ base: "1", sm: "2" }}
          border="1px solid transparent"
          borderRadius="20px"
          boxShadow="0 0 1px #e87c79, 0 0 0 1px #e87c79"
          _hover={{ boxShadow: "0 0 4px 2px #e87c79" }}
          transition="background-color 0.61s ease, box-shadow 0.3s ease"
          position="relative"
          mb={{ base: "4", md: "0" }}
          overflowX="auto"
        >
          <Box
            as="button"
            px={{ base: "2", sm: "3" }}
            py={{ base: "0.5", sm: "1" }}
            borderRadius="20px"
            color="#8e6f6f"
            fontWeight="semibold"
            fontSize={{ base: "sm", sm: "md" }}
            bg={filter === "all" ? "#f3c1b4" : ""}
            onClick={() => setFilter("all")}
            transition="background-color 0.61s ease, box-shadow 0.3s ease"
            position="relative"
            overflow="hidden"
          >
            All
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              height="100%"
              bg="#f3c1b4"
              borderRadius="20px"
              zIndex="-1"
              transition="transform 0.61s ease"
              transform={filter === "all" ? "translateX(0)" : "translateX(100%)"}
            />
          </Box>
          <Box
            as="button"
            px={{ base: "2", sm: "3" }}
            py={{ base: "0.5", sm: "1" }}
            borderRadius="20px"
            color="#8e6f6f"
            fontWeight="semibold"
            fontSize={{ base: "sm", sm: "md" }}
            bg={filter === "movie" ? "#f3c1b4" : ""}
            onClick={() => setFilter("movie")}
            transition="background-color 0.61s ease, box-shadow 0.3s ease"
            position="relative"
            overflow="hidden"
          >
            Movies
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              height="100%"
              bg="#f3c1b4"
              borderRadius="20px"
              zIndex="-1"
              transition="transform 0.61s ease"
              transform={filter === "movie" ? "translateX(0)" : "translateX(100%)"}
            />
          </Box>
          <Box
            as="button"
            px={{ base: "2", sm: "3" }}
            py={{ base: "0.5", sm: "1" }}
            borderRadius="20px"
            color="#8e6f6f"
            fontWeight="semibold"
            fontSize={{ base: "sm", sm: "md" }}
            bg={filter === "tv" ? "#f3c1b4" : ""}
            onClick={() => setFilter("tv")}
            transition="background-color 0.61s ease, box-shadow 0.3s ease"
            position="relative"
            overflow="hidden"
          >
            TV Shows
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              height="100%"
              bg="#f3c1b4"
              borderRadius="20px"
              zIndex="-1"
              transition="transform 0.61s ease"
              transform={filter === "tv" ? "translateX(0)" : "translateX(-100%)"}
            />
          </Box>
        </Flex>
      </Flex>

      {/* Watchlist Count */}
      {filteredWatchlist.length > 0 && (
  <Box mb={1} mr={3}>
    <Text color="#e56c68" fontSize={"small"} textAlign={"right"} fontWeight="semibold">
      {getCountText()}
    </Text>
  </Box>
)}

      {isLoading && (
        <Flex
          justify={"center"}
          alignItems={"center"}
          direction={"column"}
          height={"100vh"}
        >
          <Spinner size={"xl"} color="#e56c68" />
        </Flex>
      )}
      {!isLoading && filteredWatchlist.length === 0 && (
        <Flex
          justify={"center"}
          alignItems={"center"}
          direction={"column"}
          height={"100vh"}
        >
          <Heading as="h2" color={"#eb8c8b"} fontSize={"md"} textTransform={"uppercase"}>
          UHH OHH !! nothing here...
          </Heading>
          <Button
            onClick={() => navigate('/search')}
            colorScheme="teal"
            size="md"
            borderRadius="30px"
            px="8"
            py="4"
            mt={"4"}
            bg="#e56c68"
            color="white"
            _hover={{ 
              bg: "#d14e4a",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
              transform: "scale(1.01)"
            }}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
            transition="all 0.3s ease"
          >
            Add Something
          </Button>
        </Flex>
      )}
      {!isLoading && filteredWatchlist.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"5"}
        >
          {filteredWatchlist?.map((item) => (
            <WatchlistCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
      <BackToTopButton />
    </Container>
  );
};

export default Watchlist;
