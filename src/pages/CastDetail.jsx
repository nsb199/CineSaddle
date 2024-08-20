import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Heading, Image, Text, Spinner, Flex } from "@chakra-ui/react";
import { fetchCastDetail, imagePath } from "../services/api";

const CastDetail = () => {
  const { id } = useParams();
  const [castDetail, setCastDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCastDetail(id);
        setCastDetail(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
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
    <Container maxW={"container.xl"} py="10">
      <Flex alignItems={"center"} gap={"10"} flexDirection={{ base: "column", md: "row" }}>
        <Image
          height={"300px"}
          borderRadius={"20px"}
          src={`${imagePath}/${castDetail?.profile_path}`}
          border={"3px solid #f6e9ca"}
          boxShadow={"0 4px 8px rgba(246, 233, 202, 0.3)"}
        />
        <Box color={"#e56c68"} fontWeight={"semibold"} >
          <Heading fontSize={"3xl"} color={"rgba(246, 233, 202, 1)"}>
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
    </Container>
  );
};

export default CastDetail;
