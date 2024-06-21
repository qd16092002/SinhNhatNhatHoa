import Header from '../components/Header'
import Profile2 from '@src/containers/app/feature/User/pages/Profile2'

function ProfileLayout2({ children }) {
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          // marginLeft: '86px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'fixed' }}>
          <Profile2 />
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}

export default ProfileLayout2
