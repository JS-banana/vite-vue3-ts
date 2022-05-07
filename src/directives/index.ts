/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupRoleDirective } from './role';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupRoleDirective(app);
}
