import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { Rating, Stack } from '@mui/material';

const cx = classNames.bind(styles);

function ProductCard(props) {
    const { image, name, price, pricesale, rating, sold, discount, chapter } = props;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-item-img')}>
                <img className={cx('product-img')} src={image} alt="" />
            </div>
            <div className={cx('product-des')}>
                <p className={cx('product-name')}>{name}</p>
                <div className={cx('product-price')}>
                    <span className={cx('current-price')}>{pricesale}.000</span>
                    {chapter ? <span className={cx('chapter')}>Tập {chapter}</span> : <></>}
                </div>
                <div className={cx('old-price')}>{price}.000</div>
                <div className={cx('rating')}>
                    <Stack spacing={1}>
                        <Rating
                            name="half-rating-read"
                            style={{ fontSize: '2rem' }}
                            className={cx('rating-icon')}
                            defaultValue={rating}
                            precision={0.1}
                            readOnly
                        />
                    </Stack>
                    <span className={cx('rate-text')}>({rating})</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
