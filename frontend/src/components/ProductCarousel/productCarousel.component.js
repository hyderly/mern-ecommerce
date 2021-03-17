import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {Carousel, Image} from 'react-bootstrap';



import WithSpinner from '../WithSpinner/with-spinner.component';
import ErrorMessage from '../ErrorMessage/error-message.component';

// redux
import {listTopProducts} from '../../redux/product/product.actions';

import "./productCarousel.syles.css";


const TopCarousel = () => {
    const dispatch = useDispatch();
    const productTopRated = useSelector(state => state.productTopRated);
    const {loading, error, products} = productTopRated;


    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch]);

    return loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Carousel pause='hover' className='bg-dark'>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )
}


export default TopCarousel;