import { useEffect, useState } from "react";
import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      }).finally(()=>{
        setLoading(false);
      })
  }, [timeWindow]);

  console.log(data, "data");

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"7"}>
        <Heading
          as="h2"
          fontSize={"xl"}
          textTransform={"uppercase"}
          color="#e56c68"
        >
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid transparent"} 
          borderRadius={"20px"}
          boxShadow="0 0 1px #e87c79, 0 0 0 1px #e87c79" 
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            color="#8e6f6f" // Font color
            fontWeight="semibold"
            bg={timeWindow === 'day' ? "#f3c1b4" : ""} 
            onClick={() => setTimeWindow("day")}
            transition="background-color 0.61s ease" 
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            color="#8e6f6f" // Font color
            fontWeight="semibold"
            bg={timeWindow === 'week' ? "#f3c1b4" : ""} 
            onClick={() => setTimeWindow("week")}
            transition="background-color 0.61s ease" 
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      {loading && <div>Loading...</div>}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={"7"}
      >
        {data &&
          data?.map((item) => <CardComponent key={item?.id} item={item} />)}
      </Grid>
    </Container>
  );
};

export default Home;
