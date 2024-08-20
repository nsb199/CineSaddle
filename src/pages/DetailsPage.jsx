import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon, TimeIcon } from "@chakra-ui/icons";
import { ratingToPercentage, resolveRatingColor } from "../utils/helpers";
import VideoComponent from "../components/VideoComponent";

const DetailsPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const video = videosData?.results?.find((video)=>video?.type === "Trailer")
        setVideo(video);

        const videos = videosData?.results?.filter((video)=> video?.type !== "Trailer")?.slice(0, 10);
        setVideos(videos);

      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  console.log(video,videos,'videos');

  const handleCastClick = (castId) => {
    navigate(`/cast/${castId}`);
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
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,0.5)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "100vh" }}
        py={"2"}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
        position={"relative"}
        border={"3px solid #e87c79"}
        borderRadius={"34px"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={"10"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"20px"}
              src={`${imagePath}/${details?.poster_path}`}
              border={"3px solid #f6e9ca"}
              boxShadow={"0 4px 8px rgba(246, 233, 202, 0.3)"}
            />
            <Box>
              <Heading fontSize={"3xl"} color={"rgba(246, 233, 202, 1)"}>
                {title}{" "}
                <Text as={"span"} fontWeight={"normal"} color={"gray.400"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap={"4"} mt={"1"} mb={"5"}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={"2"} color={"gray.400"} />
                  <Text fontSize={"sm"}>
                    {new Date(releaseDate).toLocaleDateString("en-IN")} (US)
                  </Text>
                </Flex>
                {type === "movie" && (
                <>
                <Box>*</Box>
                <Flex alignItems={"center"} >
                  <TimeIcon mr="2" color={"gray.400"} />
                  <Text fontSize={"sm"}>{details?.runtime}</Text>
                </Flex>

                </>
              )}
              </Flex>

              

              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={ratingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"70px"}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"7px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {ratingToPercentage(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                <Button
                  display={"none"}
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="green"
                  variant={"outline"}
                  onClick={() => console.log("click")}
                >
                  In Watchlist
                </Button>
                <Button
                  leftIcon={<SmallAddIcon />}
                  variant={"outline"}
                  onClick={() => console.log("click")}
                >
                  Add to Watchlist
                </Button>
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my={"5"}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres?.map((genre) => (
                  <Badge key={genre?.id} p="1">
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.xl"} pb="10" border="none" outline="none">
        <Heading
          as={"h2"}
          fontSize={"2xl"}
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
          {cast &&
            cast?.map((item) => (
              <Flex
                key={item?.id}
                direction={"column"}
                alignItems={"center"}
                minW={"150px"}
              >
                <Box
                  position={"relative"}
                  transform={"scale(1)"}
                  _hover={{
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
                  }}
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
                >
                  <Link to={`/cast/${item?.id}`} onClick={() => handleCastClick(item?.id)}>
                    <Image
                      src={`${imagePath}/${item?.profile_path}`}
                      w={"100%"}
                      height={"225px"}
                      objectFit={"cover"}
                      borderRadius={"20px"}
                    />
                  </Link>
                </Box>
                <Text
                  mt="4" 
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  color="#e87c79"
                  textTransform={"uppercase"}
                >
                  {item?.name}
                </Text>
              </Flex>
            ))}
        </Flex>
        <Heading  as={"h2"}
          fontSize={"2xl"}
          textTransform={"uppercase"}
          mt={"10"}
          color={"#e56c68"}  >
           Trailers & Videos
          </Heading>
          <VideoComponent id={video?.key} />
              <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}  >
                {video && videos?.map((item) =>(
                  <Box key={item?.id} minW={"290px"}>
                    <VideoComponent id={item?.key} small />
                    <Text fontSize={"sm"} fontWeight={"bold"} mt="2" noOfLines={2}>{item?.name}</Text>
                  </Box>
                ))}

              </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
