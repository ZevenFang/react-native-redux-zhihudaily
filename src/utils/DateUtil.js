export default class DateUtil{

  static getDayText(day){
    switch (day){
      case 0: return '一';
      case 1: return '二';
      case 2: return '三';
      case 3: return '四';
      case 4: return '五';
      case 5: return '六';
      case 6: return '日';
    }
  }
  
  static getMonthText(month){
    if (month<9) return '0'+(month+1);
    else return month+1+'';
  }

  static getDateText(date){
    return this.getMonthText(date.getMonth())+'月'+date.getDate()+'日 星期'+this.getDayText(date.getDay());
  }
  
  static getBeforeText(date){
    return date.getFullYear()+this.getMonthText(date.getMonth())+date.getDate();
  }

}