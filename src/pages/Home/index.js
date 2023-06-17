import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Banner from './Banner';
const cx = classNames.bind(styles);

function Home() {
    return (
        <h2 className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Banner />
            </div>
        </h2>
    );
}

export default Home;
