import { RuleObject } from 'ant-design-vue/es/form/interface';

const RegRules = {
  phone: /^1[3456789]\d{9}$/,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  pass: /^[a-zA-Z0-9_,.-]{6,20}$/,
  name: /^[a-z][a-z0-9]{1,17}$/,
};

// 密码
export function validatePassword(_: RuleObject, value: string) {
  if (value === '') {
    return Promise.reject('密码不能为空！');
  } else if (!RegRules.pass.test(value)) {
    return Promise.reject('6~20位数字、字母、下划线等非特殊字符');
  } else {
    return Promise.resolve();
  }
}

// 电话
export async function validatePhone(_: RuleObject, value: string) {
  if (!value) {
    return Promise.reject('手机号不能为空！');
  } else if (!RegRules.phone.test(value)) {
    return Promise.reject('请输入正确的手机号！');
  } else {
    return Promise.resolve();
  }
}
