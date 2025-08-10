import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import keyBy from 'lodash/keyBy';
import reduce from 'lodash/reduce';
import type { Ref, WatchStopHandle } from 'vue';
import { orderBy, set, startCase } from 'lodash-es';
import uniqueId from 'lodash/uniqueId';
import unset from 'lodash/unset';
import omit from 'lodash/omit';

export function createListStore<TItem = any>(
    url: string | { url: string, method: 'get' | 'post' | 'put' | 'delete' | 'patch' },
    options: {
        refreshable?: boolean;
        refreshTime?: number;
        websocketChangeEvent?: string;
        sortBy?: string;
        sortByDirection?: 'asc' | 'desc';
        listenForWebsocket?: boolean;
        hasActiveItems?: boolean;
        isActiveProperty?: string;
        disabledProperty?: string;
        idProperty?: string;
        labelProperty?: string;
        withoutPagination?: boolean;
        channelName?: string;
        childrenProperty?: string;
        subscribeToEvents?: (localItems: Ref) => void;
    } = {}
) {
    /* const queue = new Queue({
      concurrent: 1,
      interval: 10,
      start: false,
    }) */
    const idProperty = options.idProperty ?? 'id';
    const labelProperty = options.labelProperty ?? 'name';
    const isActiveProperty = options.isActiveProperty ?? 'is_active';
    const disabledProperty = options.disabledProperty ?? 'disabled';

    const refreshable = options.refreshable ?? false;
    const withoutPagination = options.withoutPagination ?? true;
    const refreshTimeInMinutes = options.refreshTime ?? 5;
    // const userStore = useUserStore()
    const localItems = ref<null | TItem[]>(null);
    const sortItemsBy = options.sortBy ?? 'uses';
    const sortItemsByDirection = options.sortByDirection ?? 'asc';

    const apiClient = useApiClient();

    const items = computed(() => {
        if (!localItems.value) {
            refresh().then();
        }
        return localItems.value ?? [] as TItem[];
    });
    const activeItems = computed(() => {
        return (items.value || []).filter((e: any) => e[isActiveProperty] === true);
    });
    const inActiveAsDisabledItems = computed(() => {
        return (items.value || []).map((e: any) => {
            e.disabled = !e[isActiveProperty];
            return e;
        });
    });
    const keyLabelPairItems = computed(() => {
        if (!localItems.value) {
            refresh().then();
        }
        return reduce(
            localItems.value || [],
            (carry, item) => {
                carry[item[idProperty]] = item[labelProperty];
                return carry;
            },
            {} as { [k in string]: any }
        );
    });
    const keyItemPairItems = computed(() => {
        if (!localItems.value) {
            refresh().then();
        }
        return keyBy(localItems.value || [], idProperty);
    });

    const isLoading = ref(false);
    const inActiveIncluded = ref(false);

    function includeInactive(activeStatus: boolean = true): void {
        if (inActiveIncluded.value === activeStatus) return;
        inActiveIncluded.value = activeStatus;
        refresh().then();
    }

    const refreshTimeout = ref<NodeJS.Timeout>();

    async function refresh() {
        if (isLoading.value) return;
        isLoading.value = true;
        clearTimeout(refreshTimeout.value);
        try {
            const params: any = { perPage: -1 };
            if (options.hasActiveItems && inActiveIncluded.value !== true) {
                params.filters = {
                    [isActiveProperty]: {
                        operator: 'and',
                        constraints: [{ value: 1, matchMode: 'equals' }]
                    }
                };
            }
            let urlMethod = 'get';
            let urlText = '';
            if (typeof url === 'string') {
                urlText = url;
            } else if (typeof url === 'object') {
                urlText = url.url;
                urlMethod = url.method;
            }
            const res = await apiClient.request({
                url: urlText,
                method: urlMethod,
                params: params
            });

            let responseData;
            if (withoutPagination) {
                responseData = res.data.data;
            } else {
                responseData = res.data.data.data;
            }
            if (sortItemsBy) {
                localItems.value = orderBy(responseData, sortItemsBy, sortItemsByDirection);
            } else {
                localItems.value = responseData;
            }

            if (_onRefreshCallables.value) {
                Object.values(_onRefreshCallables.value).forEach(e => e(toValue(items) as TItem[]));
            }

        } finally {
            isLoading.value = false;
            if (refreshable) {
                refreshTimeout.value = setTimeout(
                    () => {
                        refresh();
                    },
                    refreshTimeInMinutes * 60 * 1000
                );
            }
        }
    }

    function waitFirstLoad() {
        return new Promise<void>((resolve) => {
            let unwatch: WatchStopHandle;
            // eslint-disable-next-line prefer-const
            unwatch = watch(
                localItems,
                (val) => {
                    try {
                        if (val !== null) {
                            if (typeof unwatch === 'function') {
                                unwatch();
                            }
                            resolve();
                        }
                    } catch (e) {
                        console.error(e);
                    }
                },
                {
                    immediate: true
                }
            );
        });
    }

    if (options.subscribeToEvents) {
        options.subscribeToEvents(localItems);
    }

    if (options.listenForWebsocket || (options.websocketChangeEvent && options.listenForWebsocket !== false)) {
        //TODO
        /*privateChannel('ServerListsChannel').listen((options.websocketChangeEvent ?? url) as NamespacedEventName, () => {
            if (localItems.value !== null) {
                refresh().then();
            }
        });*/
    }

    function getLabel(id: string | number | Record<string | number, any>): string {
        if (typeof id !== 'object') {
            return keyLabelPairItems.value[id];
        } else {
            return keyLabelPairItems.value[id[idProperty]];
        }
    }

    const _onFirstLoadCallables = ref<Record<string, ((items: TItem[]) => void)>>({});
    const _onRefreshCallables = ref<Record<string, ((items: TItem[]) => void)>>({});

    function onFirstLoad(callback: () => void) {
        const callbackId = uniqueId('serverListFirstLoadCallback_');
        onMounted(() => {
            set(_onFirstLoadCallables.value, callbackId, callback);
        });
        onUnmounted(() => {
            unset(_onFirstLoadCallables.value, callbackId);
        });
    }

    function onRefresh(callback: (items?: TItem[]) => void, type: 'mounted' | 'activated' | 'both' = 'mounted', immediate: boolean = false) {
        const callbackId = uniqueId('serverListRefreshCallback_');
        if (type === 'mounted' || type == 'both') {
            onMounted(() => {
                set(_onRefreshCallables.value, callbackId, callback);
            });
            onUnmounted(() => {
                unset(_onRefreshCallables.value, callbackId);
            });
        }
        if (type === 'activated' || type == 'both') {
            onActivated(() => {
                set(_onRefreshCallables.value, callbackId, callback);
            });
            onDeactivated(() => {
                unset(_onRefreshCallables.value, callbackId);
            });
        }
        if (immediate) {
            callback(toValue(items) as TItem[]);
        }
    }

    const flatList = computed(() => {
        if (options.childrenProperty) {
            const accumulator: TItem[] = [];

            function _localMapper(_item: TItem, _accumulator: TItem[] = []) {
                _accumulator.push(omit(_item as any, options.childrenProperty) as TItem);
                _item[options.childrenProperty]?.map(e => _localMapper(e, _accumulator));
                return _accumulator;
            }

            items.value.map(e => _localMapper(e, accumulator));
            return accumulator;
        } else {
            return items.value;
        }
    });

    const keyItemPairFlatItems = computed(() => {
        if (!localItems.value) {
            refresh().then();
        }
        return keyBy(flatList.value || [], idProperty);
    });

    return {
        waitFirstLoad,
        items,
        getLabel,
        flatList,
        onFirstLoad,
        onRefresh,
        keyItemPairItems,
        keyItemPairFlatItems,
        keyLabelPairItems,
        isLoading,
        refresh,
        activeItems,
        includeInactive,
        inActiveAsDisabledItems
    };
}

export function isLocalListType(list: any): list is LocalListType {
    return (list && list.keyObjectPair);
}

export type LocalListType<TId extends string = string, TItem = any> = {
    object: { [p: TId]: string };
    keyObjectPair: { [p: TId]: TItem };
    list: TItem[];
    getById: (id: TId) => TItem | undefined;
}

export function createLocalList<R, K extends { name: string; id: R } = { name: string; id: R }>(
    list: K[]
): LocalListType<R, K> {
    return {
        list,
        object: list.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue.name;
            return carry;
        }, {}),
        keyObjectPair: list.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue;
            return carry;
        }, {}),
        getById: (id: R) => {
            return list.find((e) => e.id === id);
        }
    };
}

export function createLocalListSameLabelValue<R extends string | number>(list: R[]): {
    object: { R: string };
    list: { name: R; id: R }[];
} {
    const arrayList: { name: R; id: R }[] = list.map((e) => {
        return { name: e, id: e };
    });
    return {
        list: arrayList,
        object: arrayList.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue.name;
            return carry;
        }, {})
    };
}


export function createLocalListAutoTitleLabel<R extends string | number>(list: R[]): {
    object: { R: string };
    list: { name: string; id: R }[];
} {
    const { t } = useI18n();
    const arrayList: { name: string; id: R }[] = list.map((e) => {
        return { name: t(startCase(e + '')), id: e };
    });
    return {
        list: arrayList,
        object: arrayList.reduce((carry: any, currentValue) => {
            carry[currentValue.id] = currentValue.name;
            return carry;
        }, {})
    };
}

//Examples:
/*



export const useServerListsStore = defineStore('serverLists', () => {
    const samplesList = createListStore('/samples');

    return {
        samplesList,
    };
});

export const useLocalListsStore = defineStore('localList', () => {
    const { t } = useI18n();
    const samples = createLocalList<'sample1'|'sample2'>([
        { name: t('Sample 1'), id: 'sample1' },
        { name: t('Sample 2'), id: 'sample2' },
    ]);

    const sampleGroups = createLocalListSameLabelValue(['Sample1', 'Sample2',]);
    return {
        samples,
        sampleGroups,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useServerListsStore as any, import.meta.hot));
    import.meta.hot.accept(acceptHMRUpdate(useLocalListsStore as any, import.meta.hot));
}

*/

