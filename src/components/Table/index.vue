<template>
  <div class="table-component">
    <!-- filter -->
    <TableFilter
      :button="tableFilterButton"
      :items="tableFilterItems"
      :model="tableFilterModel"
      :hiddenFilter="hiddenFilter"
      :pagination="null"
      @onSearch="onSearch"
    />
    <!-- table -->
    <a-table
      :class="['ant-table-striped', { border: hasBordered }]"
      :rowClassName="(_, index) => (index % 2 === 1 ? 'table-striped' : '')"
      :dataSource="dataSource"
      :columns="columns"
      :rowKey="(record) => record.id"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="scroll"
    >
      <!-- slot 写法自定义 操作列 -->
      <!-- <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template> -->
      <template #bodyCell="{ column, text, index, record }">
        <template v-if="column.key === 'toIndex'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'toDate'">
          <span>{{ text ? formatDate(text) : '-' }}</span>
        </template>
        <template v-if="column.key === 'toDateTime'">
          <span>{{ text ? formatDate(text, 'time') : '-' }}</span>
        </template>
        <!-- 函数式写法自定义 操作列 -->
        <template v-if="column.key === 'action'">
          <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
            <!-- 气泡确认框 -->
            <a-popconfirm
              v-if="action.enable"
              :title="action?.title"
              @confirm="action?.onConfirm(record)"
              @cancel="action?.onCancel(record)"
            >
              <a @click.prevent="() => {}" :type="action.type">{{ action.label }}</a>
            </a-popconfirm>
            <span v-else-if="!action.permission">——</span>
            <!-- 按钮 -->
            <a v-else @click="action?.onClick(record)" :type="action.type">{{ action.label }}</a>
            <!-- 分割线 -->
            <a-divider type="vertical" v-if="index < getActions.length - 1" />
          </template>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
  import { FilterValue } from 'ant-design-vue/es/table/interface';
  import dayjs from 'dayjs';
  import { usePagination } from 'vue-request';
  import { formatToDate, formatToDateTime } from '/@/utils/dateUtil';
  import { usePermission } from '/@/hooks/usePermission';
  import { useRole } from '/@/hooks/useRole';
  import { TablePaginationConfig } from 'ant-design-vue/lib/table/interface';

  // const req = () => new Promise((resolve) => resolve({ total: 0, list: [] }));

  export default defineComponent({
    props: [
      'bordered',
      'hiddenFilter',
      'url' /* 请求接口 promise */,
      'columns' /* Table组件：columns 不包含操作列 */,
      'actions' /* Table组件：操作列 */,
      'button' /* Filter筛选列组件：交互按钮 */,
      'items' /* Filter筛选列组件：包含的项 */,
      'model' /* Filter筛选列组件：form model */,
      'resKey',
      'scroll',
    ],
    // emits: ['onSearch'],
    setup(props) {
      const { hasPermission } = usePermission();
      const { hasRole } = useRole();
      const {
        data: dataSource,
        run,
        loading,
        current,
        pageSize,
        total,
        refresh,
      } = usePagination(props.url, {
        // formatResult: (res: any) => (props.resKey ? res[props.resKey.list] : res.list),
        pagination: {
          pageSizeKey: 'limit',
          currentKey: 'page',
        },
      });

      const hasBordered = computed(() => props.bordered ?? true);

      const listData = computed(
        () => (dataSource.value as unknown as Indexable)?.[props?.resKey?.list || 'list'] || [],
      );

      const pagination = computed(() => ({
        total: total.value,
        current: current.value,
        pageSize: pageSize.value,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: () => h('span', {}, `共 ${total.value} 条`),
      }));

      const handleTableChange = (
        pag: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: any,
      ) => {
        run({
          limit: pag!.pageSize!,
          page: pag?.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      };

      // action 操作列
      const getActions = computed(() => {
        return (
          (toRaw(props.actions) || [])
            // .filter((action) => hasPermission(action.auth))
            .map((action) => {
              const { popConfirm } = action;
              return {
                type: 'link',
                ...action,
                ...(popConfirm || {}),
                enable: !!popConfirm,
                permission: hasPermission(action.auth) && hasRole(action.role),
              };
            })
        );
      });

      // filter
      const tableFilterModel = computed(() => props.model);
      const tableFilterButton = computed(() => props.button);
      const tableFilterItems = computed(() => props.items);
      const onSearch = () => {
        const args = toRaw(tableFilterModel.value) || {};

        // 日期格式处理
        if (args) {
          Object.keys(args).map((key) => {
            if (args[key] && dayjs.isDayjs(args[key])) {
              args[key] = formatToDate(args[key]);
            }
          });
        }

        run({ page: current.value, limit: pageSize.value, ...args });
      };

      // 日期格式化
      const formatDate = (val: string, type: 'date' | 'time' = 'date') => {
        const formatFn = type === 'date' ? formatToDate : formatToDateTime;
        return val.length === 10 ? formatFn(Number(val) * 1000) : formatFn(val);
      };

      return {
        dataSource: listData,
        loading,
        pagination,
        hasBordered,
        handleTableChange,
        run,
        refresh,
        getActions,
        // filter
        tableFilterModel,
        tableFilterButton,
        tableFilterItems,
        onSearch,
        formatDate,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
  .ant-table-striped :deep(.ant-table-pagination.ant-pagination) {
    margin: 30px auto;
    width: 100%;
    text-align: center;
    .ant-pagination-prev,
    .ant-pagination-next {
      .anticon {
        vertical-align: 1.5px;
      }
    }
  }
  .ant-table-striped :deep(.ant-pagination-item-active) {
    background: #3860f4;
    a {
      color: #ffffff;
    }
  }
  .border {
    border: 0.5px solid rgba(210, 210, 210, 0.5);
  }
</style>
