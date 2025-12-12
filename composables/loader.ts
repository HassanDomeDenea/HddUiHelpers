export const useLoader = () => {
  const isLoading = ref(false)
  const isLoadedOnce = ref(false)
  function startLoading() {
    isLoading.value = true
  }

  function endLoading() {
    isLoading.value = false
    if (!isLoadedOnce.value) {
      isLoadedOnce.value = true
    }
  }
  return {
    isLoadedOnce,
    isLoading,
    startLoading,
    endLoading,
  }
}
