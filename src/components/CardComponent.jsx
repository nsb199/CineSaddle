import { Box, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { imagePath } from '../services/api'

const CardComponent = ({item}) => {
  return (
    <Link to="/">
       <Box
  borderRadius="20px"
  overflow="hidden"
  borderWidth="1px"
  boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)" // Soft, subtle shadow
>
  <Image
    src={`${imagePath}/${item?.poster_path}`}
    borderRadius="20px" alt={item?.title || item?.name} height={"100%"}
  />
</Box>


    </Link>
  )
}

export default CardComponent