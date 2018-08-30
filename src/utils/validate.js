/*邮箱 /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/*/
//邮件地址需由字母、数字或下划线组成
export function CheckEmail(str) {
    const reg = /^(\w\.*)+@(\w)+(\.\w{2,})+$/ ;
    return reg.test(str);
}

/*用户名(允许2-8字符，允许中文、英文字母)*/
export function CheckName(str) {
    const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{2,8}$/;
    return reg.test(str);
}
/*密码（不少于16个字符，允许字母数字）*/
export function CheckPass(str) {
    // console.log(str.length)
    if(str.length > 16){
        return false;
    }else{
        return true;
    }
}

/*密码 (数字+字母 小于等于8个字符) */
export function CheckPassNumberLetter8(str) {
    const reg = /^[0-9a-zA-Z]{0,8}$/;
    return reg.test(str);
}

/*密码 (数字+字母 大于等于8个字符) */
export function CheckPassNumberLetter9(str) {
    const reg = /^[0-9a-zA-Z]{8,16}$/;
    return reg.test(str);
}

/*密码 (数字+字母+字符 大于等于8个字符) */
export function CheckPassNumberLetter10(str) {
    const reg =/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&]).{8,16}$/;
    return reg.test(str);
}

/*手机号码 (数字+字母+字符 大于等于8个字符) */
export function CheckPhone(str) {
    const reg =/^$/;
    return reg.test(str);
}

/*时间戳转成日期格式 2010年12月23日 10:53*/
export function getLocalTime1(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString()
}

//手机号码验证(11位数字)
export function toCheckPhone(str){
  // 验证130-139,150-159,180-189号码段的手机号码
  let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  return reg.test(str);
}
// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
//密码6-16位字符（至少包含数字、字母、特殊字符其中两种）
export function toCheckPwd(str){
  let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/;
  return reg.test(str);
}
//密码6-16位字符（至少包含数字、字母两种）
export function toCheckPwd2(str) {
  var reg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return reg.test(str);
}
//密码8-20位字符（允许英文字母、数字）
export function toCheckUserPwd(str) {
  var reg =  /^[a-zA-Z0-9]{8,20}$/;
  return reg.test(str);
}
