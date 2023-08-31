/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import debounceLodash from 'lodash.debounce'

export const useDebounce = (method: any, dependencies: any[], delay = 500) => {
  const request = method ? debounceLodash(method, 500) : () => {}
  const debounce = useCallback(request, [...dependencies]) //allows sending only 1 request after the debounce

  return debounce
}
