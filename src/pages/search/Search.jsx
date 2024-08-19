import { Container, Heading } from "@chakra-ui/react"

const Search = () => {
  return (
    <Container maxW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} color="#e56c68">
        Search
      </Heading>
    </Container>
  )
}

export default Search