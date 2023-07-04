import React from 'react';
import styles from './category.module.scss';
import classNames from 'classnames/bind';
import FillterLeft from './FillterLeft';
import ListProduct from './ListProduct';
import { data } from '../../assets/data';
const cx = classNames.bind(styles);
function Category() {
    return (
        <main>
            <div className={cx('container')}>
                <div className="tc">
                    <p>TRANG CHỦ</p>
                </div>
                <div className={cx('container-inner')}>
                    <FillterLeft />
                    <ListProduct listProduct={data} />
                </div>
            </div>
        </main>
    );
}

export default Category;
