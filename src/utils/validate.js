const eMail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; // 用户名（邮箱）
const idCard =
  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 身认证号
const pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/; // 密码
const creditCode = /^\w{18}$/; // 统一社会信用代码
const phone = /^1[3456789]\d{9}$/;
const name = /^[a-z][a-z0-9]{1,17}$/;

export function validateUsername(rule, value, callback) {
  // 临时用户名（邮箱）校验
  if (value === '') {
    callback(new Error('请输入登录账号！！'));
  } else {
    callback();
  }
}

export function validateName(rule, value, callback) {
  // 各种ID、标识
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (!name.test(value)) {
    callback(new Error('请输入正确格式的' + rule.name));
  } else {
    callback();
  }
}

export function validateCommon(rule, value, callback) {
  // 不需校验，检测是否有值
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (!value) {
    callback(new Error(rule.name + '不正确'));
  } else {
    callback();
  }
}

export function validatePropertyName(rule, value, callback) {
  // 新建（合约，节点）名称 2-18位
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (value.length < 2 || value.length > 18) {
    callback(new Error('请输入正确格式的' + rule.name));
  } else {
    callback();
  }
}

export function validatePass(rule, value, callback) {
  // 密码
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (!pass.test(value)) {
    callback(new Error('请输入正确格式的' + rule.name));
  } else {
    callback();
  }
}

export function validateEmail(rule, value, callback) {
  // 用户名(邮箱)
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (!eMail.test(value)) {
    callback(new Error('请输入正确格式的' + rule.name));
  } else {
    callback();
  }
}

export function validateCreditCode(rule, value, callback) {
  // 统一社会信用代码
  if (value === '') {
    return callback(new Error(rule.name + '不能为空'));
  } else if (!creditCode.test(value)) {
    return callback(new Error('请输入18位的' + rule.name));
  } else {
    callback();
  }
}

export function validateIdCard(rule, value, callback) {
  // 身份证号
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (!idCard.test(value)) {
    callback(new Error('请输入正确格式的' + rule.name));
  } else {
    callback();
  }
}

export function validatePhone(rule, value, callback) {
  // 电话
  if (value === '') {
    callback(new Error(rule.name + '不能为空'));
  } else if (!phone.test(value)) {
    callback(new Error('请输入正确格式的' + rule.name));
  } else {
    callback();
  }
}
