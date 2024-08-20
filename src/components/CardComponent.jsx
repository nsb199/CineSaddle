import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import {StarIcon} from "@chakra-ui/icons";

const CardComponent = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item?.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)", md: "translateY(-10px)" },
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          zIndex: "10",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
          "& .overlay": {
            opacity: 1,
          },
        }}
        borderRadius="20px"
        overflow="hidden"
        borderWidth="1px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          borderRadius="20px"
          alt={item?.title || item?.name}
          height={"100%"}
        />

        <Box
          className="overlay"
          pos={"absolute"}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"25%"}
          bg={"rgba(229, 108, 104, 1)"}
          opacity={"0"}
          transition={"opacity 0.4s ease-in-out"}
        >
          <Text
            color="#f6e9ca"
            fontWeight="bold"
            fontSize={"lg"}
            textAlign={"center"}
          >
            {item?.title || item?.name}
          </Text>
          <Text textAlign={"center"} fontSize={"small"} fontWeight={"semibold"} color={"green.200"}>
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={"1"} mt={"1"} >
           <StarIcon fontSize={"x-small"} color={"#f6e9ca"} ></StarIcon>
            <Text fontSize={"small"} fontWeight={"semibold"} color={"#f6e9ca"} >{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;
