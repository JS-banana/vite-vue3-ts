/*类型命名建议以Ty结尾*/
/*
*
枚举 类，接口 都是大驼峰 WangMeng
方法，变量，常量 小驼峰 wangMeng
* */
/*通用对象*/
interface ObjTy {
  [propName: string]: any;
}

/* ant select组件 options 参数类型 */
type IOptions<T = number> = Array<{
  label: string;
  value: T;
}>;
