import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaLeaf,
  FaSeedling,
  FaCarrot,
  FaRecycle,
  FaShoppingCart,
} from "react-icons/fa";
import { MdLocalFlorist } from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiInfo } from "react-icons/fi";

const ProductCard = ({ product }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    className="border rounded-lg overflow-hidden shadow-md bg-white h-full flex flex-col"
  >
    <motion.div
      className="w-full pb-[75%] relative"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
    <div className="p-2 sm:p-4 flex flex-col flex-grow">
      <motion.h3
        className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 truncate text-indigo-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {product.title}
      </motion.h3>
      <motion.p
        className="text-indigo-600 text-xs mb-2 sm:mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        ${product.price.toFixed(2)}
      </motion.p>
      <motion.div
        className="flex justify-between mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Link
          to={`/product/${product.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FiInfo className="mr-1" />
          View
        </Link>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm flex items-center transition duration-300 ease-in-out transform hover:scale-105">
          <FaShoppingCart className="mr-1" /> Add
        </button>
      </motion.div>
    </div>
  </motion.div>
);

const HomePage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentFeaturedCard, setCurrentFeaturedCard] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(1);
  const cardContainerRef = useRef(null);
  const featuredCardContainerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const cards = [
    {
      title: "Local Produce",
      description: "Supporting local farmers",
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      icon: <FaLeaf className="text-green-500 text-3xl mb-2" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Seasonal Picks",
      description: "Fresh and flavorful",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      icon: <MdLocalFlorist className="text-purple-500 text-3xl mb-2" />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Organic Certified",
      description: "100% chemical-free",
      image:
        "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      icon: <FaSeedling className="text-green-600 text-3xl mb-2" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Farm-to-Table",
      description: "Shortest supply chain",
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      icon: <FaCarrot className="text-orange-500 text-3xl mb-2" />,
      bgColor: "bg-orange-100",
    },
    {
      title: "Eco-Friendly",
      description: "Sustainable practices",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      icon: <FaRecycle className="text-blue-500 text-3xl mb-2" />,
      bgColor: "bg-blue-100",
    },
  ];

  const quoteImages = [
    {
      image:
        "https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      quote: "Eat well, feel well",
      textColor: "text-yellow-300",
    },
    {
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      quote: "Fresh from farm to table",
      textColor: "text-green-300",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      quote: "Nourish your body, nurture your soul",
      textColor: "text-blue-300",
    },
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=8"
        );
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollCards = (
    direction,
    setCurrentCardFunction,
    containerRef,
    totalCards
  ) => {
    setCurrentCardFunction((prev) => {
      const newCard = prev + (direction === "left" ? -1 : 1);
      return Math.max(0, Math.min(newCard, totalCards - visibleCards));
    });
  };

  useEffect(() => {
    const container = cardContainerRef.current;
    if (container) {
      container.scrollTo({
        left: currentCard * (container.offsetWidth / visibleCards),
        behavior: "smooth",
      });
    }
  }, [currentCard, visibleCards]);

  useEffect(() => {
    const container = featuredCardContainerRef.current;
    if (container) {
      container.scrollTo({
        left: currentFeaturedCard * (container.offsetWidth / visibleCards),
        behavior: "smooth",
      });
    }
  }, [currentFeaturedCard, visibleCards]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (setCurrentCardFunction, containerRef, totalCards) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe || isRightSwipe) {
      scrollCards(
        isLeftSwipe ? "right" : "left",
        setCurrentCardFunction,
        containerRef,
        totalCards
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row h-screen md:h-96 lg:mb-12 -mb-64 gap-2 mt-20"
      >
        <div
          className="w-full md:w-[calc(66.666%-0.25rem)] bg-cover bg-center flex flex-col justify-center items-center text-white p-8 transition-all duration-300 ease-in-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
          }}
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold mb-2 text-center"
          >
            Fresh Organic Vegetables
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl mb-4 text-center"
          >
            Straight from our farms to your table
          </motion.p>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/productList"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Shop Vegetables
            </Link>
          </motion.div>
        </div>
        <div
          className="w-full md:w-[calc(33.333%-0.25rem)] bg-cover bg-center flex flex-col justify-center items-center text-white p-8 transition-all duration-300 ease-in-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
          }}
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-2 text-center"
          >
            Organic Fruits
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base md:text-lg mb-4 text-center"
          >
            Nature's sweet treats
          </motion.p>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/productList"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Shop Fruits
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Our Specialties
        </h2>
        <div className="relative w-full">
          <div
            ref={cardContainerRef}
            className="flex overflow-hidden scroll-smooth w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() =>
              onTouchEnd(setCurrentCard, cardContainerRef, cards.length)
            }
          >
            <AnimatePresence initial={false}>
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className={`flex-shrink-0 w-full ${
                    visibleCards === 1
                      ? "sm:w-full"
                      : visibleCards === 2
                      ? "sm:w-1/2"
                      : visibleCards === 3
                      ? "sm:w-1/3"
                      : "sm:w-1/4"
                  } p-4`}
                >
                  <div
                    className={`rounded-lg shadow-md overflow-hidden h-full ${card.bgColor}`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-center">{card.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-center">
                        {card.title}
                      </h3>
                      <p className="text-center">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {currentCard > 0 && (
            <div className="absolute inset-y-0 left-0 flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  scrollCards(
                    "left",
                    setCurrentCard,
                    cardContainerRef,
                    cards.length
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full z-10 flex items-center justify-center w-10 h-10"
              >
                <FiChevronLeft className="text-2xl" />
              </motion.button>
            </div>
          )}
          {currentCard < cards.length - visibleCards && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  scrollCards(
                    "right",
                    setCurrentCard,
                    cardContainerRef,
                    cards.length
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full z-10 flex items-center justify-center w-10 h-10"
              >
                <FiChevronRight className="text-2xl" />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-green-50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="relative w-full">
          <div
            ref={featuredCardContainerRef}
            className="flex overflow-hidden scroll-smooth w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() =>
              onTouchEnd(
                setCurrentFeaturedCard,
                featuredCardContainerRef,
                featuredProducts.length
              )
            }
          >
            <AnimatePresence initial={false}>
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className={`flex-shrink-0 w-full ${
                      visibleCards === 1
                        ? "sm:w-full"
                        : visibleCards === 2
                        ? "sm:w-1/2"
                        : visibleCards === 3
                        ? "sm:w-1/3"
                        : "sm:w-1/4"
                    } p-4`}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="w-full text-center py-8">
                  <p className="text-xl">Loading featured products...</p>
                </div>
              )}
            </AnimatePresence>
          </div>
          {currentFeaturedCard > 0 && (
            <div className="absolute inset-y-0 left-0 flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  scrollCards(
                    "left",
                    setCurrentFeaturedCard,
                    featuredCardContainerRef,
                    featuredProducts.length
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full z-10 flex items-center justify-center w-10 h-10"
              >
                <FiChevronLeft className="text-2xl" />
              </motion.button>
            </div>
          )}
          {currentFeaturedCard < featuredProducts.length - visibleCards && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  scrollCards(
                    "right",
                    setCurrentFeaturedCard,
                    featuredCardContainerRef,
                    featuredProducts.length
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full z-10 flex items-center justify-center w-10 h-10"
              >
                <FiChevronRight className="text-2xl" />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col md:flex-row mt-20 gap-2">
        {quoteImages.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 h-64 md:h-96 bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-start justify-center p-4">
              <h2
                className={`text-2xl md:text-3xl font-bold ${item.textColor} text-center`}
              >
                {item.quote}
              </h2>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-skeleton-pulse"></div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
