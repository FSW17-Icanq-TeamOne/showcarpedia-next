import {Carousel} from "react-bootstrap"
import Image from "next/image"
import ReactPlayer from "react-player/lazy"

const CarouselDetail = ({images, videos}) => {
  console.log(videos)
  return (
    // <Container style={{ height:"250%"}}>
    <Carousel>
      {images?.map((e, idx) => (
        <Carousel.Item key={idx}>
          <Image
            layout="responsive"
            width="200px"
            height="100%"
            src={e}
            alt={e}
          />
        </Carousel.Item>
      ))}
      {videos?.map((video, idx) => (
        <Carousel.Item key={idx}>
          <ReactPlayer
            width="100%"
            url={video}
            config={{
              youtube: {
                playerVars: {showinfo: 1},
              },
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
    // </Container>
  )
}

export default CarouselDetail
