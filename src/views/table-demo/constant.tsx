import { ColumnProps } from 'ant-design-vue/es/table';
import { Tag, Tooltip, Space } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'toIndex',
    width: 80,
  },
  {
    title: '节点',
    dataIndex: 'node_name',
    width: 150,
  },
  {
    title: (
      <Tooltip>
        <Space align="center">
          <span>机构</span>
          <QuestionCircleOutlined style="vertical-align:2px" />
        </Space>
      </Tooltip>
    ),
    dataIndex: 'institutions_name',
    width: 80,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    width: 100,
    customRender: ({ record }: any) => (
      <span>{record.ip ? `${record.ip}:${record.port}` : ''}</span>
    ),
  },
  {
    title: '角色',
    dataIndex: 'nodeRole',
    width: 100,
  },
  {
    title: '是否管理员',
    dataIndex: 'is_consensus',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    customRender: ({ text }) => <Tag color={text === '正常' ? 'success' : 'error'}>{text}</Tag>,
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    // slots: { customRender: 'action' },
  },
];
