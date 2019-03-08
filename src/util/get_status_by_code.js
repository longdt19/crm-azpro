/* eslint-disable */
export default function get_status_by_code (code) {
  if (code === 1) {
    return 'Chờ xử lý'
  }
  if (code === 2) {
    return 'Đang xử lý'
  }
  if (code === 3) {
    return 'Đã xử lý'
  }
  if (code === 4) {
    return 'Hủy'
  }
  if (code === 5) {
    return 'Hoàn thành'
  }
  return ''
}
