import { Col } from 'antd'
import SettingsMobile from '../SettingsMobile'
import SettingsPC from '../SettingsPC'

function Settings() {
  return (
    <div>
      <Col lg={0} md={24} xs={24} sm={24}>
        <SettingsMobile />
      </Col>
      <Col lg={24} md={0} xs={0} sm={0}>
        <SettingsPC />
      </Col>
    </div>
  )
}
export default Settings
