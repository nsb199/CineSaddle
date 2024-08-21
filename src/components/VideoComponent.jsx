import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

const VideoComponent = ({ id, small }) => {

 
  return (
    <Box
      borderRadius="20px"
      overflow="hidden"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)" 
      _hover={{
        transform: "scale(1)", 
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
      }}
    >
      <iframe
        width="100%"
        height={small ? "150" : "600"}
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allowFullScreen
        style={{
          borderRadius: "20px", 
        }}
      ></iframe>
    </Box>
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default VideoComponent;
