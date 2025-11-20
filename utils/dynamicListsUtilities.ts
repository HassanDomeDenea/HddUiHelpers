import { useEcho } from '@laravel/echo-vue';
import { useApiClient } from 'HddUiHelpers/stores/apiClient.ts';
import { get, orderBy, set, startCase, uniq } from 'lodash-es';
import debounce from 'lodash/debounce';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import uniqueId from 'lodash/uniqueId';
import unset from 'lodash/unset';
import moment from 'moment';
import type { Ref, WatchStopHandle } from 'vue';

export function createListStore<TItem = any>(
  url: string | { url: string; method: 'get' | 'post' | 'put' | 'delete' | 'patch' },
  options: {
    storage?: 'session' | 'local';

    /**Storage duration in seconds*/
    storageDuration?: number;
    withBroadcasting?: boolean;
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
    modelName?: string;
    childrenProperty?: string;
    subscribeToEvents?: (localItems: Ref) => void;
  } = {},
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

  const listNameFromUrl = (typeof url === 'string' ? url : url.url).toString().replace(/[^a-zA-Z0-9]/g, '_');

  let localItems;
  let localItemsLastFetchedAt;
  if (options.storage) {
    const storageTypeInstance = options.storage === 'session' ? window.sessionStorage : window.localStorage;
    localItemsLastFetchedAt = useStorage('dynamic_lists_' + listNameFromUrl + '_last_fetched_at', moment().toISOString(), storageTypeInstance);
    if (
      options.storageDuration > 0 &&
      localItemsLastFetchedAt.value &&
      moment().diff(moment(localItemsLastFetchedAt.value), 'seconds') > options.storageDuration
    ) {
      storageTypeInstance.removeItem('dynamic_lists_' + listNameFromUrl);
    }
    localItems = useStorage('dynamic_lists_' + listNameFromUrl, null, storageTypeInstance, {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null) || null,
        write: (v: any) => JSON.stringify(v),
      },
    });
    //console.log(listNameFromUrl);
    //console.log('dynamic_lists_' + listNameFromUrl);
    //console.log(localItems.value);
  }
  if (!localItems) {
    localItems = ref<null | TItem[]>(null);
  }
  if (!localItemsLastFetchedAt) {
    localItemsLastFetchedAt = ref<string | null>(null);
  }

  const sortItemsBy = options.sortBy ?? 'uses';
  const sortItemsByDirection = options.sortByDirection ?? 'asc';

  const apiClient = useApiClient();

  const isLoaded = computed(() => {
    return !!localItems.value;
  });

  const items = computed<TItem[]>(() => {
    if (!localItems.value) {
      refresh().then();
    }
    return (localItems.value ?? []) as TItem[];
  });
  const activeItems = computed(() => {
    return (items.value || []).filter((e: any) => e[isActiveProperty] === true);
  });
  const inActiveAsDisabledItems = computed(() => {
    return (items.value || []).map((e: any) => {
      e[disabledProperty] = !e[isActiveProperty];
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
      {} as { [k in string]: any },
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
            constraints: [{ value: 1, matchMode: 'equals' }],
          },
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
        params: params,
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

      if (localItemsLastFetchedAt) {
        localItemsLastFetchedAt.value = moment().toISOString();
      }

      if (_onRefreshCallables.value) {
        Object.values(_onRefreshCallables.value).forEach((e) => e(toValue(items) as TItem[]));
      }
    } finally {
      isLoading.value = false;
      if (refreshable) {
        refreshTimeout.value = setTimeout(
          () => {
            refresh();
          },
          refreshTimeInMinutes * 60 * 1000,
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
            } else if (items.value) {
              //no-body, just to compute the items computed property
            }
          } catch (e) {
            console.error(e);
          }
        },
        {
          immediate: true,
        },
      );
    });
  }

  if (options.subscribeToEvents) {
    options.subscribeToEvents(localItems);
  }

  const debouncedRefresh = debounce(refresh, 1000);

  if (options.withBroadcasting) {
    useEcho(
      'App.Models',
      [`.${options.modelName}Created`, `.${options.modelName}Updated`, `.${options.modelName}Deleted`, `.${options.modelName}Restored`],
      (_event: unknown) => {
        debouncedRefresh();
      },
    );
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

  const _onFirstLoadCallables = ref<Record<string, (items: TItem[]) => void>>({});
  const _onRefreshCallables = ref<Record<string, (items: TItem[]) => void>>({});

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

  const flatList = computed<TItem[]>(() => {
    if (options.childrenProperty) {
      const accumulator: TItem[] = [];

      function _localMapper(_item: TItem, _accumulator: TItem[] = []) {
        _accumulator.push(omit(_item as any, options.childrenProperty) as TItem);
        _item[options.childrenProperty]?.map((e: TItem) => _localMapper(e, _accumulator));
        return _accumulator;
      }

      items.value.map((e) => _localMapper(e, accumulator));
      return accumulator;
    } else {
      return items.value;
    }
  });

  const getNestedItem = function (id: string | number) {
    if (!id) {
      return undefined;
    }
    function _localLooper(_items: TItem[]) {
      for (const _item of _items) {
        if (get(_item, options.idProperty ?? 'id') === id) {
          return _item;
        }
        const children = get(_item, options.childrenProperty);
        if (children && children.length > 0) {
          const _childTarget = _localLooper(children);
          if (_childTarget) {
            return _childTarget;
          }
        }
      }
      return undefined;
    }
    return _localLooper(items.value);
  };

  const getFlatChildrenOfItem = function (id: TItem | string | number, includeSelf: boolean = false): TItem[] {
    if (!id) {
      return [];
    }
    let _item: TItem;
    if (typeof id === 'string' || typeof id === 'number') {
      _item = getNestedItem(id);
    } else {
      _item = id;
    }
    if (!_item) {
      return [];
    }

    if (options.childrenProperty) {
      const accumulator: TItem[] = [];

      function _localMapper(_item: TItem, _accumulator: TItem[] = []) {
        _accumulator.push(omit(_item as any, options.childrenProperty) as TItem);
        _item[options.childrenProperty]?.map((e: TItem) => _localMapper(e, _accumulator));
        return _accumulator;
      }

      if (includeSelf) {
        [_item].map((e) => _localMapper(e, accumulator));
      } else {
        _item[options.childrenProperty]?.map((e) => _localMapper(e, accumulator));
      }
      return accumulator;
    } else {
      if (includeSelf) {
        return [_item];
      }
      return [];
    }
  };

  const getFlatIdsOfItem = function (id: TItem | string | number, includeSelf?: boolean): (string | number)[] {
    const _items = getFlatChildrenOfItem(id, includeSelf);
    return uniq(map(_items, idProperty));
  };

  const keyItemPairFlatItems = computed(() => {
    if (!localItems.value) {
      refresh().then();
    }

    return keyBy(flatList.value, idProperty);
  });

  function addItem(item: TItem) {
    localItems.value?.push(item);
  }

  return {
    waitFirstLoad,
    isLoaded,
    items,
    getLabel,
    addItem,
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
    inActiveAsDisabledItems,
    getNestedItem,
    getFlatChildrenOfItem,
    getFlatIdsOfItem,
  };
}

export function isLocalListType(list: any): list is LocalListType {
  return list && list.keyObjectPair;
}

export type LocalListType<TId extends string | number = string, TItem = any> = {
  object: { [p in TId]: string };
  keyObjectPair: { [p in TId]: TItem };
  keyLabelPairItems: { [p in TId]: TItem };
  list: TItem[];
  getById: (id: TId) => TItem | undefined;
};

export function createLocalList<R extends string | number, K extends { name: string; id: R } = { name: string; id: R }>(
  list: K[],
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
    keyLabelPairItems: list.reduce((carry: any, currentValue) => {
      carry[currentValue.id] = currentValue.name;
      return carry;
    }, {}),
    getById: (id: R) => {
      return list.find((e) => e.id === id);
    },
  };
}

export function createLocalListSameLabelValue<R extends string | number>(
  list: R[],
): {
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
    }, {}),
  };
}

export function createLocalListAutoTitleLabel<R extends string | number>(
  list: R[],
): {
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
    }, {}),
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
