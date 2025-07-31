
export  const useLoader = () => {
    const isLoading = ref(false)
    function startLoading(){
        isLoading.value = true
    }

    function endLoading(){
        isLoading.value = false
    }

    return {
        isLoading,
        startLoading,
        endLoading
    }
}
