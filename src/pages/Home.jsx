import { useEffect } from "react";
import { Container, Heading } from "@chakra-ui/react"

const Home = () => {
  useEffect(() => {
   
  }, [])
  

  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} color="#e56c68">
        Trending
      </Heading>
    </Container>
  );
};

export default Home
