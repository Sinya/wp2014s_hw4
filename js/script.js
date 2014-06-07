// JavaScript Document

/*
這檔案協助你編寫JS，請注意每個code block的使用，若你對自己的javascript很有信心，或是你認為我寫的方式有bug，歡迎自行修改編排
*/

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
                         $("body").append('My links is' + response.link);
                         $("body").append('My Username is' + response.username); document.getElementsByTagName('body').innerHTML = ""
                         $("body").append('My ID is' + response.id);
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
     //                    for (var i = 0; i < response.data.length; i++){
					// 		console.log(response.data[i].name);
					// 		}
     //                });
					
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


//以下為canvas的程式碼，基本上不需多動，依據comments修改即可
	
	//起始畫面
	var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
	ctx.font='20px "Arial"'; //設定字體與大小
	ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270); //設定預設的開始畫面
    var img = new Image(); // 新增圖像1
    img.src = "img/overlay.png"; //圖像路徑（路徑自己設，且自己加入想要的圖層）
	var img2 = new Image(); //新增圖像2
	img2.src = "img/overlayback.png" //圖像路徑
	var img3 = new Image();//新增圖像3
	img3.src = "img/typography.png"//圖像路徑
	
	

	//宣告基本變數
    var canvas=document.getElementById("canvas"); //宣告變數找到canvas標籤
    var ctx=canvas.getContext("2d"); //找到2d內容
    var canvasOffset=$("#canvas").offset();//找到offset
    var offsetX=canvasOffset.left;//左方
    var offsetY=canvasOffset.top;//上方
    var canvasWidth=canvas.width;//大小
    var canvasHeight=canvas.height;//高度
    var isDragging=false;//拖拉

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
      //isDragging=false;
    }

    function handleMouseMove(e){//滑鼠移動的event
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // if the drag flag is set, clear the canvas and draw the image
   //    if(isDragging){ //當拖拉為True時
   //        	ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
			// var profileIMG = document.getElementById("preview1");//抓html裡預載入的照片
			// profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			// canvas.width = profileIMG.width;//設定canvas的大小需符合profileimg的大小
			// canvas.height = profileIMG.height;
			// ctx.drawImage(profileIMG,0,0);//從XY軸0，0值開始畫如profileimg
			// ctx.drawImage(img3,canMouseX-128/2,canMouseY-120/2); //劃入img3，並根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
			// ctx.drawImage(img2,0,0); //劃入img2
			// var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			// ctx.fillStyle = "black"; //字體顏色
			// ctx.font='20px "微軟正黑體"'; //字體大小和字形
			// ctx.fillText(inputedText, canMouseX-1/2,canMouseY-30/2); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
   //    }
    }

	//抓取滑鼠移動的event
    $("#canvas").mousedown(function(e){handleMouseDown(e);});
    $("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUp(e);});
    $("#canvas").mouseout(function(e){handleMouseOut(e);});


//可以思考這程式要放在init內還是init外?




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
FB.api('/me/albums?fields=id,name', function(response) {
  for (var i = 0; i < response.data.length; i++) {
    var album = response.data[i];
    window.album = album;

    console.log(album);

    console.log(album.name);

    $("#album").append("<option id="+album.id + ">"+ album.name + "</option>");


   //    FB.api('/'+album.id+'/photos', function(photos){
   //      if (photos && photos.data && photos.data.length){
   //        for (var j=0; j<photos.data.length; j++){
   //          var photo = photos.data[j];
   //          // photo.picture contain the link to picture
   //          var image = document.createElement('img');
   //          image.src = photo.picture;
   //          // document.body.appendChild(image);
   //          $("#photo").append("<img id="+photo.id + " src=" + image.src  + " onClick=" + "alert(" + "\"HelloWorld!\"" + ")" + ">");
			// console.log(image.src);
   //        }
   //      }
   //    });
 
  // 	console.log(strUser);

}});
};


function getMyPhoto(album) {
// $("#photo img").remove();
      FB.api('/'+album.id+'/photos', function(photos){
        if (photos && photos.data && photos.data.length){
          for (var j=0; j<photos.data.length; j++){
            var photo = photos.data[j];
            // photo.picture contain the link to picture
            var image = document.createElement('img');
            image.src = photo.picture;
            // document.body.appendChild(image);
            // $("#photo").append("<img id="+photo.id + " src=" + image.src  + " onClick=" + "alert(" + "\"HelloWorld!\"" + ")" + ">");
			$("#photo").append("<img id="+photo.id + " src=" + image.src  + " crossorigin=" + "\"anonymousdrawImage\"" + " onClick=" + "photoClick(" + photo.id + ")" + ">");
			console.log(image.src);
          }
        }
      });
 
};

function photoClick(id) {

	//起始畫面
	var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
	ctx.font='20px "Arial"'; //設定字體與大小
	ctx.fillText("Click here to start fill with Facebook Profile Picture", 240, 270); //設定預設的開始畫面
    var img = new Image(); // 新增圖像1
    img.src = "img/overlay.png"; //圖像路徑（路徑自己設，且自己加入想要的圖層）
	var img2 = new Image(); //新增圖像2
	img2.src = "img/overlayback.png" //圖像路徑
	var img3 = new Image();//新增圖像3
	img3.src = "img/typography.png"//圖像路徑
	

	var canvas=document.getElementById("canvas"); //宣告變數找到canvas標籤
    var ctx=canvas.getContext("2d"); //找到2d內容
    var canvasOffset=$("#canvas").offset();//找到offset
    var offsetX=canvasOffset.left;//左方
    var offsetY=canvasOffset.top;//上方
    var canvasWidth=canvas.width;//大小
    var canvasHeight=canvas.height;//高度
    // var isDragging=false;//拖拉

	// document.getElementById(id).setAttribute('id', 'preview1');
          	ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
			var profileIMG = document.getElementById(id);//抓html裡預載入的照片
			profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			// canvas.width = profileIMG.width;//設定canvas的大小需符合profileimg的大小
			// canvas.height = profileIMG.height;

			canvas.width = profileIMG.width*3;//設定canvas的大小需符合profileimg的大小
			canvas.height = profileIMG.height*3;
			console.log(profileIMG.height)
			console.log(profileIMG.width)

			ctx.drawImage(profileIMG,0,0);//從XY軸0，0值開始畫如profileimg
			ctx.drawImage(img3,canMouseX-128/2,canMouseY-120/2); //劃入img3，並根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
			ctx.drawImage(img2,0,0); //劃入img2
			var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形
			ctx.fillText(inputedText, canMouseX-1/2,canMouseY-30/2); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置


};

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




