export function star(fraction,star1,star2,star3,star4,star5){
          let starArr=[];
         let srcPath="./static/images/";
        let imgPng=".png";
          if(fraction == 5){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star1"+imgPng;
            star4 =srcPath+ "star1"+imgPng;
            star5 =srcPath+ "star1"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }else if(fraction < 5 && fraction > 4){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star1"+imgPng;
            star4 =srcPath+ "star1"+imgPng;
            star5 =srcPath+ "star3"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction == 4){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star1"+imgPng;
            star4 =srcPath+ "star1"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction < 4 && fraction > 3){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star1"+imgPng;
            star4 =srcPath+ "star3"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction == 3){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star1"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction < 3 && fraction > 2){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star3"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction == 2){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star1"+imgPng;
            star3 = srcPath+ "star2"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction < 2 && fraction > 1){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star3"+imgPng;
            star3 = srcPath+ "star2"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction == 1){
            star1 =srcPath+ "star1"+imgPng;
            star2 =srcPath+ "star2"+imgPng;
            star3 = srcPath+ "star2"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          else if(fraction < 1 && fraction > 0){
            star1 =srcPath+ "star3"+imgPng;
            star2 =srcPath+ "star2"+imgPng;
            star3 = srcPath+ "star2"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }else{
            star1 =srcPath+ "star2"+imgPng;
            star2 =srcPath+ "star2"+imgPng;
            star3 = srcPath+ "star2"+imgPng;
            star4 =srcPath+ "star2"+imgPng;
            star5 =srcPath+ "star2"+imgPng;
            starArr=[star1,star2,star3,star4,star5];
          }
          return starArr
}
