<template>
  <div>
    <a-upload
      name="file"
      v-model:file-list="fileList"
      v-bind="uploadCof"
      @change="handleChange"
      :accept="accept"
    >
      <a-button v-if="fileList.length < 1">
        <upload-outlined style="vertical-align: 2px" />
        上传文件
      </a-button>
    </a-upload>
  </div>
</template>
<script setup lang="ts">
  import { useMessage } from '/@/hooks/useMessage';
  import { UploadOutlined } from '@ant-design/icons-vue';

  const { createMessage } = useMessage();

  // props
  const props = defineProps({
    accept: {
      type: String,
      default: () => {
        return '.doc';
      },
    },
    size: {
      type: Number,
      default: () => {
        return null;
      },
    },
  });

  // emits
  const emits = defineEmits(['uploadRemoved', 'uploadSuccess']);

  // uploadCof
  const uploadCof = reactive({
    headers: {
      Authorization: localStorage.getItem('x-auth-token'),
    },
    action: location.origin + '/api/v1/upload',
  });

  const fileList = ref([]);

  const bytesToSize = (bytes = 0) => {
    return bytes === 0 ? 0 : bytes / 1024 / 1024;
  };

  const handleChange = (info) => {
    // 上传中
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      if (props.size) {
        if (props.size < bytesToSize(info.file.size)) {
          createMessage.warn('文件大小不能超过' + props.size + 'M');
          return false;
        }
      } else if (info.fileList.length > 1) {
        info.fileList.length = 1;
        createMessage.warn('一次仅可以上传一个文件，请完成这次操作之后再上传');
        return false;
      } else if (info.file.status === 'removed') {
        createMessage.success('删除成功，请上传新的合约文件');
        info.fileList.length = 0;
        emits('uploadRemoved', '');
        fileList.value = [];
        return false;
      }
    }

    // 完成上传
    if (info.file.status === 'done') {
      if (info.file.type.indexOf('image') !== -1) {
        createMessage.error('请上传正确的格式类型');
        info.fileList.length = 0;
        return false;
      }
      emits('uploadSuccess', {
        data: info.file.response.result,
        fileType: info.file.name,
      });

      createMessage.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      info.fileList.length = 0;
      createMessage.error(`${info.file.name} 上传失败，请稍后再试`);
    }
  };
</script>
