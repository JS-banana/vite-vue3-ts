import { Layout, Menu, Space } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import Icon from '/@/components/Icon/index.vue';
import { PropType, h, Transition } from 'vue';
import { MenuDataItem } from '../utils/typings';
import { router } from '/@/router';
import './index.less';

export default defineComponent({
  name: 'BaseMenu',
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    menuWidth: {
      type: Number,
      default: 208,
    },
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive<any>({
      collapsed: false, // default value
      openKeys: [],
      selectedKeys: [],
    });

    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat();
        state.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path);
        state.openKeys = matched
          .filter((r) => r.path !== router.currentRoute.value.path)
          .map((r) => r.path);
      }
    });

    const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
      router.push(e.key);
    };

    const getIcon = (type?: string) =>
      type ? <Icon type={type} className="sideMenu-icon" /> : null;

    // 构建树结构
    const makeTreeDom = (data: MenuDataItem[]): JSX.Element[] => {
      return data.map((item: MenuDataItem) => {
        if (item.children) {
          return (
            <Menu.SubMenu
              key={item.path}
              title={
                <>
                  {getIcon(item.meta?.icon as string)}
                  <span>{item.meta?.title}</span>
                </>
              }
            >
              {makeTreeDom(item.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item key={item.path}>
            {getIcon(item.meta?.icon as string)}
            <span>{item.meta?.title}</span>
          </Menu.Item>
        );
      });
    };

    return () => {
      return (
        <Layout.Sider
          width={208}
          collapsedWidth={54}
          class="my-sideMenu-sider"
          theme="light"
          trigger={null}
          breakpoint="lg"
          onBreakpoint={(val) => (state.collapsed = val)}
          collapsible
          collapsed={state.collapsed}
          // collapsedWidth={48}
        >
          {/* logo */}
          <Transition name="fade-top">
            {!state.collapsed && (
              <div class="my-sideMenu-sider_logo">
                <Space align="center" class="link">
                  <Icon type="guanlipingtai" size="20px" align="0px" />
                  <span class="font16 nowrap">管理平台</span>
                </Space>
              </div>
            )}
          </Transition>
          {/* menu */}
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={state.selectedKeys}
            {...(state.collapsed ? {} : { openKeys: state.openKeys })}
            onOpenChange={(keys: any[]) => (state.openKeys = keys)}
            onSelect={onSelect}
            class="my-sideMenu-sider_menu"
          >
            {makeTreeDom(props.menuData)}
          </Menu>
          {/* footer */}
          <div class="my-sideMenu-sider_footer">
            {h(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              style: { fontSize: 16 },
              onClick: () => (state.collapsed = !state.collapsed),
            })}
          </div>
        </Layout.Sider>
      );
    };
  },
});
