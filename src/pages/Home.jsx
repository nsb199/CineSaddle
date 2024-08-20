import { useEffect, useState } from "react";
import { Box, Container, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
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
     <Flex alignItems={"baseline"} gap={"5"} my={"7"}>
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
    _hover={{
      boxShadow: "0 0 4px 2px #e87c79",
    }}
    transition="background-color 0.61s ease, box-shadow 0.3s ease"
    position="relative"
  >
    <Box
      as="button"
      px="3"
      py="1"
      borderRadius={"20px"}
      color="#8e6f6f"
      fontWeight="semibold"
      bg={timeWindow === 'day' ? "#f3c1b4" : ""}
      onClick={() => setTimeWindow("day")}
      transition="background-color 0.61s ease, box-shadow 0.3s ease" 
      position="relative"
      overflow="hidden"
    >
      Today
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        height="100%"
        bg="#f3c1b4"
        borderRadius={"20px"}  // Match the button's border-radius
        zIndex="-1"
        transition="transform 0.61s ease"
        transform={timeWindow === 'day' ? "translateX(0)" : "translateX(100%)"}
      />
    </Box>
    <Box
      as="button"
      px="3"
      py="1"
      borderRadius={"20px"}
      color="#8e6f6f"
      fontWeight="semibold"
      bg={timeWindow === 'week' ? "#f3c1b4" : ""}
      onClick={() => setTimeWindow("week")}
      transition="background-color 0.61s ease, box-shadow 0.3s ease" 
      position="relative"
      overflow="hidden"
    >
      This Week
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        height="100%"
        bg="#f3c1b4"
        borderRadius={"20px"}  // Match the button's border-radius
        zIndex="-1"
        transition="transform 0.61s ease"
        transform={timeWindow === 'week' ? "translateX(0)" : "translateX(-100%)"}
      />
    </Box>
  </Flex>
</Flex>

      

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
          data?.map((item, i) => (
            loading ? (
              <Skeleton height={"400px"} width={"100%"}
              borderRadius={"20px"}
              borderWidth={"1px"} key={i} />
            ) : (
              <CardComponent key={item?.id} item={item} type={item?.media_type} />
            )
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
