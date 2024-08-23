import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Flex, Grid, Image, Text, Heading, Spinner, Skeleton } from "@chakra-ui/react";
import { fetchCastDetail, fetchCastMovies, fetchCastImages, imagePath } from "../services/api";
import CardComponent from "../components/CardComponent";
import BackToTopButton from "../utils/backtotop";

const CastDetail = () => {
  const { id } = useParams(); // Extract ID from URL parameters
  const [castDetail, setCastDetail] = useState(null);
  const [castMovies, setCastMovies] = useState([]);
  const [castImages, setCastImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const detailData = await fetchCastDetail(id);
        setCastDetail(detailData);

        const moviesData = await fetchCastMovies(id);
        setCastMovies(moviesData.cast || []);

        const imagesData = await fetchCastImages(id);
        setCastImages(imagesData.profiles || []);
      } catch (error) {
        console.log("Error fetching cast data:", error);
        setCastDetail(null);
        setCastMovies([]);
        setCastImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading && !castDetail) {
    return (
      <Flex justify={"center"} align={"center"} h="100vh">
        <Spinner size={"xl"} color="#e56c68" />
      </Flex>
    );
  }

  if (!castDetail) {
    return (
      <Container maxW={"container.xl"}>
        <Heading>No cast details found</Heading>
      </Container>
    );
  }

  return (
    <Container maxW={"container.xl"} py="10" borderRadius={"34px"} boxShadow={"0 2px 4px rgba(0, 0, 0, 0.5)"} mb={"7"} >
      <Flex alignItems={"center"} gap={"10"} flexDirection={{ base: "column", md: "row" }}>
    <Image
          height={"300px"}
          borderRadius={"20px"}
          src={castDetail?.profile_path ? `${imagePath}/${castDetail.profile_path}` : '/placeholder.png'}
          boxShadow={"0 4px 8px rgba(0,0,0,0.5)"}
        

        />
        <Box color={"#e56c68"} fontWeight={"semibold"}>
        <Heading fontSize={"4xl"} color={"#e87c79"} mb={"4"}>
  {castDetail?.name}
</Heading>

          <Text fontSize={"md"} mt={"3"}>
            {castDetail?.biography || "No biography available."}
          </Text>
          <Text fontSize={"md"} mt={"3"}>
            Birth Date: {castDetail?.birthday || "Unknown"}
          </Text>
          <Text fontSize={"md"} mt={"3"}>
            Place of Birth: {castDetail?.place_of_birth || "Unknown"}
          </Text>
        </Box>
      </Flex>

      <Heading
        as={"h2"}
        fontSize={"2xl"}
        textTransform={"uppercase"}
        mt={"10"}
        mb={"10"}
        color={"#e56c68"}
      >
        Some  Great Movies by {castDetail.name}
      </Heading>

      <Grid
  templateColumns={{
    base: "1fr",
    sm: "repeat(3,1fr)",
    md: "repeat(4,1fr)",
    lg: "repeat(5,1fr)",
  }}
  gap={"7"}
>
  {loading
    ? Array(10).fill(0).map((_, i) => (
        <Skeleton height={"400px"} width={"100%"} borderRadius={"20px"} borderWidth={"1px"} key={i} />
      ))
    : castMovies
        .filter((movie) => movie.poster_path)  // Only display movies with posters
        .slice(0, 10)
        .map((movie) => (
          <CardComponent key={movie.id} item={movie} type="movie" />
        ))}
</Grid>


      <Heading
        as={"h2"}
        fontSize={"2xl"}
        textTransform={"uppercase"}
        mt={"10"}
        color={"#e56c68"}
      >
        Images of {castDetail.name}
      </Heading>

      <Flex
        mt="5"
        mb="10"
        pb={"2"}
        overflowX={"scroll"}
        className="custom-scrollbar"
        border="none"
        outline="none"
      >
        {castImages.length === 0 ? (
          <Text>No images found</Text>
        ) : (
          castImages.map((image) => (
            <Flex
              key={image.file_path}
              direction={"column"}
              alignItems={"center"}
              minW={"200px"} // Adjust width for spacing
            >
              <Box
              mb={"4"}
                position={"relative"}
                transform={"scale(1)"}
                _hover={{
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  transform: "scale(1.01)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
                }}
                borderRadius="20px"
                overflow="hidden"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
              >
                <a href={`${imagePath}/${image.file_path}`} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`${imagePath}/${image.file_path}`}
                    w={"100%"}
                    h={"225px"}
                    objectFit={"cover"}
                    borderRadius={"20px"}
                  />
                </a>
              </Box>
            </Flex>
          ))
        )}
      </Flex>
      <BackToTopButton />
    </Container>
  );
};

export default CastDetail;
