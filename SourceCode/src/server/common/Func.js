const AccountGWType = 0
const AccountMobileType = 1

const mobileRegPattern = /^[1][34578](\d){9}$/
const gwRegPattern = /^GW[0-9]{8,10}$/

export default{
  validateAccount: (account) => {
    if (gwRegPattern.test(account)) {
      return AccountGWType
    } else if (mobileRegPattern.test(account)) {
      return AccountMobileType
    }
  }
}
