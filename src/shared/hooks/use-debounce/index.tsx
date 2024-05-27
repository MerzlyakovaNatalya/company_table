interface UseDebounce {
  (...args: any[]): void
}

function useDebounce(callback: (...args: any[]) => void, delay: number): UseDebounce {
  let timer: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export default useDebounce
