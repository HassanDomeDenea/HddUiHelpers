import { useRoute } from 'vue-router';

export const useRouteQueryBinder = (queryName: MaybeRef<string>, validateQuery?: (_queryValue: string) => boolean) => {
    const queryNameRef = toRef(queryName);
    const route = useRoute();
    const router = useRouter();
    const currentValue = ref(((route.query[queryNameRef.value] as string|number)) ?? null);
    const routeValue = computed(() => route.query[queryNameRef.value] as string);

    function setQueryValueIfValid(_queryValue: string) {
        if (_queryValue === currentValue.value) return;
        if (validateQuery) {
            if (validateQuery(_queryValue)) {
                currentValue.value = _queryValue;
            }
        } else {
            currentValue.value = _queryValue;
        }
    }

    function updateQueryFromRoute() {
        if (typeof routeValue.value === 'string') {
            setQueryValueIfValid(routeValue.value as string);
        } else if (currentValue.value) {
            router.replace({ query: { ...route.query, [queryNameRef.value]: currentValue.value } }).then();
        } else if (currentValue.value !== routeValue.value) {
            router.replace({ query: { ...route.query, [queryNameRef.value]: currentValue.value } }).then();
        }
    }

    onActivated(() => {
        updateQueryFromRoute();
    });

    watch(currentValue, (_queryValue) => {
        if (routeValue.value) {
            router.push({ query: { ...route.query, [queryNameRef.value]: _queryValue } }).then();
        } else {
            router.replace({ query: { ...route.query, [queryNameRef.value]: _queryValue } }).then();
        }
    });

    return {currentValue}
};
