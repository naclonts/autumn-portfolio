import React, { useState, useRef } from 'react';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import Seo from '../components/seo';

const IndexPage = ({ data }) => {
  const images = data.allFile.nodes.filter(node => node.childImageSharp);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setIsCarouselVisible(true);
  };

  const closeCarousel = () => {
    setIsCarouselVisible(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
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
          <button className="prev" onClick={prevImage}>&lt;</button>
          <div className="carousel-image-wrapper">
            <div className="carousel-image">
              <GatsbyImage
                image={getImage(images[currentImageIndex].childImageSharp.gatsbyImageData)}
                alt={`Carousel Image ${currentImageIndex + 1}`}
                objectFit='contain'
              />
            </div>
          </div>
          <button className="next" onClick={nextImage}>&gt;</button>
        </div>
      )}
    </Layout>
  );
};

export const Head = () => (
  <>
    <Seo title="Home" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bona+Nova+SC:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"></link>
  </>
)
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
