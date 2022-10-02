import { Container } from "../Components/Container"
import { Row } from "../Components/Row"
import { Card } from "../Components/Card"
import { Carousel } from "../Components/Carousel/Carousel"

import carousel_image_1 from "../assets/images/carousel/1.jpg"
import carousel_image_2 from "../assets/images/carousel/2.jpg"
import carousel_image_3 from "../assets/images/carousel/3.jpg"

export default function Home(){
  return(
    <Container className="home-container">
      <Carousel infinite>
        <Carousel.Page>
          <div className="item item-1"><img src={ carousel_image_1 } className="item item-1" /></div>
        </Carousel.Page>
        <Carousel.Page>
          <div className="item item-2"><img src={ carousel_image_2 } className="item item-2" /></div>
        </Carousel.Page>
        <Carousel.Page>
          <div className="item item-3"><img src={ carousel_image_3 } className="item item-3" /></div>
        </Carousel.Page>
      </Carousel>
      <Row className="card-wrap">
        <Card
          title="Card Title"
          imageUrl="https://wallpaper.dog/large/20521631.jpg"
          body="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam suscipit molestias consectetur accusantium, atque aliquid delectus vel cupiditate explicabo, hic facere accusamus velit asperiores. Fugit amet rem nisi atque?"
        />
        <Card
          title="Card Title"
          imageUrl="https://wallpaper.dog/large/20521631.jpg"
          body="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam suscipit molestias consectetur accusantium, atque aliquid delectus vel cupiditate explicabo, hic facere accusamus velit asperiores. Fugit amet rem nisi atque?"
        />
        <Card
          title="Card Title"
          imageUrl="https://wallpaper.dog/large/20521631.jpg"
          body="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam suscipit molestias consectetur accusantium, atque aliquid delectus vel cupiditate explicabo, hic facere accusamus velit asperiores. Fugit amet rem nisi atque?"
        />
      </Row>
    </Container>
  )
}