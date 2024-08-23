import {
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { ChevronDownIcon } from "@chakra-ui/icons";
import BackToTopButton from "../../utils/backtotop";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);
  const cardsRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        console.log(res, "res");
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  useEffect(() => {
    if (cardsRef.current) {
      const children = Array.from(cardsRef.current.children);
      children.forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [movies, animate]);

  // Function to get the display text based on sortBy value
  const getSortLabel = () => {
    switch (sortBy) {
      case "popularity.desc":
        return "Popular";
      case "vote_average.desc&vote_count.gte=1000":
        return "Top Rated";
      default:
        return "Sort By";
    }
  };

  // Handler for sorting option changes
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setActivePage(1); // Reset page to 1 when sorting changes
  };

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"7"}>
        <Heading
          as="h2"
          fontSize={"xl"}
          textTransform={"uppercase"}
          color="#e56c68"
        >
          Discover Movies
        </Heading>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg="#ef9c9d"
            color="white"
            borderRadius="10px"
            fontWeight="bold"
            _hover={{ bg: "#d14e4a" }}
            _expanded={{
              transform: "scale(1.05)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
             
            }}
            transition="all 0.5s ease"
          >
            <Text>{getSortLabel()}</Text>
          </MenuButton>
          <MenuList
            bg="#f6e9ca"
            fontWeight="semibold"
            color="#e56c68"
            borderRadius="10px"
            border="none"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          >
            <MenuItem
              onClick={() => handleSortChange("popularity.desc")}
              _hover={{ bg: "#e56c68", color: "white" }}
              fontWeight="semibold"
              bg="#f6e9ca"
            >
              Popular
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleSortChange("vote_average.desc&vote_count.gte=1000")
              }
              _hover={{ bg: "#e56c68", color: "white" }}
              fontWeight="semibold"
              bg="#f6e9ca"
            >
              Top Rated
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(2,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={"7"}
        mb={"160px"}
        ref={cardsRef}
      >
        {movies &&
          movies.map((item, i) =>
            isLoading ? (
              <Skeleton
              height={{ base: "220px", md: "400px" }}
                width={"100%"}
                borderRadius={"20px"}
                borderWidth={"1px"}
                key={i}
                startColor="#ef9c9d"
                endColor="#f3c1b4"
              />
            ) : (
              <Box
                key={item?.id}
                className={`card-wrapper ${animate ? "card-appear" : ""}`}
              >
                <CardComponent item={item} type={"movie"} />
              </Box>
            )
          )}
      </Grid>

      {/* Pagination */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
      <BackToTopButton />
    </Container>
  );
};

export default Movies;
