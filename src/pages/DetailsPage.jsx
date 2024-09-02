import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackToTopButton from "../utils/backtotop";

import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  useToast,
  Image,
  Spinner,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
  fetchMovieImages,
  fetchSimilar,
  fetchTvImages,
  fetchWatchProviders,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helpers";
import VideoComponent from "../components/VideoComponent";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";

const DetailsPage = () => {
  const { type, id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore();

  const toast = useToast();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [backdrops, setBackdrops] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);

        setDetails(detailsData);
        setCast(creditsData?.cast?.slice(0, 25));

        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);

        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);

        // Fetch backdrops based on type
        let imagesData;
        if (type === "movie") {
          imagesData = await fetchMovieImages(id);
        } else if (type === "tv") {
          imagesData = await fetchTvImages(id);
        }

        setBackdrops((imagesData?.backdrops || []).slice(0, 20));

        // Fetch similar items based on genres
        const genreIds = detailsData.genres.map((genre) => genre.id);
        if (genreIds.length > 0) {
          const similar = await fetchSimilar(type, genreIds, 1);
          // Optionally, filter out the current item if it's included
          const filteredSimilar = similar.filter(
            (item) => item.id.toString() !== id
          );
          setSimilarItems(filteredSimilar.slice(0, 10)); // Limit to 10 items
        }
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  const handleCastClick = (castId) => {
    navigate(`/cast/${castId}`);
  };

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to Watchlist",
        status: "error",
        isClosable: true,
        duration: "2500",
      });
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  useEffect(() => {
    const getData = async () => {
      try {
        const detailsData = await fetchDetails(type, id);
        setDetails(detailsData);

        const creditsData = await fetchCredits(type, id);
        setCredits(creditsData);

        const providersData = await fetchWatchProviders(type, id);
        setWatchProviders(providersData);
      } catch (error) {
        console.error(
          "Failed to fetch details, credits, or watch providers",
          error
        );
      }
    };

    getData();
  }, [type, id]);

  const handleRemoveFromwatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
    setIsInWatchlist(isSetToWatchlist);
  };

  if (loading) {
    return (
      <Flex justify={"center"} align={"center"} h="100vh">
        <Spinner size={"xl"} color="#e56c68" />
      </Flex>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <Box mx={{ base: "2", md: "4" }}>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,0.5)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "100vh" }}
        pt={"7"}
        pb={"6"}
        px={{ base: "4", md: "8", lg: "12" }}
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        position={"relative"}
        border={"3px solid #e87c79"}
        borderRadius={"34px"}
        overflow={"hidden"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={"10"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={{ base: "300px", md: "400px", lg: "450px" }}
              borderRadius={"20px"}
              src={`${imagePath}/${details?.poster_path}`}
              border={"3px solid #f6e9ca"}
              boxShadow={"0 4px 8px rgba(246, 233, 202, 0.3)"}
            />
            <Box>
              <Heading
                fontSize={{ base: "lg", md: "3xl" }}
                textAlign={{ base: "center", md: "left" }}
                color={"rgba(246, 233, 202, 1)"}
              >
                {title}{" "}
                <Text
                  as={"span"}
                  fontWeight={"normal"}
                  color={"gray.400"}
                ></Text>
              </Heading>

              <Flex
                justifyContent={{ base: "center", md: "flex-start" }}
                alignItems={"center"}
                gap={"4"}
                mt={"1"}
                mb={"5"}
              >
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={"2"} color={"gray.400"} />
                  <Text fontSize={{ base: "xs", md: "sm" }}>
                    {new Date(releaseDate).toLocaleDateString("en-IN")} (US)
                  </Text>
                </Flex>
                {type === "movie" && (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon mr="2" color={"gray.400"} />
                      <Text fontSize={{ base: "xs", md: "sm" }}>
                        {minutesTohours(details?.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>

              <Flex
                justifyContent={{ base: "center", md: "flex-start" }}
                alignItems={"center"}
                gap={"4"}
              >
                <CircularProgress
                  value={ratingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={{ base: "50px", md: "70px" }}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"7px"}
                >
                  <CircularProgressLabel fontSize={{ base: "sm", md: "lg" }}>
                    {ratingToPercentage(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                {isInWatchlist ? (
                 <Button
  leftIcon={<CheckCircleIcon />}
  backgroundColor="green"
  color="white"
  border={"2px solid #f6e9ca"}
  fontWeight="bold"
  fontSize={{ base: "sm", md: "md" }} // Smaller font size for phones
  px={{ base: "2", md: "4" }} // Smaller padding for phones
  py={{ base: "1", md: "2" }} // Smaller padding for phones
  _hover={{
    backgroundColor: "#228B22",
    transform: "scale(1.03)",
  }}
  _active={{
    transform: "scale(1)",
  }}
  onClick={handleRemoveFromwatchlist}
>
  In Watchlist
</Button>

                ) : (
                  <Button
                    leftIcon={
                      <SmallAddIcon
                        fontWeight={"bold"}
                        fontSize={{ base: "lg", md: "2xl" }}
                        
                      />
                    }
                    backgroundColor="#e87c79"
                    color="white"
                    border={"2px solid #f6e9ca"}
                    fontWeight="bold"
                    fontSize={{ base: "sm", md: "md" }}
                    px={{ base: "2", md: "4" }}
                    py={{ base: "1", md: "2" }}
                    _hover={{
                      backgroundColor: "#e56c68",
                      transform: "scale(1.03)",
                    }}
                    _active={{
                      transform: "scale(1)",
                    }}
                    onClick={handleSaveToWatchlist}
                  >
                    Save to Watchlist
                  </Button>
                )}
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                textAlign={{ base: "center", md: "left" }}
                fontStyle={"italic"}
                my={"5"}
              >
                {details?.tagline}
              </Text>
              <Heading
                textAlign={{ base: "center", md: "left" }}
                fontSize={{ base: "lg", md: "xl" }}
                mb={"2"}
              >
                Overview
              </Heading>
              <Flex
  mb={2}
  gap="2"
  justifyContent={{ base: "center", md: "flex-start" }}
  flexWrap="wrap"
>
  {details?.genres?.map((genre) => (
    <Badge
      key={genre?.id}
      p={{ base: "0.5", md: "1" }} // Smaller padding for phones
      fontSize={{ base: "small", md: "sm" }} // Smaller font size for phones
    >
      {genre?.name}
    </Badge>
  ))}
</Flex>


              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize={{ base: "sm", md: "md" }}
                mb={"3"}
              >
                {details?.overview}
              </Text>

              {/* Watch Providers Section */}
              {watchProviders?.flatrate?.length > 0 && (
                <Flex
                  mt="6"
                  gap="2"
                  overflowX="auto"
                  justifyContent={{ base: "center", md: "flex-start" }}
                  px={{ base: "4", md: "0" }}
                >
                  {watchProviders.flatrate.map((provider) => (
                    <a
                      key={provider.provider_id}
                      href={provider.watch_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Image
                        src={`${imagePathOriginal}${provider.logo_path}`}
                        alt={provider.provider_name}
                        boxSize="40px" // Adjusted size
                        borderRadius="50%"
                      />
                    </a>
                  ))}
                </Flex>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW={"container.xl"} pb="10" border="none" outline="none">
        {/* <Box mt="10" >
    <Heading
      as="h2"
      fontSize={{ base: "lg", md: "2xl" }}
      textTransform={"uppercase"}
      mt={"10"}
      mb={"10"}
      color={"#e56c68"}
    >
      Catch it on :
    </Heading>
    {watchProviders?.flatrate?.length > 0 ? (
      <SimpleGrid  columns={{ base: 1, md: 2, lg: 4 }} spacing="7"
      px={{ base: "9", md: "0" }}
      >
        {watchProviders.flatrate.map((provider) => (
          <a
            key={provider.provider_id}
            href={provider.watch_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Flex
              alignItems="center"
              p="4" 
              gap="3"
              borderRadius="20px"
              boxShadow="md" 
              _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
              transition="all 0.2s"
              cursor="pointer" 
              flexDirection="column" 
              align="center" 
            >
              <Image
                src={`${imagePathOriginal}${provider.logo_path}`}
                alt={provider.provider_name}
                boxSize="43px"
                border="1px solid white"
                borderRadius="50%"
              />
              <Text color="#e56c68" fontWeight="bold" fontSize={["sm", "md"]}>
                {provider.provider_name}
              </Text>
            </Flex>
          </a>
        ))}
      </SimpleGrid>
    ) : (
      <Text fontSize="lg" fontWeight={"semibold"} color="#e56c68" textAlign="center" mt="4">
        This content is not available for streaming in your country.
      </Text>
    )}
  </Box> */}
        <Heading
          as={"h2"}
          fontSize={{ base: "lg", md: "2xl" }}
          textTransform={"uppercase"}
          mt={"10"}
          color={"#e56c68"}
        >
          Cast
        </Heading>
        <Flex
          mt="5"
          mb="10"
          pb={"2"}
          overflowX={"scroll"}
          gap={"5"}
          className="custom-scrollbar"
          border="none"
          outline="none"
        >
          {cast?.length === 0 && <Text>No cast found</Text>}
          {cast
            ?.filter((item) => item?.profile_path) // Filter out cast members without an image
            ?.map((item) => (
              <Flex
                key={item?.id}
                direction={"column"}
                alignItems={"center"}
                minW={{ base: "120px", md: "150px" }}
              >
                <Box
                  position={"relative"}
                  transform={"scale(1)"}
                  _hover={{
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                    transform: "scale(1.01)",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
                >
                  <Link
                    to={`/cast/${item?.id}`}
                    onClick={() => handleCastClick(item?.id)}
                  >
                    <Image
                      src={`${imagePath}/${item?.profile_path}`}
                      w={"100%"}
                      height={{ base: "180px", md: "225px" }}
                      objectFit={"cover"}
                      borderRadius={"20px"}
                    />
                  </Link>
                </Box>
                <Text
                  mt="4"
                  mb={"4"}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight={"bold"}
                  color="#e87c79"
                  textTransform={"uppercase"}
                >
                  {item?.name}
                </Text>
              </Flex>
            ))}
        </Flex>
        <Heading
          as={"h2"}
          fontSize={{ base: "lg", md: "2xl" }}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
          color={"#e56c68"}
        >
          Official Trailer of {title}
        </Heading>
        <VideoComponent id={video?.key} />
        {/* More in this category Section */}
        <Heading
          as={"h2"}
          fontSize={{ base: "lg", md: "2xl" }}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
          color={"#e56c68"}
        >
          You might also like
        </Heading>
        <Flex
          mt="5"
          mb="10"
          overflowX={"scroll"}
          gap={"5"}
          className="custom-scrollbar"
        >
          {similarItems?.length === 0 && <Text>No similar items found.</Text>}
          {similarItems?.map((item) => (
            <Flex
              key={item?.id}
              direction={"column"}
              alignItems={"center"}
              minW={{ base: "120px", md: "150px" }}
            >
              <Box
                position={"relative"}
                transform={"scale(1)"}
                _hover={{
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                  transform: "scale(1.01)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                borderRadius="20px"
                overflow="hidden"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
              >
                <Link to={`/${type}/${item?.id}`}>
                  <Image
                    src={
                      item?.poster_path
                        ? `${imagePath}/${item?.poster_path}`
                        : "/placeholder.png" // Optional: Placeholder image
                    }
                    w={"100%"}
                    height={{ base: "180px", md: "225px" }}
                    objectFit={"cover"}
                    borderRadius={"20px"}
                    alt={item?.title || item?.name}
                  />
                </Link>
              </Box>
              <Text
                mt="4"
                mb={"4"}
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight={"bold"}
                color="#e87c79"
                textTransform={"uppercase"}
                textAlign="center"
              >
                {item?.title || item?.name}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Heading
          as={"h2"}
          fontSize={{ base: "lg", md: "2xl" }}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
          color={"#e56c68"}
        >
          Wallpapers & Backdrops from {title}
        </Heading>
        {/* Backdrops  */}
        {backdrops.length === 0 ? (
          <Text>No backdrops found</Text>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={"5"}
            mt="5"
            mb="10"
          >
            {backdrops.map((item) => (
              <GridItem key={item.file_path}>
                <Box
                  borderRadius={"20px"}
                  overflow={"hidden"}
                  boxShadow={"0 4px 8px rgba(0, 0, 0, 0.3)"}
                  _hover={{
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                    transform: "scale(1.01)",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <a
                    href={`${imagePathOriginal}/${item.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", width: "100%", height: "auto" }}
                  >
                    <Image
                      src={`${imagePathOriginal}/${item.file_path}`}
                      width={"100%"}
                      height={"auto"}
                      objectFit={"cover"}
                    />
                  </a>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
        ;
      </Container>

      <BackToTopButton />
    </Box>
  );
};

export default DetailsPage;
