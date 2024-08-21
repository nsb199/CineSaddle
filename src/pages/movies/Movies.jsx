import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
  Box,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";


const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const cardsRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage)
      .then((res) => {
        console.log(res, "res");
        setMovies(res?.results);
        setActivePage(res?.page)
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false));
  }, [activePage]);



  useEffect(() => {
    if (cardsRef.current) {
      const children = Array.from(cardsRef.current.children);
      children.forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [movies, animate]);



  return (
    <Container maxW={"container.xl"}>
      <Heading
        as="h2"
        fontSize={"xl"}
        textTransform={"uppercase"}
        color="#e56c68"
        mt={"7"}
        mb={"7"}

      >
        Discover Movies
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={"7"}
        mb={"160px"}
        ref={cardsRef}
      >
        {movies && movies.map((item, i) => (
          isLoading ? (
            <Skeleton height={"400px"} width={"100%"} borderRadius={"20px"} borderWidth={"1px"} key={i} startColor="#ef9c9d" endColor="#f3c1b4" />
          ) : (
            <Box
              key={item?.id}
              className={`card-wrapper ${animate ? 'card-appear' : ''}`}
            >
              <CardComponent item={item} type={'movie'} />
            </Box>
          )
        ))}
      </Grid>

{/* Pagination */}



            


    </Container>
  );
};

export default Movies;
