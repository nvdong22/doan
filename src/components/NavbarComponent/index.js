import styles from './NavbarComponent.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Checkbox } from 'antd';

const cx = classNames.bind(styles);
function NavbarComponent({ ...rest }) {
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(true);
    };
    const handleShowLess = () => {
        setShowMore(false);
    };
    const onChange = (value) => {
        console.log(value);
    };
    return (
        <div {...rest}>
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
                    <button className={`${cx('btn-category')} ${showMore ? cx('none-btn') : ''}`} onClick={handleShowMore}>
                        <span className={cx('btn-text')}>
                            Xem thêm
                            <AiOutlineDown />
                        </span>
                    </button>
                    <button className={`${cx('btn-category')} ${!showMore ? cx('none-btn') : ''}`} onClick={handleShowLess}>
                        <span className={cx('btn-text')}>
                            Rút gọn
                            <AiOutlineUp />
                        </span>
                    </button>
                </div>
                <div className={cx('title-price')}>Giá</div>
                <div className={cx('price-product')}>
                    <Checkbox.Group onChange={onChange}>
                        <div className={cx('list-price-product')}>
                            <span>
                                <Checkbox className={cx('box-price')} value={'0đ - 150.000đ'}>
                                    0đ - 150.000đ
                                </Checkbox>
                            </span>
                            <span>
                                <Checkbox className={cx('box-price')} value={'150.000đ - 300.000đ'}>
                                    150.000đ - 300.000đ
                                </Checkbox>
                            </span>
                            <span>
                                <Checkbox className={cx('box-price')} value={'300.000đ - 500.000đ'}>
                                    300.000đ - 500.000đ
                                </Checkbox>
                            </span>
                            <span>
                                <Checkbox className={cx('box-price')} value={'500.000đ'}>
                                    500.000đ - trở lên
                                </Checkbox>
                            </span>
                        </div>
                    </Checkbox.Group>
                </div>
            </div>
        </div>
    );
}

export default NavbarComponent;
