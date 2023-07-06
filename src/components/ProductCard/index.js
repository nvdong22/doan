import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';

const cx = classNames.bind(styles);

function ProductCard(props) {
    const { image, name, price, pricesale, rating, sold, discount, chapter, id } = props;
    const navigate = useNavigate();
    const handleDetailProduct = () => {
        navigate(`/product/${id}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-item-img')} onClick={() => handleDetailProduct(id)}>
                <img className={cx('product-img')} src={image} alt="" />
            </div>
            <div className={cx('product-des')}>
                <p className={cx('product-name')}>{name}</p>
                <div className={cx('product-price')}>
                    <span className={cx('current-price')}>{pricesale.toLocaleString()}</span>
                    {chapter ? <span className={cx('chapter')}>Tập {chapter}</span> : <></>}
                </div>
                <div className={cx('old-price')}>{price.toLocaleString()}</div>
                <div className={cx('rating')}>
                    <Rate style={{ fontSize: '1.4rem' }} allowHalf disabled value={rating} />

                    <span className={cx('rate-text')}>({rating})</span>
                    <div style={{ display: 'none' }}>
                        <span className={cx('rate-text')}>({sold})</span>
                        <span className={cx('rate-text')}>({discount})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
