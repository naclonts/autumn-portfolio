import React, { useState, useRef, useEffect } from 'react';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const IndexPage = ({ data }) => {
  const images = data.allFile.nodes.filter(node => node.childImageSharp);
  const [carouselRef, setCarouselRef] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openCarousel = (index) => {
    console.log("Opening carousel at index:", index);
    setCurrentImageIndex(index);
    setIsCarouselVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      carouselRef?.goToSlide(currentImageIndex + 2);
    }, 0);
  }, [carouselRef, currentImageIndex]);

  const closeCarousel = () => {
    console.log("Closing carousel");
    setIsCarouselVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout>
      <header>
        <nav>
          <div className="logo">Autumn Erb</div>
          <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#">Work</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
      </header>

      <main className="gallery-container">
        <div className="gallery">
          {images.map((image, index) => {
            const img = getImage(image.childImageSharp.gatsbyImageData);
            return (
              <div key={index} className="thumbnail-wrapper" onClick={() => openCarousel(index)}>
                <GatsbyImage
                  image={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail"
                />
              </div>
            );
          })}
        </div>
      </main>

      {isCarouselVisible && (
        <div className="carousel-wrapper">
          <button className="close-carousel" onClick={closeCarousel}>X</button>
          <Carousel
            ref={(el) => setCarouselRef(el)}
            slidesToSlide={currentImageIndex}
            responsive={responsive}
            infinite={true}
            showDots={false}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item"
          >
            {images.map((image, index) => {
              const img = getImage(image.childImageSharp.gatsbyImageData);
              return (
                <div key={index} className="carousel-image-wrapper">
                  <GatsbyImage
                    image={img}
                    alt={`Carousel Image ${index + 1}`}
                    className="carousel-image"
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </Layout>
  );
};

export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      nodes {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  }
`;

export default IndexPage;
