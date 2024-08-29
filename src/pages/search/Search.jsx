import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { searchData } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import BackToTopButton from "../../utils/backtotop";
import { FaMicrophone } from "react-icons/fa";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const cardsRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize audio objects for sound effects
  const pressSound = useRef(new Audio('/sounds/click-sound.mp3'));
  const stopSound = useRef(new Audio('/sounds/stop-sound.mp3'));
  const noSpeechSound = useRef(new Audio('/sounds/no-speech-sound.mp3'));

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true);
      searchData(searchValue, activePage)
        .then((res) => {
          // Filter out items without a poster
          const filteredData = res?.results.filter((item) => item.poster_path);
          setData(filteredData);
          setActivePage(res?.page);
          setTotalPages(res?.total_pages);
        })
        .catch((err) => console.log(err, "err"))
        .finally(() => setIsLoading(false));
    }
  }, [searchValue, activePage]);

  useEffect(() => {
    if (tempSearchValue === "") {
      setSearchValue("");
      setData([]);
      setHasSearched(false);
    }
  }, [tempSearchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
    setActivePage(1);
    setHasSearched(true);
  };

  useEffect(() => {
    if (cardsRef.current) {
      const children = Array.from(cardsRef.current.children);
      children.forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [data]);

  useEffect(() => {
    // Initialize the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        pressSound.current.play(); // Play sound when starting to listen
      };
      recognition.onend = () => {
        setIsListening(false);
        if (tempSearchValue === "") {
          noSpeechSound.current.play(); // Play sound when no speech is detected
        } else {
          stopSound.current.play(); // Play sound when stopping listening
        }
      };
      recognition.onerror = (event) => console.error("Speech Recognition Error:", event);
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTempSearchValue(speechResult);
        setSearchValue(speechResult);
        setHasSearched(true);
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Speech Recognition is not supported in this browser.");
    }
  }, [tempSearchValue]);

  const handleVoiceSearch = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"5"} my={"7"}>
        <Heading
          as="h2"
          fontSize={"xl"}
          textTransform={"uppercase"}
          color="#e56c68"
        >
          Search
        </Heading>
      </Flex>

      <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
        <Flex
          alignItems="center"
          bg="#f6e9ca"
          borderRadius="10px"
          border="2px solid"
          borderColor="#e56c68"
          w="100%"
          pr={2}
         
        >
          <Input
            placeholder="Search Movies, TV Show..."
            value={tempSearchValue}
            onChange={(e) => setTempSearchValue(e.target.value)}
            bg="#f6e9ca"
            color="#e56c68"
            border="none"
            borderRadius="10px 0 0 10px"
            _placeholder={{ color: "#e56c68" }}
            _focus={{
              boxShadow: "none",
            }}
          />
          <IconButton
            icon={<FaMicrophone />}
            onClick={handleVoiceSearch}
            aria-label="Voice Search"
            color={isListening ? "#f6e9ca" : "#e56c68"}
            bg={isListening ? "#e56c68" : "transparent"}
            borderRadius="50%"
            _hover={{ 
              bg: "#e56c68",
              color: "#f6e9ca"
            }}
            _active={{ 
              bg: isListening ? "#d14e4a" : "#e56c68",
              color: "#f6e9ca"
            }}
            transition="background-color 0.3s ease, color 0.3s ease"
            className={isListening ? "pulsing" : ""}
            ml={2}
          />
        </Flex>
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt={"10"}>
          <Spinner size={"xl"} color="#e56c68" />
        </Flex>
      )}

      {hasSearched && data?.length === 0 && !isLoading && (
        <Heading
          textAlign={"center"}
          color={"#e87c79"}
          as={"h3"}
          fontSize={"lg"}
          mt={"10"}
        >
          No Results Found
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "repeat(2,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={"7"}
        mb={"160px"}
        mt={"8"}
        ref={cardsRef}
      >
        {data?.length > 0 &&
          !isLoading &&
          data.map((item, i) =>
            isLoading ? (
              <Skeleton
                height={"400px"}
                width={"100%"}
                borderRadius={"20px"}
                borderWidth={"1px"}
                key={i}
                startColor="#ef9c9d"
                endColor="#f3c1b4"
              />
            ) : (
              <Box
                key={item?.id}
                className={`card-wrapper`}
              >
                <CardComponent item={item} type={item?.media_type} />
              </Box>
            )
          )}
      </Grid>

      {data?.length > 0 && !isLoading && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}

      <BackToTopButton />
    </Container>
  );
};

export default Search;
