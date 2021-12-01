<template>
  <a-modal :width="640" :visible="visible" @cancel="handleCancel" :footer="null">
    <template #title>
      <span class="font18">{{ title }}</span>
    </template>
    <slot></slot>
    <a-row>
      <a-col style="width: 110px" />
      <a-col :span="16" class="rowE">
        <a-space>
          <a-button @click="handleCancel">取消</a-button>
          <a-button :loading="loading" @click="handleSubmit" type="primary">{{ okText }}</a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script lang="ts">
  export default defineComponent({
    props: {
      title: {
        type: String,
        default: '',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      okText: {
        type: String,
        default: '创建',
      },
    },
    emits: ['cancel', 'ok'],
    setup(_, { emit }) {
      const handleCancel = () => emit('cancel');
      const handleSubmit = () => emit('ok');

      return {
        handleCancel,
        handleSubmit,
      };
    },
  });
</script>
