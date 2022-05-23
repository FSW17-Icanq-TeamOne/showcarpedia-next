import { Carousel } from "react-bootstrap"
import Image from "next/image"

const CarouselDetail = ({ images }) => {
    return (
      // <Container style={{ height:"250%"}}>
      <Carousel>
        {images?.map((e, idx) => (
          <Carousel.Item key={idx}>
            <img style={{ width: "100%", maxHeight:"500px" }} layout="fill"  src={e} alt={e} />
          </Carousel.Item>
        ))}
      </Carousel>
      // </Container>
    );
  };

export default CarouselDetail;