/**
 * 游戏配置
 */


 var gameConfig = {
     width : 1440,
     height : 1080,
     rows : 3,//行数
     cols : 3,//列数
     isOver : false, //游戏是否结束
     imgurl : "wife.jpg",  //图片路径 ,注意相对页面的路径
     dom :document.getElementById("game") //游戏的dom对象
 };

 //每一个小块的宽度
 gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
 gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;

//div的数量
gameConfig.pieceNumbear = gameConfig.rows * gameConfig.cols;

var blocks = []; //包含小方块信息数组

function isEqual(n1, n2) {
    return parseInt(n1) === parseInt(n2);
}

/**
 * 小方块的构造函数
 * @param {*} left 
 * @param {*} top 
 * @param {*} isVisible  小方块是否可见
 */
function Block(left, top, isVisible) {
      this.left = left; //当前的横坐标
      this.top = top; //当前的纵坐标
      this.correctLeft = this.left; //正确的横坐标
      this.correctTop = this.top; //正确的纵坐标
      this.isVisible = isVisible; //是否可见
      this.dom = document.createElement("div");;
      this.dom.style.width = gameConfig.pieceWidth + "px";
      this.dom.style.height = gameConfig.pieceHeight +"px";
      this.dom.style.background = `url("${gameConfig.imgurl}") -${this.correctLeft}px -${this.correctTop}px`;
      this.dom.style.position = "absolute";
      this.dom.style.border = "1px solid #fff";
      this.dom.style.boxSizing = "border-box";
      this.dom.style.cursor = "pointer"
      this.dom.style.transition = ".5s"; //csc属性变化的时候,在0.5秒内完成.
      if(!isVisible) {
          this.dom.style.display = "none"; 
      }
      gameConfig.dom.appendChild(this.dom); //在元素末尾加上一个子元素
 
      this.show = function () {
          // 根据当前left top 重新设置div的位置
          this.dom.style.left = this.left + "px";
          this.dom.style.top  = this.top + "px";
      }
      //判断当前方块是否在正确位置上
      this.isCorrect = function() {
          return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
      }



      this.show();

    }




/**
 * 初始化游戏
 */
function init() {
    // 1.初始化游戏的容器
    initGameDom();
     // 2. 初始化小方块
     //2.1 准备好一个数组,数组每一项是营养膏对象,记录了每一个方块的信息
    initBlocksArray();
     //2.2 数组洗牌
    shuffle();

    //3. 注册点击事件
    regEvent();
    
    function regEvent() {
        var inVisibleBlock = blocks.find(function (b) {
             return !b.isVisible;
        });
       blocks.forEach(function(b){
           b.dom.onclick = function (){
               if(gameConfig.isOver) {
                   return;
               }
            //    判断是否可以交换
               if(b.top === inVisibleBlock.top && isEqual(Math.abs(b.left - inVisibleBlock.left), gameConfig.pieceWidth) ||
                b.left === inVisibleBlock.left && isEqual(Math.abs(b.top - inVisibleBlock.top), gameConfig.pieceHeight)
                    ){
                        // 交换当前方块和看不见的方块的坐标位置
               exchange(b, inVisibleBlock);
                
               // 判断结束判定
               isWin();

               }
              
                    
           }
       })

    }
    
    /**
     * 游戏结束判定
     */
    function isWin () {
        var wrongs = blocks.filter (function(item) {
            return !item.isCorrect();
        });
        if(wrongs.length === 0) {
            gameConfig.isOver = true;
            blocks.forEach(function(b){
               b.dom.style.border = "none";
               b.dom.style.display = "block";
            });
        }
    }





    /**
     * 随机获取
     * @param {*} max 最大值
     * @param {*} min 最小值
     */
     function getRandom(max, min) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
     }



     function exchange(b1, b2) {
         var temp = b1.left;
         b1.left = b2.left;
         b2.left = temp;
         //2.交换top
         temp = b1.top;
         b1.top = b2.top;
         b2.top = temp;
         b1.show();
         b2.show();
         
             }



     /**
      * 给blocks数组洗牌
      */
     function shuffle () {
         for(var i = 0; i < blocks.length - 1; i++) {
             // 随机产生一个下标
             var index = getRandom(0, blocks.length - 2);
             //将数组的当项与随机项交换left 和top 值
             //1.交换left
             exchange(blocks[i], blocks[index]);
         }
     }

    
     
 
  



    /**
     * 初始化一个小方块的数组
     */
    function initBlocksArray() {
       for(var i = 0; i < gameConfig.rows; i++) {
           for(var j = 0; j < gameConfig.cols; j++ ) {
               // i 行号  j 列号
            //    blocks.push({
            //        left: j * gameConfig.pieceWidth, //当前横坐标
            //        top : i * gameConfig.pieceHeight, //当前纵坐标
                   
            //    });
               var isVisible = true;
               if(i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                   isVisible = false;
               }
          var b =  new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible);
               blocks.push(b);
           }
       }
    }

      /**
       * 初始化容器
       */
    function initGameDom() {
      gameConfig.dom.style.width = gameConfig.width + "px";
      gameConfig.dom.style.height = gameConfig.height + "px";
      gameConfig.dom.style.border = "2px solid #ccc"
      gameConfig.dom.style.position = "relative";
    }                                

    
}
 init();


