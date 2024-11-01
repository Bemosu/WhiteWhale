import MainProductCard from '@/components/ui/MainProductCard';
import { ProductCard } from '@/lib/utils';
import { useFetchProductCardData } from '@/hooks/UseFetchData';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductCategory } from '@/components/context/ProductCategoryContext';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Label } from '@radix-ui/react-label';

interface CategorizedProducts {
  [category: string]: ProductCard[];
}

interface MainPageLayOutProps {
  sortOption: string;
}

const MainPageLayOut: React.FC<MainPageLayOutProps> = ({ sortOption }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useFetchProductCardData(sortOption || '');
  const { setCategory } = useProductCategory();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  const categorizedProducts = products?.reduce<CategorizedProducts>(
    (acc, product) => {
      const category = product.productCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {},
  );

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    navigate('/Products');
  };

  return (
    <div className="main-page-layout p-20 ">
      {categorizedProducts &&
        Object.entries(categorizedProducts).map(([category, productsIndex]) => (
          <div key={category} className="category-section">
            <Label className="mt-4 font-bold">{category}</Label>
            <button
              className="absolute right-64 text-sm cursor-pointer hover:underline hover:text-white"
              onClick={() => handleCategoryClick(category)}
              type="button"
            >
              전체보기
            </button>
            <hr className="border-t border-gray-300 m-5" />
            <Carousel
              opts={{ loop: true }}
              plugins={[]}
              orientation="horizontal"
              setApi={() => {}}
            >
              <CarouselContent>
                {productsIndex.map(product => (
                  <CarouselItem key={product.id} className="basis-1/5">
                    <MainProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ))}
    </div>
  );
};

export default MainPageLayOut;
