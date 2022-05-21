import { Carousel } from "react-bootstrap";

export default function CarouselContainer () {
    return (
        <Carousel>
            <Carousel.Item interval={1000} style={{height: '100vh'}}>
                <img 
                    className="d-block w-100"
                    src='https://cdn.discordapp.com/attachments/960564590574456852/977498985159856128/carousel-car1.jpg'
                    alt='First Slide'
                />
            </Carousel.Item>
            
            <Carousel.Item interval={1000} style={{height: '100vh'}}>
                <img 
                    className="d-block w-100"
                    src='https://cdn.discordapp.com/attachments/960564590574456852/977498985487015946/carousel-car2.jpg'
                    alt='Second Slide'
                />
            </Carousel.Item>

            <Carousel.Item interval={1000} style={{height: '100vh'}}>
                <img 
                    className="d-block w-100"
                    src='https://cdn.discordapp.com/attachments/960564590574456852/977498984673337344/carousel-car3.jpg'
                    alt='Third Slide'
                />
            </Carousel.Item>
        </Carousel>
    )
}