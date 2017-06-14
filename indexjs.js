$(document).ready(function(){
  //定义参数
  //水平垂直速度
  var speedX = 10;
  var speedY = 10;
  var timer = null;
  var speed = 500;
  var str = "right";
  //事物的坐标
  var foodX =0;//食物x坐标
  var foodY =0;//食物y坐标
  //头部的位置实时更新
  var disX = 0;
  var disY = 0;
  //新食物
  var new_p;

  //获取头部坐标
  var oFirp = document.getElementById("snake-head");
  //获取地图id
  var odiv = document.getElementById('content');
  //点击开始
  $(".start").on("click",function(){
    startMove(str);
  });
  $(".stop").on("click",function(){
    clearInterval(timer);
  });

  //建场地
  for(var i=0; i<80*60; i++){
    var divbox = document.createElement('div');
    divbox.className = 'box';
    odiv.appendChild(divbox);
  }
  //建蛇身
  var snakearr = [];
  var oP = document.getElementsByClassName("snake_body");
  for(var i =0;i<5;i++){
    oP[i].style.left = 100 - 10*i + "px";
    oP[i].style.top = "200px";
    snakearr.push(oP[i]);
  }
  //运动函数
  function startMove(position){
    clearInterval(timer);
    var move = function(){
      var fir_positionX = oFirp.offsetLeft;//蛇头x轴
      var fir_positionY = oFirp.offsetTop;//蛇头y轴
      //判断方向
      if(position=="up"){
        oFirp.style.left = oFirp.offsetLeft + "px";
        oFirp.style.top = oFirp.offsetTop - speedY + "px";
      }
      if(position=="down"){
        oFirp.style.left = oFirp.offsetLeft + "px";
        oFirp.style.top = oFirp.offsetTop + speedY + "px";
      }
      if(position=="left"){
        oFirp.style.left = oFirp.offsetLeft - speedX + "px";
        oFirp.style.top = oFirp.offsetTop  + "px";
      }
      if(position=="right"){
        oFirp.style.left = oFirp.offsetLeft + speedX + "px";
        oFirp.style.top = oFirp.offsetTop + "px";
      }
      for(var i = snakearr.length-1 ; i > 0 ; i--){
        if(i == 1){
          snakearr[1].style.left = fir_positionX + "px";
          snakearr[1].style.top = fir_positionY + "px";
        }else{
          snakearr[i].style.left = snakearr[i-1].style.left;
          snakearr[i].style.top = snakearr[i-1].style.top;
          //console.log(snakearr[i],888888);
        }
      }
      disX = parseInt(oFirp.offsetLeft);
      disY = parseInt(oFirp.offsetTop);
      to_death();//判断撞墙
      //eat_food();//吃掉食物
      food_eat();
    };
    move();
    timer = setInterval(move,speed);
  }
  //方向判断
  position_key(document);
  function position_key(element){
    element.onkeydown = function(e){
      e = e||event;
      switch(e.keyCode){
        //空格 暂停
        case 32:
          clearInterval(timer);
          break;
        //up
        case 38:
          if(str!=="down"){
            startMove("up");
            str = "up";
          }
          //console.log("up");
          break;
        //down
        case 40:
          if(str!=="up"){
            startMove("down");
            str = "down";
          }
          //console.log("down");
          break;
        //left
        case 37:
          if(str!=="right"){
            startMove("left");
            str = "left";
          }
          //console.log("left");
          break;
        //right
        case 39:
          if(str!=="left"){
            startMove("right");
            str = "right";
          }
          //console.log("right");
          break;
      }
    }
  }
  //墙体判断.碰到自己蛇身
  function to_death(){
    if(disX<0||disX>=990||disY<0||disY>=470){
      alert("挂了！！！！！");
      clearInterval(timer);
      history.go(0);//刷新页面
    }
    //5. 判断碰到自己
    for(var i=4; i<snakearr.length; i++){
      if(snakearr[i].offsetLeft == disX && snakearr[i].offsetTop == disY){
        alert('挂了！！！！！');
        clearInterval(timer);
        history.go(0);//刷新页面
      }
    }
  }
  //食物数组
  var foodarr = [];
  //随机初始化30个food
  function food_fd(){
    for(i=0; i<30; i++){
      foodX = parseInt(Math.random()*95)*10;
      foodY = parseInt(Math.random()*45)*10;
      new_p= document.createElement("span");
      new_p.className = 'food';
      new_p.style.left = foodX + 'px';
      new_p.style.top = foodY + 'px';
      odiv.appendChild(new_p);
      foodarr.push(new_p);
    }
  }
  food_fd();
  //吃掉起始30个食物
  function food_eat(){
    for(i=0; i<foodarr.length; i++){
      if(disX == foodarr[i].offsetLeft && disY == foodarr[i].offsetTop){
        //snakearr.push(foodarr[i]);
          snakearr.splice(4,0,foodarr[i])
          create_food();
        //foodarr[i].style.display = "none";
        return;
      }
    }
  }
  //随机一个(food)
  function create_food(){
    foodX = parseInt(Math.random()*95)*10;
    foodY = parseInt(Math.random()*45)*10;
    new_p = document.createElement("span");
    new_p.className = 'food';
    new_p.style.left = foodX + "px";
    new_p.style.top = foodY + "px";
    odiv.appendChild(new_p);
    foodarr.push(new_p);
  }
  //吃掉果实后，加长
 /* function eat_food(){
    console.log(disX,disY,2121)
    if(disX==foodX && disY==foodY){
      snakearr.push(new_p);
      create_food();
    }
  }*/

  //场地换皮肤
  $(".skin_li_o").on("click",function(){
    $(".skin").addClass("skin_bj1").removeClass("skin_li").removeClass("skin_bj3").removeClass("skin_bj2");;
  });
  $(".skin_li_t").on("click",function(){
    $(".skin").addClass("skin_bj2").removeClass("skin_bj1").removeClass("skin_bj3");
  });
  $(".skin_li_e").on("click",function(){
    $(".skin").addClass("skin_bj3").removeClass("skin_bj2").removeClass("skin_bj1");
  });
  //食物换皮肤
  /*function liji(){
   $("food").addClass("food_li");
  }
  liji();*/
  $(".food_li_o").on("click",function(){
    $(".food").addClass("food_bj1").removeClass("food_li").removeClass("food_bj2").removeClass("food_bj3");
  });
  $(".food_li_t").on("click",function(){
    $(".food").addClass("food_bj2").removeClass("food_bj1").removeClass("food_bj3");
  });
  $(".food_li_e").on("click",function(){
    $(".food").addClass("food_bj3").removeClass("food_bj2").removeClass("food_bj1");
  });
  //蛇身换皮肤
  $(".snake_li_o").on("click",function(){
    $(".snake").addClass("snake_bj1").removeClass("snake_li").removeClass("snake_bj2").removeClass("snake_bj3");
  });
  $(".snake_li_t").on("click",function(){
    $(".snake").addClass("snake_bj2").removeClass("snake_bj1").removeClass("snake_bj3");
  });
  $(".snake_li_e").on("click",function(){
    $(".snake").addClass("snake_bj3").removeClass("snake_bj2").removeClass("snake_bj1");
  });


  //面向对象
  /*function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.lessons = ['Math', 'Physics'];
  }
  Person.prototype = {
    constructor: Person,//原型字面量方式会将对象的constructor变为Object，此外强制指回Person
    getName: function () {
      return this.name;
    }
  }
  var person1 = new Person('Jack', 19, 'SoftWare Engneer');
  person1.lessons.push('Biology');
  var person2 = new Person('Lily', 39, 'Mechanical Engneer');
  alert(person1.name);//Math,Physics,Biology
  alert(person2.name);//Math,Physics
  alert(person1.getName === person2.getName);//true,//共享原型中定义方法*/

})