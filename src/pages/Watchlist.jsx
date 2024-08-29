import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner, Box } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";
import BackToTopButton from "../utils/backtotop";

const Watchlist = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'movie', or 'tv'

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

  return (
    <Container maxW={"container.xl"}>
      
      <Flex
  direction={{ base: "column", md: "row" }} // Stack items vertically on small screens, horizontally on medium and larger screens
  alignItems="baseline"
  gap={{ base: "4", md: "5" }} // Adjust gap for smaller screens
  my={{ base: "4", md: "7" }} // Adjust margin for smaller screens
>
  <Heading
    as="h2"
    fontSize={{ base: "lg", sm: "xl" }} // Make font size smaller on small screens
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
    mb={{ base: "4", md: "0" }} // Adjust margin bottom for smaller screens
    overflowX="auto" // Allow horizontal scrolling if needed
  >
    <Box
      as="button"
      px={{ base: "2", sm: "3" }}
      py={{ base: "0.5", sm: "1" }}
      borderRadius="20px"
      color="#8e6f6f"
      fontWeight="semibold"
      fontSize={{ base: "sm", sm: "md" }} // Make font size smaller on small screens
      bg={filter === 'all' ? "#f3c1b4" : ""}
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
        transform={filter === 'all' ? "translateX(0)" : "translateX(100%)"}
      />
    </Box>
    <Box
      as="button"
      px={{ base: "2", sm: "3" }}
      py={{ base: "0.5", sm: "1" }}
      borderRadius="20px"
      color="#8e6f6f"
      fontWeight="semibold"
      fontSize={{ base: "sm", sm: "md" }} // Make font size smaller on small screens
      bg={filter === 'movie' ? "#f3c1b4" : ""}
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
        transform={filter === 'movie' ? "translateX(0)" : "translateX(100%)"}
      />
    </Box>
    <Box
      as="button"
      px={{ base: "2", sm: "3" }}
      py={{ base: "0.5", sm: "1" }}
      borderRadius="20px"
      color="#8e6f6f"
      fontWeight="semibold"
      fontSize={{ base: "sm", sm: "md" }} // Make font size smaller on small screens
      bg={filter === 'tv' ? "#f3c1b4" : ""}
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
        transform={filter === 'tv' ? "translateX(0)" : "translateX(-100%)"}
      />
    </Box>
  </Flex>
</Flex>

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
            Watchlist is empty
          </Heading>
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
