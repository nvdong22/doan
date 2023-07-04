import styles from './ListProduct.module.scss';
import classNames from 'classnames/bind';
import ProductItem from './ProductItem';
const cx = classNames.bind(styles);

function ListProduct(props) {
    const { listProduct } = props;
    return (
        <div className={cx('container-inner_right')}>
            {listProduct.map((item) => {
                return <ProductItem key={item.id} dataProduct={item} />;
            })}
        </div>
    );
}

export default ListProduct;
