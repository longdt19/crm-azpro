/* eslint-disable */
import { STATUS_COMPLAINTS } from '@/api/constant_select'

export default function reverseStatus (number) {
  let statuses = STATUS_COMPLAINTS
  let status = null
  statuses.forEach(item => {
    if (item.value === number) {
      status = item
    }
  })
  return status
}
