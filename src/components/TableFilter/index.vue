<template>
  <a-card v-if="!hasHidden" :body-style="{ padding: '0 0 24px 0' }" :bordered="false">
    <a-form class="form-container" layout="horizontal" :model="formModel">
      <a-row type="flex">
        <a-col v-if="button" flex="100px">
          <span class="text" v-if="button.type === 'text'">{{ button.label }}</span>
          <!-- <a-button v-else v-bind="button" v-auth="button.auth" @click="button?.onClick">{{
            button.label
          }}</a-button> -->
          <a-button v-if="getButton.permission" v-bind="button" @click="button?.onClick">{{
            button.label
          }}</a-button>
        </a-col>
        <a-col flex="auto" class="rowE">
          <a-space>
            <template v-for="item in getItems" :key="item.name">
              <a-form-item :name="item.name">
                <a-select
                  v-if="item.type === 'select'"
                  :key="`select-${item.name}`"
                  v-bind="item"
                  v-model:value="formModel[item.name]"
                  class="default-select-w"
                />
                <a-date-picker
                  v-else-if="item.type === 'date'"
                  :key="`date-${item.name}`"
                  v-bind="item"
                  v-model:value="formModel[item.name]"
                  class="default-select-w"
                />
                <a-input-search
                  v-else
                  v-bind="item"
                  :key="`input-${item.name}`"
                  v-model:value="formModel[item.name]"
                  @search="handleSubmit"
                  class="default-search-w"
                >
                  <template #enterButton>
                    <a-button type="primary">查询</a-button>
                  </template>
                </a-input-search>
              </a-form-item>
            </template>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts">
  import { usePermission } from '/@/hooks/usePermission';
  import { useRole } from '/@/hooks/useRole';

  export default defineComponent({
    props: ['hiddenFilter', 'button', 'items', 'model'],
    emits: ['onSearch'],

    setup(props, { emit }) {
      const { hasPermission } = usePermission();
      const { hasRole } = useRole();

      const formModel = reactive(props.model || {});

      const getItems = computed(() => {
        return (props.items || []).map((item) => {
          return {
            type: 'input',
            ...item,
          };
        });
      });

      const handleSubmit = () => {
        emit('onSearch');
      };

      // onMounted(() => console.log(`hiddenFilter`, props.hiddenFilter));

      const hasHidden = ref(props.hiddenFilter);

      watchEffect(() => {
        // 如果都不存在
        if (!props.button && !props.items) {
          hasHidden.value = true;
        }
      });

      const getButton = computed(() => {
        const plainObj = toRaw(props.button) || {};
        return {
          ...plainObj,
          permission: hasPermission(plainObj.auth) && hasRole(plainObj.role),
        };
      });

      return {
        formModel,
        getItems,
        hasHidden,
        getButton,
        handleSubmit,
      };
    },
  });
</script>
<style lang="less" scoped>
  .form-container {
    .default-select-w {
      width: 120px;
    }
    .default-search-w {
      width: 290px;
    }
    // & :deep(.ant-input) {
    //   height: 36px;
    // }
    // & :deep(.ant-select) {
    //   height: 36px;
    // }
    // & :deep(.ant-btn) {
    //   height: 36px;
    // }
  }
  .text {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
