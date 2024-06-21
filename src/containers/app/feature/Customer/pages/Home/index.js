import classNames from 'classnames/bind';
import styles from './Home.module.sass';
import { useEffect, useState } from 'react';
import { IconMuiten, IconTymHome } from '@src/assets/svgs/Home';

const cx = classNames.bind(styles);
const TABS = {
  DEFAULT: {
    code: 'DEFAULT'
  },
  ACTIVETAB: {
    code: 'ACTIVETAB'
  }
};

function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.DEFAULT);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setLoading(false); // Set loading to false when complete
            setActiveTab(TABS.ACTIVETAB); // Switch tab when loading is complete
            return 100;
          }
          return prevProgress + 1;
        });
      }, 30); // Speed of progress increase, you can adjust this value
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleButtonClick = () => {
    setLoading(true);
    setProgress(0);
  };

  return (
    <div className={cx('home-wrapper')}>
      {activeTab.code === TABS.DEFAULT.code && (
        <>
          <div className={cx('box_button')}>
            <div className={cx('title_1')}>Sẵn sàng chưa nè</div>
            <div className={cx('title_2')}>Em có mong chờ khum?</div>
            <div className={cx('list_button')}>
              <button
                onClick={handleButtonClick}
                className={cx('button1')}
              >
                Cóooooooooo
              </button>
              <button
                onClick={handleButtonClick}
                className={cx('button2')}
              >
                Siêu siêu chờ
              </button>
            </div>
          </div>
          {loading && (
            <div className={cx('footer')}>
              <div className={cx('bgloading')}>
                <div className={cx('loading')} style={{ width: `${progress}%` }}></div>
              </div>
              <div className={cx('line2')}>
                <div className={cx('text')}>Loadinggg ...</div>
                <div className={cx('text')}>{progress}%</div>
              </div>
            </div>
          )}
        </>
      )}
      {activeTab.code === TABS.ACTIVETAB.code && (
        <div className={cx('tabactive')}>
          <div className={cx('line')}>
            <div className={cx('title_activetab')}>Bấm vào tab phía trên để thấy điều bất ngờ nhó</div>
            <IconTymHome />
            <div className={cx('icon', 'fade-up')}><IconMuiten /></div>
          </div>
          <div className={cx('date')}>June, 2024</div>
          <img
            className={cx('calendar')}
            src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fimage%2033.png?alt=media&token=973ba395-8e11-48de-a327-efe32f2b108a'
            alt='calendar0'
          ></img>
        </div>
      )}
    </div>
  );
}

export default Home;
