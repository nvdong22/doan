import classNames from 'classnames/bind';

import styles from './Introduce.module.scss';
import ProductCard from '~/components/ProductCard';
import * as ProductService from '~/service/ProductService';
import { useQuery } from 'react-query';

const cx = classNames.bind(styles);

function IntroduceProduct() {
    const limit = 5;
    const page = 1;

    const fetchProductAll = async (context) => {
        const search = '';
        //lấy key số 1 trong mảng query
        const page = context?.queryKey && context?.queryKey[1];
        const limit = context?.queryKey && context?.queryKey[2];

        const res = await ProductService.getAllProducts(search, page, limit);
        return res;
    };
    const { data: products } = useQuery(['products', page, limit], fetchProductAll, { retry: 3, retryDelay: 1000 });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('product-top')}>
                    <h2 className={cx('title-product')}>FAHASA GIỚI THIỆU</h2>
                    <div className={cx('list-product')}>
                        {products?.data.map((product) => {
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
                                    countInStock={product.countInStock}
                                    id={product._id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroduceProduct;
