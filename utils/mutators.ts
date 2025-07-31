
export const useBooleanToggler = function(booleanRef: Ref,inverted:boolean =false){
    return (isTrueOrFalse: boolean)=>{
        booleanRef.value = inverted ? !isTrueOrFalse :isTrueOrFalse;
    }
}
