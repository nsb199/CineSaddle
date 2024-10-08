import { useEffect, useState, useRef } from "react";
import { Box, Container, Flex, Text, Image, Link, Grid, Heading, Skeleton, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";
import BackToTopButton from "../utils/backtotop";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const [animate, setAnimate] = useState(false);
  const [footerLoaded, setFooterLoaded] = useState(false); 
  const [buttonVisible, setButtonVisible] = useState(false); // New state for button visibility
  const cardsRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
        setAnimate(true);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
        // Set the button visibility with a delay
        const timer = setTimeout(() => setButtonVisible(true), 1000);
        return () => clearTimeout(timer); // Cleanup the timer on unmount
      });
  }, [timeWindow]);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [timeWindow]);

  useEffect(() => {
    if (cardsRef.current) {
      const children = Array.from(cardsRef.current.children);
      children.forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [data, animate]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setFooterLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"5"} my={"7"}>
        <Heading as="h2" fontSize={"xl"} textTransform={"uppercase"} color="#e56c68">
          Trending
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
        >
          <Box
            as="button"
            px={{ base: "2", sm: "3" }}  
            py={{ base: "0.5", sm: "1" }}
            borderRadius="20px"
            color="#8e6f6f"
            fontWeight="semibold"
            fontSize={{ base: "sm", sm: "md" }}  
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
              borderRadius="20px"
              zIndex="-1"
              transition="transform 0.61s ease"
              transform={timeWindow === 'day' ? "translateX(0)" : "translateX(100%)"}
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
              borderRadius="20px"
              zIndex="-1"
              transition="transform 0.61s ease"
              transform={timeWindow === 'week' ? "translateX(0)" : "translateX(-100%)"}
            />
          </Box>
        </Flex>
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
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton 
                key={i} 
                height={{ base: "225px", md: "400px" }} 
                width={"100%"} 
                borderRadius={"20px"} 
                borderWidth={"1px"} 
                startColor="#ef9c9d" 
                endColor="#f3c1b4" 
              />
            ))
          : data.map((item, i) => (
              <Box
                key={item?.id}
                className={`card-wrapper ${animate ? 'card-appear' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}  // Staggered animation delay
              >
                <CardComponent item={item} type={item?.media_type} />
              </Box>
            ))}
      </Grid>

      {buttonVisible && !loading && (
        <Flex justifyContent="flex-end" mt={"-109px"} mb={"70px"}>
          <Button
            onClick={() => navigate('/search')}
            colorScheme="teal"
            size="lg"
            borderRadius="30px"
            px="8"
            py="4"
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
            Discover More
          </Button>
        </Flex>
      )}

      {footerLoaded && (
        <Box
          as="footer"
          py="4"
          mb={"100"}
          bg="#f6e9ca"
          textAlign="center"
          position="relative"
          mt="auto"
        >
          <Flex justifyContent="center" gap="4" mb="2">
            <Link href="https://www.linkedin.com/in/neerajsingh19/" isExternal>
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                boxSize="30px"
                _hover={{
                  transform: "scale(1.1)",
                  filter: "brightness(0.8)",
                }}
                transition="all 0.3s ease"
              />
            </Link>
            <Link href="https://github.com/nsb199" isExternal>
              <Image
                src="/github.svg"
                alt="GitHub"
                boxSize="30px"
                _hover={{
                  transform: "scale(1.1)",
                  filter: "brightness(0.8)",
                }}
                transition="all 0.3s ease"
              />
            </Link>
          </Flex>
          <Text fontSize="sm" color={"#e87c79"} fontWeight={"bold"}>
            &copy; 2024 CineSaddle. <br /> Curated with love by{" "}
            <Link href="https://www.linkedin.com/in/neerajsingh19/" isExternal color="blue.400">
              Neeraj Singh
            </Link>
          </Text>
        </Box>
      )}

      <BackToTopButton />
    </Container>
  );
};

export default Home;
