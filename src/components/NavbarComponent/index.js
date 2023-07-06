import styles from './NavbarComponent.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Checkbox } from 'antd';

const cx = classNames.bind(styles);
function NavbarComponent() {
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(true);
    };
    const handleShowLess = () => {
        setShowMore(false);
    };
    return (
        <div>
            <div className={cx('home')}>
                <span className={cx('text-home')}>
                    TRANG CHỦ
                    <MdNavigateNext />
                </span>
                <span className={cx('text-cate')}>ANIME</span>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('type-product')}>
                    <h3 className={cx('title')}>Nhóm sản phẩm</h3>
                    <p className={cx('list')}>Tất cả nhóm sản phẩm</p>
                    <div className={cx(`${cx('list-item')} ${showMore ? cx('show-more') : ''}`)}>
                        <p className={cx('item')}>Thiếu nhi</p>
                        <p className={cx('item')}>Giáo Khoa - Tham Khảo</p>
                        <p className={cx('item')}>Văn Học</p>
                        <p className={cx('item')}>Manga - Comic</p>
                        <p className={cx('item')}>Sách Học Ngoại Ngữ</p>
                    </div>
                    <button
                        className={`${cx('btn-category')} ${showMore ? cx('none-btn') : ''}`}
                        onClick={handleShowMore}
                    >
                        <span>Xem thêm</span>
                        <AiOutlineDown />
                    </button>
                    <button
                        className={`${cx('btn-category')} ${!showMore ? cx('none-btn') : ''}`}
                        onClick={handleShowLess}
                    >
                        <span>Rút gọn</span>
                        <AiOutlineUp />
                    </button>
                </div>
                <div className={cx('title-price')}>Giá</div>
                <div className={cx('price-product')}>
                    <span>
                        <Checkbox className={cx('box-price')}>0đ - 150.000đ</Checkbox>
                    </span>
                    <span>
                        <Checkbox className={cx('box-price')}>150.000đ - 300.000đ</Checkbox>
                    </span>
                    <span>
                        <Checkbox className={cx('box-price')}>300.000đ - 500.000đ</Checkbox>
                    </span>
                    <span>
                        <Checkbox className={cx('box-price')}>500.000đ - trở lên</Checkbox>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NavbarComponent;
