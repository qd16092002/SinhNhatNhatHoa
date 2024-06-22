import classNames from 'classnames/bind'
import styles from './TimeLine.module.sass'
import { IconTymTimeline } from '@src/assets/svgs'


const cx = classNames.bind(styles)

function TimeLine() {

  return (
    <div className={cx('home-wrapper')}>

      <div>
        <div className={cx('box1')}>
          1. 16h30 Đi đạp vịt hồ tây
          <img style={{
            height: '80%'
          }} alt='asdas' src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fimages.jpg?alt=media&token=2705face-1fc8-4ffa-9e1e-ddba50bd0366'>
          </img>
        </div>
        <div className={cx('box2')}>
          2. 18h30 Đi ăn Cocoichibanya TTTM Lotte Mall Hà Nội
          <img style={{
            height: '80%',
            width: '100%'
          }} alt='asdas' src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fimages%20(1).jpg?alt=media&token=d06e2933-b115-48e8-852d-1e95b38d202c'>
          </img>
        </div>
      </div>
      <IconTymTimeline />
      <div>
        <div className={cx('box3')}>3. 20h00 Đi musicbox tại 191 Quan Hoa cầu giấy
          <img style={{
            height: '80%',
            width: '100%'
          }} alt='asdas' src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2F448428641_122151956000155814_2599818952772979823_n.jpg?alt=media&token=975bf5cc-b94d-4ce0-9e58-4ffe3e9f847c'>
          </img>
        </div>

        <div className={cx('box4')}>4. 21h00 Về cất đồ và đi dạo 1 vòng hồ tây với em bé - Có thể lên phố đi bộ cũng được ạaaa
          <img style={{
            height: '80%',
            width: '100%'
          }} alt='asdas' src='https://firebasestorage.googleapis.com/v0/b/investy-b17a1.appspot.com/o/Hoa%2Fdia-diem-check-in-ho-tay-1.webp?alt=media&token=f863a284-439a-40cd-9ef4-ab618623586e'>
          </img>
        </div>
      </div>
    </div>
  )
}

export default TimeLine
