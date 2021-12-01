/**
 * @name AuthEnum
 * @description 权限，配合指令 v-auth 使用
 * @Example v-auth="AuthEnum.user_create"
 */

export enum AuthEnum {
  /**
   * 用户
   */
  // 新增用户
  user_create = '/v1/user/create',
  // 编辑用户
  user_update = '/v1/user/update',
  // 删除用户
  user_delete = '/v1/user/delete',

  /**
   * 角色
   */
  // 新增角色
  role_create = '/v1/role/create',
  // 修改角色
  role_update = '/v1/role/update',
  // 删除角色
  role_delete = '/v1/role/delete',

  /**
   * 合约管理
   */
  // 新增合约
  contract_create = '/v1/contract/deploy',
  // 查看详情
  contract_detail = '/v1/contract/detail',

  /**
   * 浏览器
   */
  // 区块信息
  explorer_blockList = '/v1/explorer/block',
  // 交易信息
  explorer_transactionList = '/v1/explorer/transactionListByAllBlock',
}
