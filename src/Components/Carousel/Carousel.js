import { useState, useEffect, useRef, Children, cloneElement } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { CarouselContext } from './carousel-context';
import { Page } from "./Page";

const TRANSITION_DURATION = 300;

export const Carousel = ({ children, infinite }) => {
  {/*
  *PARAMS:
  infinite - infinite scroll
  
  *COMMENTS:
  demands 2160x1080 images
  */}
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(450);
  const [transitionDuration, setTransitionDuration] = useState(TRANSITION_DURATION);
  const [clonesCount, setClonesCount] = useState({ head: 0, tail: 0 });

  const CarouselWindowRef = useRef();

  useEffect(() => {
    if(infinite){
      setPages([
        cloneElement(children[Children.count(children) - 1]),
        ...children,
        cloneElement(children[0]),
      ])
      setClonesCount({ head: 1, tail: 1 })
      return
    }
    setPages(children)
  }, [children, infinite])

  useEffect(() => {
    const resizeHandler = () => {
      const _width = CarouselWindowRef.current.offsetWidth;
      setWidth(_width)
      setOffset(-clonesCount.head * width)
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [clonesCount, width])

  useEffect(() => {
    if(!infinite) return

    if(offset == 0){
      setTimeout(() => {
        setTransitionDuration(0)
        setOffset(-(width * (pages.length - 1 - clonesCount.tail)))
      }, TRANSITION_DURATION)
      return
    }
    if(offset == -(width * (pages.length - 1))){
      setTimeout(() => {
        setTransitionDuration(0)
        setOffset(-(width * clonesCount.head))
      }, TRANSITION_DURATION)
      return
    }
  }, [infinite, offset, width, pages, clonesCount])

  useEffect(() => {
    if(transitionDuration === 0){
      setTimeout(() => {
        setTransitionDuration(TRANSITION_DURATION)
      }, 50)
    }
  }, [transitionDuration])


  const HandleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + width
      return Math.min(newOffset, 0)
    })
  }

  const HandleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - width
      const maxOffset = -(width * (pages.length - 1))

      return Math.max(newOffset, maxOffset)
    })
  }

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      HandleRightArrowClick()
    }, 7000);

    return () => clearInterval(carouselInterval)
  }, [width, pages])

  return(
    <CarouselContext.Provider value={{ width }}>
      <div className="carousel-container">
        <div className="arrow-container">
          <FaChevronLeft className="arrow arrow-left" onClick={HandleLeftArrowClick} />
        </div>
        <div className="carousel-window" ref={CarouselWindowRef}>
          <div
            className="carousel-items-container"
            style={{
              transitionDuration: `${transitionDuration}ms`,
              transform: `translateX(${offset}px)`,
            }}
          >
            { pages }
          </div>
        </div>
        <div className="arrow-container">
          <FaChevronRight className="arrow arrow-right" onClick={HandleRightArrowClick} />
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

Carousel.Page = Page
