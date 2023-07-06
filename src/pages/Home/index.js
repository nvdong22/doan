import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Banner from './Banner';
import ProductCard from '~/components/ProductCard';
import * as ProductService from '~/service/ProductService';
import { useQuery } from 'react-query';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };
    const { data: products } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });
    return (
        <div className={cx('wrapper')}>
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
                                id={product._id}
                            />
                        );
                    })}
                </div>
                <Button more className={cx('btn-more')}>
                    Xem thêm
                </Button>
            </div>
        </div>
    );
}

export default Home;
