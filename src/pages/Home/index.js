import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Banner from './Banner';
import ProductCard from '~/components/ProductCard';
import * as ProductService from '~/service/ProductService';
import { useQuery } from 'react-query';
const cx = classNames.bind(styles);

function Home() {
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProducts();
        console.log('res', res);

        return res;
    };
    const { data: products } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });

    console.log('data', products);
    return (
        <h2 className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Banner />
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
                            />
                        );
                    })}
                </div>
            </div>
        </h2>
    );
}

export default Home;
