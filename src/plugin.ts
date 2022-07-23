/**
 * 手动引入组件注册
 * 如果在意unplugin-vue-components插件的自动引入性能问题，可以考虑该方式
 */
import {
  Alert,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table as AntdTable,
} from 'ant-design-vue';

import type { App } from 'vue';

import Icon from '/@/components/Icon/index.vue';
import Modal from '/@/components/Modal/index.vue';
import Table from '/@/components/Table/index.vue';
import TableFilter from '/@/components/TableFilter/index.vue';
import Upload from '/@/components/Upload/index.vue';

export function setupComponents(app: App<Element>) {
  app.component('Icon', Icon);
  app.component('Modal', Modal);
  app.component('Table', Table);
  app.component('TableFilter', TableFilter);
  app.component('Upload', Upload);

  app
    .use(Alert)
    .use(Avatar)
    .use(Breadcrumb)
    .use(Button)
    .use(Card)
    .use(Col)
    .use(DatePicker)
    .use(Divider)
    .use(Dropdown)
    .use(Form)
    .use(Input)
    .use(Layout)
    .use(Menu)
    .use(Popconfirm)
    .use(Row)
    .use(Select)
    .use(Space)
    .use(Spin)
    .use(AntdTable);
}
