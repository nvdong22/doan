import React, { useState } from 'react';
import styles from './Fillter.module.scss';
import classNames from 'classnames/bind';
import iconUp from './assets/images/angle-up-solid.svg';
import iconDown from './assets/images/angle-down-solid.svg';
const cx = classNames.bind(styles);

function FillterLeft() {
    const [status, setStatus] = useState(false);

    function handleShowMore() {
        setStatus(true);
    }
    function handleHide() {
        setStatus(false);
    }

    return (
        <div className={cx('container-inner_left')}>
            <ul className={cx('container-inner_left_list')}>
                <li className={cx('container-inner_left_item')}>
                    <h3 className={cx('inner_left_item_title')}>nhóm sản phẩm</h3>
                    <p className={`${cx('inner_left_item_category')} ${cx('inner_left_item-text')}`}>All category</p>
                    <h4 className={cx('inner_left_item-category-VN')}>sách tiếng việt</h4>
                    <ul className={`${cx('inner_left_item-category-list')} ${status ? cx('show-more') : ''}`}>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                Thiếu nhi
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                sách giáo khoa
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                văn học
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                kinh tế
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                thiếu nhi
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                văn học
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                toán
                            </a>
                        </li>

                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                đề
                            </a>
                        </li>
                        <li className={cx('inner_left_item-category-item')}>
                            <a className={cx('inner_left_item-text')} href="">
                                khách hàng
                            </a>
                        </li>
                    </ul>

                    <button
                        className={`${cx('btn-category')} ${status ? '' : cx('show-category')}`}
                        onClick={handleShowMore}
                    >
                        <span>xem thêm</span> <img src={iconDown} />
                    </button>
                    <button
                        className={`${cx('btn-category')} ${status ? cx('show-category') : ''}`}
                        onClick={handleHide}
                    >
                        <span>rút gọn</span> <img src={iconUp} />
                    </button>
                </li>
                <li className="inner_left_prive">
                    <h3 className={cx('inner_left_item_title')}>giá</h3>
                    <ul className={cx('list_prive')}>
                        <li className={cx('item_prive')}>
                            <input type="radio" value="0 - 150000" id="prive" name="h" />
                            <label for="prive">0đ - 150.000đ</label>
                        </li>
                        <li className={cx('item_prive')}>
                            <input type="radio" value="150000 - 300000 " id="prive1" name="h" />
                            <label for="prive1">150.000đ - 300.000đ</label>
                        </li>
                        <li className={cx('item_prive')}>
                            <input type="radio" value="300000 -" id="prive2" name="h" />
                            <label for="prive2">300.000đ - 500.000đ</label>
                        </li>
                        <li className={cx('item_prive')}>
                            <input type="radio" value="150000" id="prive3" name="h" />
                            <label for="prive3">500.000 - trở lên</label>
                        </li>
                        <li className={cx('item_prive')}>
                            <input type="radio" value="150000" id="prive4" name="h" />
                            <label for="prive4">tất cả</label>
                        </li>
                        <li className={cx('item_prive')}>
                            <input type="radio" value="150000" id="prive5" name="h" />
                            <label for="prive5">lọc sản phẩm từ a đến z </label>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default FillterLeft;
