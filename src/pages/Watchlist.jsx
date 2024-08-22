import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";

const Watchlist = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
          console.log(data, "data");
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"5"} my={"7"}>
        <Heading
          as="h2"
          fontSize={"xl"}
          textTransform={"uppercase"}
          color="#e56c68"
        >
          Your Watchlist
        </Heading>
      </Flex>
     
      {isLoading && (
        <Flex
          justify={"center"}
          alignItems={"center"}
          direction={"column"}
          height={"100vh"}
        >
          <Spinner size={"xl"} color="#e56c68" />
        </Flex>
      )}
      {!isLoading && watchlist?.length === 0 && (
        <Flex
          justify={"center"}
          alignItems={"center"}
          direction={"column"}
          height={"100vh"}
        >
          <Heading as="h2" color={"#eb8c8b"} fontSize={"md"} textTransform={"uppercase"}>
            Watchlist is empty
          </Heading>
        </Flex>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"5"}
        >
          {watchlist?.map((item) => (
            <WatchlistCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
