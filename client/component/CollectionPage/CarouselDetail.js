import { Carousel } from "react-bootstrap"
import Image from "next/image"

const CarouselDetail = ({ images }) => {
    return (
      // <Container style={{ height:"250%"}}>
      <Carousel>
        {images?.map((e, idx) => (
          <Carousel.Item key={idx}>
            <Image  layout="responsive" width="200px" height="100%"  src={e} alt={e} />
          </Carousel.Item>
        ))}
      </Carousel>
      // </Container>
    );
  };

export default CarouselDetail;