import styles from './Product.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ProductItem(props) {
    const {
        dataProduct: { nameProduct, price, oddPrice, part, sold, sale, salePercent, productImage },
    } = props;
    return (
        <div className={cx('flash-sale_item-product')}>
            <div className={`${cx('flash-sale_item-product_img')} ${sale ? cx('show') : ''}`}>
                <div className={cx('sale')}>{salePercent}</div>
                <div className={cx('sale_item-product_img')}>
                    <a href="">
                        <img src={productImage} alt="" />
                    </a>
                </div>
            </div>
            <div className={cx('flash-sale_item-product-bottom')}>
                <a href="">
                    <p className={cx('flash-sale_item-product-title')}>{nameProduct}</p>
                </a>
                <div className={cx('flash-sale-money-sale')}>
                    <span className={cx('sale-money')}>{price}</span>
                    <span className={cx('flash-sale-chapter')}> tập {part}</span>
                </div>
                <span className={cx('flash-sale-money')}>{oddPrice}</span>
                <div className={cx('flashsale-item-progress-value')}>
                    <p>đã bán {sold}</p>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
