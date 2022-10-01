import { useState, useEffect, Children, cloneElement } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PAGE_WIDTH = 450

export const Carousel = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);

  const HandleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + PAGE_WIDTH
      return Math.min(newOffset, 0)
    })
  }

  const HandleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - PAGE_WIDTH
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1))

      return Math.max(newOffset, maxOffset)
    })
  }


  useEffect(() => {
    setPages(
      Children.map(children, (child) =>{
        return cloneElement(child, {
          style:{
            height: '100%',
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`,
          },
        })
      })
    )
  }, [])

  return(
    <div className="carousel-container">
      <FaChevronLeft className="arrow" onClick={HandleLeftArrowClick} />
      <div className="carousel-window">
        <div
          className="carousel-items-container"
          style={{
            transform: `translateX(${offset}px)`
          }}
        >
          { pages }
        </div>
      </div>
      <FaChevronRight className="arrow" onClick={HandleRightArrowClick} />
    </div>
  )
}
