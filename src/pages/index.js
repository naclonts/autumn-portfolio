import React, { useState } from 'react';
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
]

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
]

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
]

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const images = [
    'images/img1.jpg',
    'images/img2.jpg',
    'images/img3.jpg',
    // Add more images as needed
  ];

  const openCarousel = (index) => {
    setCurrentIndex(index);
    setCurrentImage(images[index]);
    setIsCarouselVisible(true);
  };

  const closeCarousel = () => {
    setIsCarouselVisible(false);
  };

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
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
            <a href="#">Home</a>
            <a href="#">Paintings</a>
            <a href="#">Process</a>
            <a href="#">About</a>
            <a href="#">Exhibitions</a>
            <a href="#">Contact</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
      </header>

      <main>
        <div className="gallery">
          {images.map((image, index) => (
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => openCarousel(index)}
              key={index}
            />
          ))}
        </div>
      </main>

      {isCarouselVisible && (
        <div className="carousel" onClick={closeCarousel}>
          <span className="prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&lt;</span>
          <img src={currentImage} alt="Selected" className="carousel-image" />
          <span className="next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&gt;</span>
        </div>
      )}
    </Layout>
  );
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
