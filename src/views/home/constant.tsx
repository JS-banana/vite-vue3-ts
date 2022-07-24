import { Tooltip, Tag } from 'ant-design-vue';
import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 80,
  },
  {
    title: '创建日期',
    dataIndex: 'created_at',
    // slots: { customRender: 'toDateTime' }, // 该用法已废弃
    key: 'toDateTime',
    width: 150,
  },
  {
    title: '更新日期',
    dataIndex: 'updated_at',
    width: 170,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 150,
  },
  {
    title: '描述',
    dataIndex: 'description',
    // width: 180,
    ellipsis: true,
    customRender: ({ text }) => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: '颜色',
    dataIndex: 'color',
    width: 100,
    customRender: ({ text }) => <Tag color={text}>{text}</Tag>,
    fixed: 'right',
  },
];
