var animationFrames = 36;
var animationSpeed = 10; // ms
var canvas;
var canvasContext;
var iconImage;
var rotation = 0;
var nowMinute = -1;
var nowHour = -1;
var loadingAnimation = new LoadingAnimation();
var notification = null;
var isNotified = 0;

function LoadingAnimation() {
  this.timerId_ = 0;
  this.maxCount_ = 8; 
  this.current_ = 0;  
  this.maxDot_ = 4; 
}

	if (localStorage["gc_show_notification"] == null ||
        localStorage["gc_show_notification"] == "") {
      localStorage["gc_show_notification"] = "true";
   }

LoadingAnimation.prototype.paintFrame = function() {
  var text = "";
  for (var i = 0; i < this.maxDot_; i++) {
    text += (i == this.current_) ? "." : " ";
  }
  if (this.current_ >= this.maxDot_)
    text += "";

  chrome.browserAction.setBadgeText({text:text});
  this.current_++;
  if (this.current_ == this.maxCount_)
    this.current_ = 0;
}

LoadingAnimation.prototype.start = function() {
  if (this.timerId_)
    return;

  var self = this;
  this.timerId_ = window.setInterval(function() {
    self.paintFrame();
  }, 100);
}

LoadingAnimation.prototype.stop = function() {
  if (!this.timerId_)
    return;

  window.clearInterval(this.timerId_);
  this.timerId_ = 0;
}

function init() {
  canvas = document.getElementById('canvas');
  iconImage = document.getElementById('iconImage');
  canvasContext = canvas.getContext('2d');
  loadingAnimation.start();
  startWork();
}

function scheduleWork() {
  window.setTimeout(startWork, 1000*30);
}

function startWork() {
	loadingAnimation.stop();
	var date = new Date();
	var hour = date.getHours();
	//var hour = xx(hou);
	var minute = date.getMinutes();
	//var minute = xx(minu);
	if(minute==0||minute==30){
		updateNowTime(hour,0);
	}
	else{
		updateNowTime(minute,1);
	}
    scheduleWork();
}

function showHtml() {
	if (localStorage["gc_show_notification"] != null && localStorage["gc_show_notification"] == "true") {
		try {
			if(isNotified==0){
				notification = webkitNotifications.createHTMLNotification(
				'../notify.html'  // html url - can be relative
				);
				notification.show();
				isNotified = 1;
			}
		} catch (e) {
         console.error(e);
      }
   }
}

function resetNotified(){
	isNotified = 0;
}

function updateNowTime(ttime,type) {
	if(type==1){
		if (nowMinute != ttime) {
			nowMinute = ttime;
			showHtml();
			animateFlip(1);
		}
	}
	else if(type==0){
		if (nowHour != ttime) {
			nowHour = ttime;
			resetNotified();
			showHtml();
			animateFlip(0);
		}
	}
}

function ease(x) {
  return (1-Math.sin(Math.PI/2+x*Math.PI))/2;
}

function animateFlip(type) {
  rotation += 1/animationFrames;
  drawIconAtRotation();

  if (rotation <= 1) {
    setTimeout("animateFlip("+type+")", animationSpeed);
  } else {
    rotation = 0;
    
	if(type==1){
		chrome.browserAction.setBadgeText({text: nowMinute+'m' });
		chrome.browserAction.setBadgeBackgroundColor({color:[0,230,138,115]});
	}
	else if(type==0){
		chrome.browserAction.setBadgeText({text: nowHour+'h' });
		chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
		//drawIconAtRotation();
	}
  }
}

function drawIconAtRotation() {
  canvasContext.save();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.translate(
      Math.ceil(canvas.width/2),
      Math.ceil(canvas.height/2));
  canvasContext.rotate(2*Math.PI*ease(rotation));
  canvasContext.drawImage(iconImage,
      -Math.ceil(canvas.width/2),
      -Math.ceil(canvas.height/2));
  canvasContext.restore();

  chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0,
      canvas.width,canvas.height)});
}

function getNotification(){
	return notification;
}

/*********************************************************************************************************************************************************/
function getBeSet(){
	var msg = localStorage["favorite_beauty"];
	if (!msg) {
		msg = "日本美女";
	}
	return msg;
}

function getUrl(){
	var msg = localStorage["favorite_beauty"];
	if (!msg) {
		msg = "日本美女";
	}
	else if(msg=='随机'){
		var msgs = ['日本美女','日本辣妹','韩国美女','赛车宝贝','北海道美女','台湾正妹','巴黎美女','广州美女','上海美女','韩国美女2','世嘉美女','车展美女','鸟客美女','天涯美女','西安美女','盛大美女','搜道美女','合肥美女','青岛美女','宁波美女','凤凰美女','朝日美女','仙台美女','香港美女','神户美女','岡山美女','香川美女','鹿儿岛美女','新泻美女','福岡美女','名古屋美女','美魔女','久游美女','苏州美女','看板娘','早稻田风格美女','美女新娘','美少女','东京美女','秋田美女','群马美女','金沢美女','福井美女','大阪美女','京都美女','冲绳美女','熊本美女','琦玉美女','千叶美女','广岛美女'];
		var bound1 = parseInt($(msgs).length);
        var ran = Math.floor(Math.random() * bound1);
		$.each(msgs,function(n,value) {   
			if(n==ran){
				msg = value;
			}
        }); 
	}
	var hm = getHM();
	return setUrl(msg,hm);
}

function getHM(){
	var date = new Date();
	var hou = date.getHours();
	var hour = xx(hou);
	var minu = date.getMinutes();
	var minute = xx(minu);
	return hour+""+minute;
}

function getHour(){
	var date = new Date();
	var hou = date.getHours();
	var hour = xx(hou);
	return hour;
}

function setUrl(msg,hm){
		var  url;
		if(msg=='日本美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/bijin/590x450/'+hm+'.jpg';
		}
		else if(msg=='日本辣妹'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://gal.bijint.com/assets/pict/gal/590x450/'+hm+'.jpg';
		}
		else if(msg=='韩国美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kr/590x450/'+hm+'.jpg';
		}
		else if(msg=='赛车宝贝'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/cc/590x450/'+hm+'.jpg';
		}
		else if(msg=='北海道美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/hokkaido/590x450/'+hm+'.jpg';
		}
		else if(msg=='朝日美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/tv-asahi/590x450/'+hm+'.jpg';
		}
		else if(msg=='仙台美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/sendai/590x450/'+hm+'.jpg';
		}
		else if(msg=='香港美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/hk/590x450/'+hm+'.jpg';
		}
		else if(msg=='神户美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kobe/590x450/'+hm+'.jpg';
		}
		else if(msg=='岡山美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/okayama/590x450/'+hm+'.jpg';
		}
		else if(msg=='香川美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kagawa/590x450/'+hm+'.jpg';
		}
		else if(msg=='鹿儿岛美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kagoshima/590x450/'+hm+'.jpg';
		}
		else if(msg=='新泻美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/niigata/590x450/'+hm+'.jpg';
		}
		else if(msg=='福岡美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/fukuoka/590x450/'+hm+'.jpg';
		}
		else if(msg=='名古屋美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/nagoya/590x450/'+hm+'.jpg';
		}
		else if(msg=='美魔女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/bimajo/590x450/'+hm+'.jpg';
		}
		else if(msg=='看板娘'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/k-musume/590x450/'+hm+'.jpg';
		}
		else if(msg=='早稻田风格美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/wasedastyle/590x450/'+hm+'.jpg';
		}
		else if(msg=='美女新娘'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/hanayome/590x450/'+hm+'.jpg';
		}
		else if(msg=='美少女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/bishoujo/240x320/'+hm+'.jpg';
		}
		else if(msg=='东京美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/tokyo/590x450/'+hm+'.jpg';
		}
		else if(msg=='秋田美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/akita/590x450/'+hm+'.jpg';
		}
		else if(msg=='群马美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/gunma/590x450/'+hm+'.jpg';
		}
		else if(msg=='金沢美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kanazawa/590x450/'+hm+'.jpg';
		}
		else if(msg=='福井美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/fukui/590x450/'+hm+'.jpg';
		}
		else if(msg=='大阪美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/osaka/590x450/'+hm+'.jpg';
		}
		else if(msg=='京都美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kyoto/590x450/'+hm+'.jpg';
		}
		else if(msg=='冲绳美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/okinawa/590x450/'+hm+'.jpg';
		}
		else if(msg=='熊本美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/kumamoto/590x450/'+hm+'.jpg';
		}
		else if(msg=='琦玉美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/saitama/590x450/'+hm+'.jpg';
		}
		else if(msg=='千叶美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/chiba/590x450/'+hm+'.jpg';
		}
		else if(msg=='广岛美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/hiroshima/590x450/'+hm+'.jpg';
		}
		else if(msg=='台湾正妹'){
			url = 'http://www.clockm.com/tw/img/clk/hour/'+hm+'.jpg';
		}
		else if(msg=='巴黎美女'){
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/paris/240x320/'+hm+'.jpg';
		}
		else if(msg=='广州美女'){
			url = 'http://d.mmclock.cn/pics/'+hm+'.jpg';
		}
		else if(msg=='上海美女'){
			var h = hm.substr(0,2);
			var m = hm.substr(2,3);
			url = 'http://www.bgclock.com/photos/h'+h+'/m'+m+'.jpg';
		}
		else if(msg=='盛大美女'){
			url = 'http://pic.static.sdo.com/ts2/ts2_act/project/GirlClock/images/Girl/'+hm+'.jpg';
		}
		else if(msg=='宁波美女'){
			var h = hm.substr(0,2);
			var m = hm.substr(2,3);
			url = 'http://xf.cnnb.com.cn/sz/style/mm/'+h+'_'+m+'.jpg';
		}
		else if(msg=='久游美女'){
			var yt = Math.ceil(Math.random()*3); 
			url = 'http://voteimage1.9you.com/img/pp/clock/image/girl/'+yt+'/'+hm+'.jpg';
		}
		else if(msg=='西安美女'){
			var h = hm.substr(0,2);
			var m = hm.substr(2,3);
			url = 'http://www.xianzhijia.com/clock/upload/'+h+'dian'+m+'.jpg';
		}
		else{
			url = 'http://www.gmodules.com/ig/proxy?url=http://www.bijint.com/assets/pict/bijin/590x450/'+hm+'.jpg';
		}
		
		if(msg=='AV女优'){
			var _html = '<IFRAME SRC="http://www.avtokei.jp/tokeis/time?authenticity_token=y6Nfx1CL7mJsEIrpS3i%2BwHMmP0UGwf1Md0KBndjGo8A%3D" WIDTH="590" HEIGHT="450" FRAMEBORDER="0"  MARGINWIDTH="0" MARGINHEIGHT="0" SCROLLING="no"> </IFRAME>';
			return _html;
		}
		else{
			return url;
		}
}

function openTab(u){
	chrome.tabs.create({url: u});
}

function xx(m){
	var n;
	if(m<10){
		n = '0'+m;
	}
	else{
		n = m;
	}
	return n;
}
