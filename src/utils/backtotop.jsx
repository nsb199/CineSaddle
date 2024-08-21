import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

const BackToTopButton = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showBackToTop && (
        <Button
        
        zIndex="1000"
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          size="lg"
          width="60px"
          height="60px"
          borderRadius="full"
          bg="#e56c68"
          color="#f6e9ca"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
          onClick={handleBackToTop}
          aria-label="Back to Top"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <ChevronUpIcon boxSize={6} />
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;
