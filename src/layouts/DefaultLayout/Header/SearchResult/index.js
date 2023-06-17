import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';

const cx = classNames.bind(styles);
function SearchResult() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('produce')}
                src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_41914.jpg"
                alt=""
            />
            <div className={cx('info')}>
                <p className={cx('name')}>Alice In Borderland - Tập 11 </p>
                <div className={cx('price')}>
                    <span className={cx('current-price')}>30.800 đ</span>
                    <span className={cx('old-price')}>35.000</span>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
