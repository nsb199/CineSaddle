import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { searchData } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import BackToTopButton from "../../utils/backtotop";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const cardsRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true);
      searchData(searchValue, activePage)
        .then((res) => {
          setData(res?.results);
          setActivePage(res?.page);
          setTotalPages(res?.total_pages);
        })
        .catch((err) => console.log(err, "err"))
        .finally(() => setIsLoading(false));
    }
  }, [searchValue, activePage]);

  useEffect(() => {
    if (tempSearchValue === "") {
      setSearchValue(""); // Clear searchValue to reset data
      setData([]);
      setHasSearched(false); // Reset hasSearched state
    }
  }, [tempSearchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
    setActivePage(1); // Reset to page 1 on search
    setHasSearched(true); // Set hasSearched to true on search
  };

  useEffect(() => {
    if (cardsRef.current) {
      const children = Array.from(cardsRef.current.children);
      children.forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [data, animate]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"5"} my={"7"}>
        <Heading
          as="h2"
          fontSize={"xl"}
          textTransform={"uppercase"}
          color="#e56c68"
        >
          Search
        </Heading>
      </Flex>

      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search Movies, TV Show..."
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
          bg="#f6e9ca"
          color="#e56c68"
          borderColor="#e56c68"
          borderRadius="10px"
          _placeholder={{ color: "#e56c68" }}
          _focus={{
            borderColor: "#d14e4a",
            boxShadow: "0 0 0 1px #d14e4a",
            transition: "all 0.3s ease",
          }}
          _hover={{
            borderColor: "#d14e4a",
            transition: "all 0.3s ease",
          }}
          transition="all 0.3s ease"
        />
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt={"10"}>
          <Spinner size={"xl"} color="#e56c68" />
        </Flex>
      )}

      {hasSearched && data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} color={"#e87c79"} as={"h3"} fontSize={"lg"} mt={"10"}>
          No Results Found
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "repeat(2,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={"7"}
        mb={"160px"}
        mt={"8"}
        ref={cardsRef}
      >
        {data?.length > 0 &&
          !isLoading &&
          data.map((item, i) =>
            isLoading ? (
              <Skeleton
                height={"400px"}
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
                <CardComponent item={item} type={item?.media_type} />
              </Box>
            )
          )}
      </Grid>

      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}

      <BackToTopButton />
    </Container>
  );
};

export default Search;
