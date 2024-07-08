import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaSeedling,
  FaCarrot,
  FaRecycle,
  FaShoppingCart,
} from "react-icons/fa";
import { MdLocalFlorist } from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiInfo } from "react-icons/fi";

const HomePage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentFeaturedCard, setCurrentFeaturedCard] = useState(0);
  const cardContainerRef = useRef(null);
  const featuredCardContainerRef = useRef(null);

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

  const featuredProducts = [
    {
      title: "Organic Apples",
      price: "$2.99/lb",
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Fresh Broccoli",
      price: "$1.99/head",
      image:
        "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Organic Strawberries",
      price: "$3.99/pint",
      image:
        "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Fresh Spinach",
      price: "$2.49/bunch",
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Organic Tomatoes",
      price: "$3.49/lb",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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

  const scrollCards = (
    direction,
    setCurrentCardFunction,
    containerRef,
    totalCards
  ) => {
    setCurrentCardFunction((prev) => {
      const newCard = prev + (direction === "left" ? -1 : 1);
      return Math.max(0, Math.min(newCard, totalCards - 4));
    });
  };

  useEffect(() => {
    const container = cardContainerRef.current;
    if (container) {
      container.scrollTo({
        left: currentCard * (container.offsetWidth / 4),
        behavior: "smooth",
      });
    }
  }, [currentCard]);

  useEffect(() => {
    const container = featuredCardContainerRef.current;
    if (container) {
      container.scrollTo({
        left: currentFeaturedCard * (container.offsetWidth / 4),
        behavior: "smooth",
      });
    }
  }, [currentFeaturedCard]);

  const ProductCard = ({ product }) => (
    <div className="rounded-lg shadow-md overflow-hidden h-full bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">
          {product.title}
        </h3>
        <p className="text-center text-green-600 font-bold mb-4">
          {product.price}
        </p>
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm flex items-center transition duration-300 ease-in-out transform hover:scale-105">
            <FiInfo className="mr-1" /> Details
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm flex items-center transition duration-300 ease-in-out transform hover:scale-105">
            <FaShoppingCart className="mr-1" /> Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row h-screen md:h-[60vh] gap-2 mt-20"
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
            className="text-4xl font-bold mb-2"
          >
            Fresh Organic Vegetables
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl mb-4"
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
            className="text-3xl font-bold mb-2"
          >
            Organic Fruits
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg mb-4"
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
        <h2 className="text-3xl font-bold text-center mb-8">Our Specialties</h2>
        <div className="relative w-full">
          <div
            ref={cardContainerRef}
            className="flex overflow-hidden scroll-smooth w-full"
          >
            <AnimatePresence initial={false}>
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-1/4 p-4"
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
          {currentCard < cards.length - 4 && (
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
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="relative w-full">
          <div
            ref={featuredCardContainerRef}
            className="flex overflow-hidden scroll-smooth w-full"
          >
            <AnimatePresence initial={false}>
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-1/4 p-4"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
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
          {currentFeaturedCard < featuredProducts.length - 4 && (
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
      <section className="flex mt-20 gap-2">
        {quoteImages.map((item, index) => (
          <div
            key={index}
            className="w-1/3 h-96 bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-start justify-center p-4">
              <h2 className={`text-3xl font-bold ${item.textColor}`}>
                {item.quote}
              </h2>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-skeleton-pulse"></div>
          </div>
        ))}
      </section>
      <section></section>
    </main>
  )
};

export default HomePage;
