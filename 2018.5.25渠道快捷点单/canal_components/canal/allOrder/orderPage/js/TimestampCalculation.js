export function TimestampCalculation(timestamp) {

      if(timestamp == "09:00-10:00"){
        return 36000000;
      }else if(timestamp == "10:00-11:00"){
        return 39600000;
      }else if(timestamp == "11:00-12:00"){
        return 43200000;
      }else if(timestamp == "12:00-13:00"){
        return 46800000;
      }else if(timestamp == "13:00-14:00"){
        return 50400000;
      }else if(timestamp == "14:00-15:00"){
        return 54000000;
      }else if(timestamp == "15:00-16:00"){
        return 57600000;
      }else if(timestamp == "16:00-17:00"){
        return 61200000;
      }else if(timestamp == "17:00-18:00"){
        return 64800000;
      }else if(timestamp == "18:00-19:00"){
        return 68400000;
      }else if(timestamp == "19:00-20:00"){
        return 72000000;
      }
}
