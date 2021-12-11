/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
import { BasicLayoutProps } from '@ant-design-vue/pro-layout';
import { ICONFONTURL } from '../../config/constant';

const prolayoutSetting: Omit<BasicLayoutProps, 'menuData'> = {
  layout: 'mix',
  splitMenus: false,
  headerTheme: 'light',
  contentStyle: {
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
    margin: 0,
    padding: '24px',
    background: '#F0F1F4',
  },
  fixSiderbar: false,
  headerHeight: 80,
  contentWidth: 'Fluid',
  iconfontUrl: ICONFONTURL,
};
export default prolayoutSetting;

export const onlySideMenuPath = ['/app/home', '/app/website', '/app/others'];
