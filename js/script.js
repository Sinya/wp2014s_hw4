// JavaScript Document

window.fbAsyncInit = function () {//facebook init
    
//輸入基本的Facebook init的狀態，與Facebook 連接，包括APP ID的設定
FB.init({
    appId: '1457767671135040', //api 2.0 nccu web test
    xfbml: true,
    version: 'v2.0'
    });

FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    //呼叫api把圖片放到#preview IMG tag 內

                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;

                    window.authToken = accessToken;
                    window.response = response;

                    FB.api('/me', function (response) {
                        //console.log(response);
                         // $("body").append('My links is' + response.link);
                         // $("body").append('My Username is' + response.username); document.getElementsByTagName('body').innerHTML = ""
                         // $("body").append('My ID is' + response.id);
                         console.log(response)
                    });

                    // FB.ui({
                    //     method: 'share',
                    //     href: 'http://sinya.github.io/wp2014s_hw2/index.html',
                    // }, function (response) {});
					
                    // FB.ui({
                    //     method: 'send',
                    //     link: 'http://sinya.github.io/wp2014s_hw2/index.html',
                    // });

					// FB.api('/me/likes', function (response) {
					// 	console.log(response)
                    //     for (var i = 0; i < response.data.length; i++){
					// 		console.log(response.data[i].name);
					// 		}
                    //    });
					
					FB.api('/me/picture?type=normal', function(response) { // normal/large/squere 
						var str="<img src="+ response.data.url +">";
						$('body').append(str);
						console.log(response)

					});	
					
					// FB.api('/me/photos', 'post', {
					// 	name:"test",
					// 	message: 'this is parse photo',
					// 	url: "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/1559309_10200792278284162_2128488932_o.jpg"//如果要init運行只能用絕對絕對路徑
					// }, function (response) {
					// 	if (!response || response.error) {
					// 		alert('Error occured:' + response);
					// 		console.log(response);
					// 	} else {
					// 		alert('Post ID: ' + response.id);
					// 	}
					// });    

  } else if (response.status === 'not_authorized') {
    //要求使用者登入，索取publish_actions權限
    				console.log("this user is not authorizied your apps");
                    FB.login(function (response) {
                    	console.log(response)
                        // FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
                        if (response.authResponse) { // if user login to your apps right after handle an event
                            window.location.reload();
                        };
                    }, {
                        scope: 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes'
                    });
	
  } else {
    //同樣要求使用者登入
     				console.log("this isn't logged in to Facebook.");
                    FB.login(function (response) {
                        if (response.authResponse) {
                            window.location.reload();
                        } else {
                            //alertify.alert('An Error has Occurs,Please Reload your Pages');
                        }
                    });

  }
 });


}; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<init end



//LOAD FACEBOOK SDK ASYNC，這是基本的東西，應該不用多說了吧
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; 
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function getMyAlbum(response) {

	$("#albumGET").remove();

FB.api('/me/albums?fields=id,name', function(response) {
  for (var i = 0; i < response.data.length; i++) {
    var album = response.data[i];
    // window.album = album;

    console.log(album);

    console.log(album.name);

    $("#album").append("<option id="+album.id + ">"+ album.name + "</option>");

}});
};

	var canvas=document.getElementById("canvas"); //宣告變數找到canvas標籤
    var ctx=canvas.getContext("2d"); //找到2d內容
    var canvasOffset=$("#canvas").offset();//找到offset

    var offsetX=canvasOffset.left;//左方
    var offsetY=canvasOffset.top;//上方
    var canvasWidth=canvas.width;//大小
    var canvasHeight=canvas.height;//高度

	var isDragging=false;//拖拉
	var canMouseX=0;
	var canMouseY=0;

	var selectIMG;
	var frame=false;
    var word=false;
    var pic=true;

	var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
	ctx.font='20px "Arial"'; //設定字體與大小
	ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270); //設定預設的開始畫面
    var img = new Image(); // 新增圖像1
    img.src = "img/overlay.png"; //圖像路徑（路徑自己設，且自己加入想要的圖層）
	var img2 = new Image(); //新增圖像2 
	img2.src = "img/overlay1.png" //圖像路徑
	var img3 = new Image();//新增圖像3
	img3.src = "img/typography.png"//圖像路徑

// =================================================================================

function img(x, y, w, h, src) {
  // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
  // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
  // But we aren't checking anything else! We could put "Lalala" for the value of x 
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.src = src || 'http://www.techrepublic.com/1.8.2/bundles/techrepubliccore/images/icons/standard/icon-user-default.png';
}


// Draws this img to a given context
img.prototype.draw = function(ctx) {
  ctx.fillStyle = this.fill;
  ctx.fillRect(this.x, this.y, this.w, this.h);
}

// Determine if a point is inside the img's bounds
img.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the img's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
}

function CanvasState(canvas) {
  // **** First some setup! ****
  
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // **** Keep track of state! ****
  
  this.valid = false; // when set to false, the canvas will redraw everything
  this.imgs = [];  // the collection of things to be drawn
  this.dragging = false; // Keep track of when we are dragging
  // the current selected object. In the future we could turn this into an array for multiple selection
  this.selection = null;
  this.dragoffx = 0; // See mousedown and mousemove events for explanation
  this.dragoffy = 0;
  
  // **** Then events! ****
    // This is an example of a closure!
  // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
  // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
  // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
  // This is our reference!
  var myState = this;
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
    var mouse = myState.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;
    var imgs = myState.imgs;
    var l = imgs.length;
    for (var i = l-1; i >= 0; i--) {
      if (imgs[i].contains(mx, my)) {
        var mySel = imgs[i];
        // Keep track of where in the object we clicked
        // so we can move it smoothly (see mousemove)
        myState.dragoffx = mx - mySel.x;
        myState.dragoffy = my - mySel.y;
        myState.dragging = true;
        myState.selection = mySel;
        myState.valid = false;
        return;
      }
    }
    // havent returned means we have failed to select anything.
    // If there was an object selected, we deselect it
    if (myState.selection) {
      myState.selection = null;
      myState.valid = false; // Need to clear the old selection border
    }
  }, true);
   canvas.addEventListener('mousemove', function(e) {
    if (myState.dragging){
      var mouse = myState.getMouse(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      myState.selection.x = mouse.x - myState.dragoffx;
      myState.selection.y = mouse.y - myState.dragoffy;   
      myState.valid = false; // Something's dragging so we must redraw
    }
  }, true);
  canvas.addEventListener('mouseup', function(e) {
    myState.dragging = false;
  }, true);
  // double click for making new imgs
  // canvas.addEventListener('dblclick', function(e) {
  //   var mouse = myState.getMouse(e);
  //   myState.addimg(new img(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)'));
  // }, true);
  
  // **** Options! ****
  
  this.selectionColor = '#CC0000';
  this.selectionWidth = 2;  
  this.interval = 30;
  setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addimg = function(img) {
  this.imgs.push(img);
  this.valid = false;
}

CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}


// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {
  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var ctx = this.ctx;
    var imgs = this.imgs;
    this.clear();
    
    // ** Add stuff you want drawn in the background all the time here **
    
    // draw all imgs
    var l = imgs.length;
    for (var i = 0; i < l; i++) {
      var img = imgs[i];
      // We can skip the drawing of elements that have moved off the screen:
      if (img.x > this.width || img.y > this.height ||
          img.x + img.w < 0 || img.y + img.h < 0) continue;
      imgs[i].draw(ctx);
    }
    
    // draw selection
    // right now this is just a stroke along the edge of the selected img
    if (this.selection != null) {
      ctx.strokeStyle = this.selectionColor;
      ctx.lineWidth = this.selectionWidth;
      var mySel = this.selection;
      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // ** Add stuff you want drawn on top all the time here **
    
    this.valid = true;
  }
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();
function init() {
  var s = new CanvasState(document.getElementById('canvas'));
  s.addimg(new img(40,40,50,50)); // The default is gray
  s.addimg(new img(60,140,40,60, 'https://www.facebook.com/photo.php?fbid=614210118675707&set=t.1679244533&type=1&theater'));
  // Lets make some partially transparent
  s.addimg(new img(80,150,60,30, 'https://www.facebook.com/photo.php?fbid=614210118675707&set=t.1679244533&type=1&theater'));
  s.addimg(new img(125,80,30,80, 'https://www.facebook.com/photo.php?fbid=614210118675707&set=t.1679244533&type=1&theater'));
}

// Now go make something amazing!





// =================================================================================

	$("#pattern").change(function() {
    var val = $("#pattern option:selected").text();
    console.log(val)
    		img2.src = "img/" + val + ".png" ; //圖像路徑
	  	    ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
    		console.log(img2)
	  		ctx.drawImage(img2,0,0); //劃入img2
			console.log("=====")

				if (selectIMG != undefined) {
		  		ctx.drawImage(selectIMG,canMouseX-selectIMG.width/2,canMouseY-selectIMG.height/2,selectIMG.width,selectIMG.height);//從XY軸0，0值開始畫如profileimg
		     	}

		    ctx.drawImage(img3,270,300);
			var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形
			ctx.fillText(inputedText, 270+60,300+50/*canMouseX-1/2,canMouseY-30/2*/); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
	  		// ctx.drawImage(img2,0,0); //劃入img2

	});

	// $("#canvas").mouseover(function() {

	function handleMouseDown(e){//滑鼠按下的函數
      canMouseX=parseInt(e.clientX-offsetX);//抓滑鼠游標X
      canMouseY=parseInt(e.clientY-offsetY);//抓滑鼠游標y
      // set the drag flag
      isDragging=true;//宣告拖拉變數
    }

    function handleMouseUp(e){//滑鼠放掉的函數
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // clear the drag flag
      isDragging=false;
    }

    function handleMouseOut(e){//滑鼠移開的函數
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // user has left the canvas, so clear the drag flag
      isDragging=false;
    }

    function handleMouseMove(e){//滑鼠移動的event
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
   // if the drag flag is set, clear the canvas and draw the image
	      if(isDragging){ //當拖拉為True時
	  
			  if (selectIMG != undefined) {
			  	    ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
	  				ctx.drawImage(img2,0,0); //劃入img2
					ctx.drawImage(selectIMG,canMouseX-selectIMG.width/2,canMouseY-selectIMG.height/2,selectIMG.width,selectIMG.height);//從XY軸0，0值開始畫如profileimg
		      		// ctx.drawImage(selectIMG,canMouseX-150,canMouseY); //劃入img3，並根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
				    ctx.drawImage(img3,270,300);
					var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
					ctx.fillStyle = "black"; //字體顏色
					ctx.font='20px "微軟正黑體"'; //字體大小和字形
					ctx.fillText(inputedText, 270+60,300+50/*canMouseX-1/2,canMouseY-30/2*/); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置

		      	}
	     }
     }

	// 抓取滑鼠移動的event
    $("#canvas").mousedown(function(e){handleMouseDown(e);});
    $("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUp(e);});
    $("#canvas").mouseout(function(e){handleMouseOut(e);});

	$("#inputed").mouseover(function() {
	ctx.drawImage(img3,270,300);
	var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
	ctx.fillStyle = "black"; //字體顏色
	ctx.font='20px "微軟正黑體"'; //字體大小和字形
	ctx.fillText(inputedText, 270+60,300+50/*canMouseX-1/2,canMouseY-30/2*/); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
	});

function photoClick(id) {
	
			$("#photoContainer strong").remove();
        	ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
			selectIMG = document.getElementById(id);//抓html裡預載入的照片
			selectIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			// canvas.width = selectIMG.width;//設定canvas的大小需符合selectIMG的大小
			// canvas.height = selectIMG.height;

			// canvas.width = 540;//設定canvas的大小需符合selectIMG的大小
			// canvas.height = 500;
		
			ctx.drawImage(img2,0,0); //劃入img2

			// ctx.drawImage(selectIMG,0,0,selectIMG.width,selectIMG.height);//從XY軸0，0值開始畫如selectIMG
			ctx.drawImage(selectIMG,0,0,selectIMG.width,selectIMG.height);
			
			ctx.drawImage(img3,270,300);
			var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形
			ctx.fillText(inputedText, 270+60,300+50/*canMouseX-1/2,canMouseY-30/2*/); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置

			FB.api(
			    "/" + id + "/likes?summary=1",
			    function (response) {
			      if (response && !response.error) {
			        /* handle the result */
			        var like = response.summary;
			        console.log("l " + like.total_count); // 給抓的
    				$("#photoContainer").append("<strong>"+ like.total_count+ "Likes" + "</strong><br>" );

			      }
			    }
			);

			FB.api(
			    "/"+ id ,
			    function (response) {
			      if (response && !response.error) {
			        /* handle the result */
			        var photo = response;
			        console.log(photo);
			        console.log("ct " + photo.created_time.substring(0,10)); // 給抓的
    				$("#photoContainer").append("<strong>"+ "Creat at " + photo.created_time.substring(0,10) + "</strong>");

			      }
			    }
			);

};


$('#album').change(function() {
	    var val = $("#album option:selected").text();
	    // console.log(val)
	    // alert(val);

	$("#photo").empty();

	FB.api(
	    '/me/albums?fields=id,name',
	    function (response) {
	      if (response && !response.error) {
				for (var i = 0; i < response.data.length; i++) {
					    var album = response.data[i];
				    // var album = response.data[i];
				   	  if (album.name == val) {
				   	  	console.log(album.name);
						// function getMyPhoto(album) {
				   	  	// console.log("hihi");
								     FB.api('/'+album.id+'/photos', function(photos){
								       if (photos && photos.data && photos.data.length){
								         for (var j=0; j<photos.data.length; j++){
								           var photo = photos.data[j];
								           // photo.picture contain the link to picture
								           var image = document.createElement('img');
								           image.src = photo.picture;
								           // document.body.appendChild(image);
								           // $("#photo").append("<img id="+photo.id + " src=" + image.src  + " onClick=" + "alert(" + "\"HelloWorld!\"" + ")" + ">");
								$("#photo").append("<img id="+photo.id + " src=" + image.src  + " crossorigin=" + "\"Anonymous\"" + " class="+ "\"img\"" +" width=" + photo.width/4 +" height=" + photo.height/4 + " onClick=" + "photoClick(" + photo.id + ")" + ">");
								console.log(image.src);
								         }
						       }
						     });
						// };
						}
				}
	      /* handle the result */
	      }
	    }
	);

});

jQuery(document).ready(function() {

    // var images = jQuery('.thumb-wrapper img'); //caches the query when dom is ready
    var CELL_WIDTH = 150;
    var ASPECT = 1.1;
        
    jQuery( "#slider" ).slider({
        step: 5,
        min: 90,
        max: 200,
        value: 100,
        slide: function(event, ui) {
            // var size = (CELL_WIDTH * ui.value / 100) + "px";
               var size = (CELL_WIDTH * ui.value / 100) ;

            // images.stop(true).animate({width: size, height: size / ASPECT}, 250);
            ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
            ctx.drawImage(img2,0,0); //劃入img2

            ctx.drawImage(selectIMG,canMouseX-selectIMG.width/2,canMouseY-selectIMG.height/2,size/100*selectIMG.width,size/100*selectIMG.height);//從XY軸0，0值開始畫如selectIMG
			
			ctx.drawImage(img3,270,300);
			var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形
			ctx.fillText(inputedText, 270+60,300+50/*canMouseX-1/2,canMouseY-30/2*/); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置

        }
    });

});

function getMyUrl() {
	var inputedText = $('#inputbg').val();//抓取頁面inputed ID的內容
	img2.src = inputedText;
	if (selectIMG != undefined) {
	  	    ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
			ctx.drawImage(img2,0,0); //劃入img2
	  		ctx.drawImage(selectIMG,canMouseX-150,canMouseY,selectIMG.width,selectIMG.height); //劃入img3，並根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
	     	ctx.drawImage(img3,270,300);
			var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形
			ctx.fillText(inputedText, 270+60,300+50/*canMouseX-1/2,canMouseY-30/2*/); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
	     }
}

// Post a BASE64 Encoded PNG Image to facebook，以下程式為把照片po到facebook的方法，基本上這樣就可以不用動了，
// 但思考authToken該怎麼拿到，因為這裡我並沒有把使用者登入的token載入到這函數內，所以它是不會得到token的
function PostImageToFacebook(authToken) {
	$('.info').append('<img src="img/loading.gif"/>')//載入loading的img
    var canvas = document.getElementById("canvas");//找canvas
    var imageData = canvas.toDataURL("image/png");//把canvas轉換PNG
    try {
        blob = dataURItoBlob(imageData);//把影像載入轉換函數
    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
    var fd = new FormData();
    fd.append("access_token", authToken);//請思考accesstoken要怎麼傳到這function內
    fd.append("source", blob);//輸入的照片
    fd.append("message", "這是HTML5 canvas和Facebook API結合教學");//輸入的訊息
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,//GraphAPI Call
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);//成功log + photoID
                  $(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/" + data.id + " '>Go to Profile Picture</a>] "); //成功訊息並顯示連接
            },
            error: function (shr, status, data) {
                $(".info").html("error " + data + " Status " + shr.status);//如果錯誤把訊息傳到class info內
            },
            complete: function () {
                $(".info").append("Posted to facebook");//完成後把訊息傳到HTML的div內
            }
        });

    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
}


// Convert a data URI to blob把影像載入轉換函數
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab); // The Uint8Array type represents an array of 8-bit unsigned integers.
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}

