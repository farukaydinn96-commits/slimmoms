import { useEffect, useRef, useState } from 'react';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ products, onDelete }) => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  useEffect(() => {
    const updateScrollbar = () => {
      const container = containerRef.current;
      const list = listRef.current;

      if (!container || !list) {
        return;
      }

      const containerHeight = container.clientHeight;
      const contentHeight = list.scrollHeight;

      if (contentHeight <= containerHeight) {
        setThumbHeight(containerHeight);
        setThumbTop(0);
        return;
      }

      const height = Math.max(
        24,
        (containerHeight / contentHeight) * containerHeight
      );

      setThumbHeight(height);
      setThumbTop(
        (container.scrollTop / (contentHeight - containerHeight)) *
          (containerHeight - height)
      );
    };

    updateScrollbar();

    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.addEventListener('scroll', updateScrollbar);
    window.addEventListener('resize', updateScrollbar);

    return () => {
      container.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
    };
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.scrollContainer}>
        <ul ref={listRef} className={styles.list}>
          {products.map(product => (
            <DiaryProductsListItem
              key={product.id}
              product={product}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>

      <div className={styles.scrollbar}>
        <div
          className={styles.scrollThumb}
          style={{
            height: `${thumbHeight}px`,
            transform: `translateY(${thumbTop}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default DiaryProductsList;
