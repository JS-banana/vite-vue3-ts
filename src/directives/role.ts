/**
 * Global authority directive
 * 角色控制： 银行 0 / 监管 1
 * @Example v-role="role"
 */
import type { App, Directive, DirectiveBinding } from 'vue';
import { useRole } from '/@/hooks/useRole';
import intersection from 'lodash-es/intersection';

// 操作按钮无权限时，替换展示内容
function replaceHtml(parentNode: HTMLElement | null) {
  if (!parentNode) return;

  const child = document.createElement('span');
  // 只过滤 Table里的操作按钮
  const classNames = ['ant-space-item', 'ant-table-row-cell-break-word'];
  const parentNodeText =
    intersection(classNames, parentNode?.className?.split(' ')).length > 0 ? '——' : '';
  // console.dir(parentNode);
  child.innerHTML = parentNodeText;
  child.style.color = 'rgba(0,0,0,.08)';
  parentNode?.appendChild(child);
}

function isAuth(el: Element, binding: any) {
  const { hasRole } = useRole();
  const value = binding.value;
  // 过滤 undefined、null
  if (value == null) return;
  // 权限验证

  if (!hasRole(value)) {
    const parentNode = el.parentNode;
    el.parentNode?.removeChild(el);
    replaceHtml(parentNode as any);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted,
};

export function setupRoleDirective(app: App) {
  app.directive('role', authDirective);
}

export default authDirective;
