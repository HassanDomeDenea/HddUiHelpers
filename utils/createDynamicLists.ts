import type {Ref, WatchStopHandle} from 'vue'
import reduce from 'lodash/reduce'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'
import usePrimeVueServerUi from "@/HddUiHelpers/utils/usePrimeVueServerUi";

// import { privateChannel } from '~/composables/echo'

export function createListStore(
    url: string,
    options: {
        refreshable?: boolean
        refreshTime?: number
        websocketChangeEvent?: string
        sortBy?: boolean | string
        listenForWebsocket?: boolean
        hasActiveItems?: boolean
        idProperty?: string
        labelProperty?: string
        withoutPagination?: boolean
        channelName?: string
        subscribeToEvents?: (localItems: Ref) => void
    } = {},
) {
    /* const queue = new Queue({
      concurrent: 1,
      interval: 10,
      start: false,
    }) */
    const {axios: apiAxiosInstance} = usePrimeVueServerUi();
    const idProperty = options.idProperty ?? 'id'
    const labelProperty = options.labelProperty ?? 'name'
    const refreshable = options.refreshable ?? true
    const refreshTimeInMinutes = options.refreshTime ?? 5
    // const userStore = useUserStore()
    const localItems = ref<null | any[]>(null)
    const sortItemsBy = options.sortBy ?? true
    const items = computed(() => {
        if (!localItems.value) {
            refresh().then()
        }
        return localItems.value || []
    })
    const activeItems = computed(() => {
        return (items.value || []).map((e: any) => e.is_active === true)
    })
    const inActiveAsDisabledItems = computed(() => {
        return (items.value || []).map((e: any) => {
            e.disabled = !e.is_active
            return e
        })
    })
    const keyLabelItems = computed(() => {
        if (!localItems.value) {
            refresh().then()
        }
        return reduce(
            localItems.value || [],
            (carry, item) => {
                carry[item[idProperty]] = item[labelProperty]
                return carry
            },
            {} as { [k in string]: any },
        )
    })
    const keyValueItems = computed(() => {
        if (!localItems.value) {
            refresh().then()
        }
        return keyBy(localItems.value || [], idProperty)
    })

    const isLoading = ref(false)
    const inActiveIncluded = ref(false)

    function includeInactive(activeStatus: boolean = true): void {
        if (inActiveIncluded.value === activeStatus)
            return
        inActiveIncluded.value = activeStatus
        refresh().then()
    }

    const refreshTimeout = ref<NodeJS.Timeout>()

    async function refresh() {
        if (isLoading.value)
            return
        isLoading.value = true
        clearTimeout(refreshTimeout.value)
        try {
            const params: any = {perPage: -1}
            if (options.hasActiveItems && inActiveIncluded.value !== true) {
                params.filters = {
                    is_active: {
                        operator: 'and',
                        constraints: [{value: 1, matchMode: 'equals'}],
                    },
                }
            }
            const res = await apiAxiosInstance(`/${url}`, {params})
            let responseData
            if (options.withoutPagination) {
                responseData = res.data.data
            } else {
                responseData = res.data.data.data
            }
            if (sortItemsBy) {
                localItems.value = sortBy(
                    responseData,
                    sortItemsBy === true ? 'uses' : sortItemsBy,
                )
            } else {
                localItems.value = responseData
            }
        } finally {
            isLoading.value = false
            if (refreshable) {
                refreshTimeout.value = setTimeout(
                    () => {
                        refresh()
                    },
                    refreshTimeInMinutes * 60 * 1000,
                )
            }
        }
    }

    function waitFirstLoad() {
        return new Promise<void>((resolve) => {
            let unwatch: WatchStopHandle
            // eslint-disable-next-line prefer-const
            unwatch = watch(
                localItems,
                (val) => {
                    try {
                        if (val !== null) {
                            if (typeof unwatch === 'function') {
                                unwatch()
                            }
                            resolve()
                        }
                    } catch (e) {
                        console.error(e)
                    }
                },
                {
                    immediate: true,
                },
            )
        })
    }

    const isInitialized = computed(() => {
        return localItems.value === null;
    })

    if (options.subscribeToEvents) {
        options.subscribeToEvents(localItems)
    }

    if (
        options.listenForWebsocket
        || (options.websocketChangeEvent && options.listenForWebsocket !== false)
    ) {
        // TODO Enable Echo Provider
        /* privateChannel('ServerListsChannel').listen(
             (options.websocketChangeEvent ?? url) ,
             () => {
                 if (localItems.value !== null) {
                     refresh().then()
                 }
             },
         )*/
    }

    function getItemById(id: string, idPropertyName: string = 'id') {
        return items.value.find(e => e[idPropertyName] === id)
    }

    async function refreshIfNotInitialized() {
        return new Promise<void>((resolve) => {
            if (localItems.value === null) {
                refresh()
                    .then(() => {
                        resolve();
                    })
            } else {
                resolve();
            }
        })
    }

    return {
        waitFirstLoad,
        getItemById,
        items,
        isInitialized,
        refreshIfNotInitialized,
        keyLabelItems,
        keyValueItems,
        isLoading,
        refresh,
        activeItems,
        includeInactive,
        inActiveAsDisabledItems,
    }
}

export function createLocalList<
    R extends string,
    K extends { name: string, id: R } = { name: string, id: R },
>(
    list: K[],
): {
    object: { [k in R]: string }
    list: K[]
    ids: { [k in R]: k }
    getById: (id: R) => K | undefined
} {
    return {
        list,
        object: list.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue.name
            return carry
        }, {}),
        ids: list.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue.id
            return carry
        }, {}),
        getById: (id: R) => {
            return list.find(e => e.id === id)
        },
    }
}

export function createLocalListSameLabelValue<R>(list: R[]): {
    object: { R: string }
    list: { name: R, id: R }[]
} {
    const arrayList: { name: R, id: R }[] = list.map((e) => {
        return {name: e, id: e}
    })
    return {
        list: arrayList,
        object: arrayList.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue.name
            return carry
        }, {}),
    }
}
