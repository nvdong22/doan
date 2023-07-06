import classNames from 'classnames/bind';

import styles from './SearchPage.module.scss';
import ProductCard from '~/components/ProductCard';
import * as ProductService from '~/service/ProductService';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '~/components/LoadingComponent';
const cx = classNames.bind(styles);

function SearchPage() {
    const fetchProductAll = async (search) => {
        const res = await ProductService.getAllProducts(search);
        if (search.length > 0) {
            setStateProduct(res?.data);
        } else {
            return res;
        }
    };
    const { data: products, isLoading } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });
    const searchProduct = useSelector((state) => state?.product?.search);
    const [stateProduct, setStateProduct] = useState([]);
    useEffect(() => {
        if (!searchProduct) {
            return;
        }
        fetchProductAll(searchProduct);
    }, [searchProduct]);

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data);
        }
    }, [products]);

    return (
        <Loading isLoading={isLoading}>
            <h2 className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('list-product')}>
                        {stateProduct?.map((product) => {
                            return (
                                <ProductCard
                                    key={product._id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    pricesale={product.pricesale}
                                    rating={product.rating}
                                    sold={product.sold}
                                    discount={product.discount}
                                    chapter={product.chapter}
                                    id={product._id}
                                />
                            );
                        })}
                    </div>
                </div>
            </h2>
        </Loading>
    );
}

export default SearchPage;
