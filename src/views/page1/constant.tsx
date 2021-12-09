import { Space, Tooltip } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

import type { ColumnProps } from 'ant-design-vue/es/table/interface';

export const columns: ColumnProps[] = [
  {
    title: 'IP地址和端口',
    dataIndex: 'ip',
    width: 150,
    customRender: ({ record }) => `${record.ip}:${record.port}`,
  },
  {
    title: (
      <Tooltip title="节点ID">
        <Space align="center">
          <span>Enode ID</span>
          <QuestionCircleOutlined style="vertical-align:2px" />
        </Space>
      </Tooltip>
    ),
    dataIndex: 'enode_id',
    width: 250,
  },
  {
    title: '节点名称',
    dataIndex: 'node_name',
    width: 100,
  },
  {
    title: '节点角色',
    dataIndex: 'nodeRole',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '公钥地址',
    dataIndex: 'address',
    width: 200,
  },
];
