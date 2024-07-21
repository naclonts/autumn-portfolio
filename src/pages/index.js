import React, { useState } from 'react';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../components/index.module.css";

const IndexPage = ({ data }) => {
  const images = data.allFile.nodes;

  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openCarousel = (index) => {
    console.log("Opening carousel for index:", index);
    setCurrentIndex(index);
    setCurrentImage(images[index].childImageSharp.gatsbyImageData);
    setIsCarouselVisible(true);
  };

  const closeCarousel = () => {
    console.log("Closing carousel");
    setIsCarouselVisible(false);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    console.log("Showing previous image");
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex].childImageSharp.gatsbyImageData);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    console.log("Showing next image");
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex].childImageSharp.gatsbyImageData);
  };

  const toggleMenu = () => {
    console.log("Toggling menu");
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
            const img = image.childImageSharp ? getImage(image.childImageSharp.gatsbyImageData) : null;
            return (
              img && (
                <div key={index} className="thumbnail-wrapper" onClick={() => openCarousel(index)}>
                  <GatsbyImage
                    image={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail"
                  />
                </div>
              )
            );
          })}
        </div>
      </main>

      {isCarouselVisible && (
        <div className="carousel" onClick={closeCarousel}>
          <span className="prev" onClick={prevImage}>&lt;</span>
          {currentImage && <GatsbyImage image={currentImage} alt="Selected" className="carousel-image" imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }} />}
          <span className="next" onClick={nextImage}>&gt;</span>
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
