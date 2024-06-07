import { useState, useEffect, useRef } from "react";
import menuItems from "../data/menuItems.json";
import { IoIosSearch } from "react-icons/io";

export default function Menu() {
  const categoryRefs = useRef({});
  const productContainerRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (category) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
    setActiveCategory(category);
  };

  useEffect(() => {
    const firstCategory = Object.keys(menuItems)[0];
    setActiveCategory(firstCategory);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = productContainerRef.current.scrollTop
      let selectedCategory = activeCategory

      Object.keys(categoryRefs.current).forEach(category => {
        const categoryElement = categoryRefs.current[category]
        const {offsetTop, offsetHeight} = categoryElement

        if(scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight){
          selectedCategory = category
        }

        if(selectedCategory !== category){
          setActiveCategory(selectedCategory)
        }
      })
    };

    const productContainer = productContainerRef.current
    productContainer.addEventListener("scroll", handleScroll);

    return () => {
      productContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <img
        src="/images/logo.jpg"
        className="fixed h-full object-cover blur-sm"
        alt=""
      /> */}
      <div className="font-publicSans box-border text-black h-lvh flex flex-col ">
        <div className="fixed [writing-mode:vertical-lr] rotate-180 flex flex-row-reverse justify-center flex-stretch h-lvh bg-[var(--pink)]">
          {Object.keys(menuItems).map((category) => (
            <div
              onClick={() => {
                handleCategoryClick(category);
              }}
              key={category}
              className="relative cursor-pointer bg-[var(--pink)] flex flex-col items-center h-[120px]"
            >
            {activeCategory === category ? 
            <>
              <b className="absolute bottom-[30px] w-full bg-white h-[20px] 
              before:absolute 
              before:bottom-0 
              before:left-0
              before:w-full
              before:h-full
              before:bg-[var(--pink)]
              before:rounded-tl-[12px]"></b>
              <b className="absolute top-[30px] w-full bg-white h-[20px] 
              before:absolute 
              before:bottom-0 
              before:left-0
              before:w-full
              before:h-full
              before:bg-[var(--pink)]
              before:rounded-bl-[12px]"></b>
            </>
            : ''
            }
              <div
                className={`bg-[var(--pink)] h-[30px] w-[20px] ${
                  activeCategory === category ? "bg-white rounded-r-[20px]" : ""
                }`}
              ></div>
              <button
                className={`m-[5px] w-[30px] z-10 py-[10px]  ${
                  activeCategory === category ? "" : ""
                }`}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
        <div className="fixed z-10 p-[25px] ml-[80px] w-full ">
          <div className="text-3xl pb-[20px]">Welcome!</div>
          <div className="relative">
            <IoIosSearch className="absolute left-[5px] top-[8px] text-[20px]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[var(--light-grey)] ps-[30px] p-[5px] rounded w-full focus:outline-none"
            />
          </div>
        </div>
        <div 
        ref={productContainerRef}
        className="flex relative mt-[140px] p-[25px] overflow-auto">
          <div className="text-black ml-[80px]">
            {Object.keys(menuItems).map((category) => (
              <div
                className="flex flex-col w-full"
                key={category}
                ref={(el) => {
                  categoryRefs.current[category] = el;
                }}
              >
                {/* products */}
                {menuItems[category].map((item) => (
                  <div
                    className="drop-shadow-md bg-[var(--bg-main)]  mb-[20px] rounded"
                    key={item.name}
                  >
                    <img
                      className="w-full h-[200px] object-cover rounded"
                      src={item.image}
                      alt=""
                    />
                    <div className="p-[15px]">
                      <div className="flex justify-between items-center">
                        <div className="text-[17px] tracking-wide">
                          {item.name}
                        </div>
                        <div className="text-[14px] font-semibold">Price</div>
                      </div>
                      <div className="flex mt-[5px]">
                        {Object.keys(item.prices).map((size) => (
                          <span
                            className="bg-[var(--light-grey)] mr-1 p-2 text-center"
                            key={size}
                          >
                            <div className="text-[14px]">
                              {item.prices[size]}
                            </div>
                            <div className="text-[12px]">{size}</div>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
