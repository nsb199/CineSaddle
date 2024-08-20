import { Container, Heading } from "@chakra-ui/react"

const Movies = () => {
  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} color="#e56c68">
        Discover Movies
      </Heading>
    </Container>
  )
}

export default Movies