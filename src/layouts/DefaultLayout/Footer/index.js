import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <h2 className={cx('wrapper')}>
            <div className={cx('inner')}>Footer</div>
        </h2>
    );
}

export default Footer;
