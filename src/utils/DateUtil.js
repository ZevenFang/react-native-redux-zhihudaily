export default class DateUtil{

  static getDayText(day){
    switch (day){
      case 1: return '一';
      case 2: return '二';
      case 3: return '三';
      case 4: return '四';
      case 5: return '五';
      case 6: return '六';
      case 0: return '日';
    }
  }
  
  static getMonthText(month){
    if (month<9) return '0'+(month+1);
    else return month+1+'';
  }

  static getDateDayText(date){
    if (date<10) return '0'+date;
    else return date+'';
  }

  static getDateText(date){
    return this.getMonthText(date.getMonth())+'月'+date.getDate()+'日 星期'+this.getDayText(date.getDay());
  }
  
  static getBeforeText(date){
    return date.getFullYear()+this.getMonthText(date.getMonth())+this.getDateDayText(date.getDate());
  }

}