/* eslint-disable */
import { CATEGORIES_COMPLAINTS } from '@/api/constant_select'

export default function reverseMethod (number) {
  let methods = CATEGORIES_COMPLAINTS
  let method = null
  methods.forEach(item => {
    if (item.value === number) {
      method = item
    }
  })
  return method
}
