var s_time;
function showBC(){
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
	do_showBC(msg);
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

function setUrl(msg,hm){
	if(msg=='世嘉美女'){
		$.getJSON("http://24c-quatre.niaoke.com/x/getphoto.php",
        function(data){
			var xx = data["data"];
			var yy = xx[0];
			var murl = 'http://24c-quatre.niaoke.com'+yy.photo;
			$('#nn').width(640);
			$('#mm').attr('src',murl).show();
			$('#ttt').click(function(){openTab(murl);});
        });
	}
	else if(msg=='凤凰美女'){
		var h = hm.substr(0,2);
		var m = hm.substr(2,3);
		var _time = h+':'+m;
		$.ajax({url:"http://app.fashion.ifeng.com/clock/slide.php?time="+_time,dataType:'html',cache:false,success:function(html){
			var s = html.substring(html.indexOf('res.fa')-7,html.indexOf('"590')-8);
			$('#nn').width(590);
			$('#mm').attr('src',s).show();
			$('#ttt').click(function(){openTab(s);});
		}
        });
	}
	else if(msg=='车展美女'){
		$.getJSON("http://2010.niaoke.com/x/getphoto.php",
        function(data){
			var xx = data["data"];
			var yy = xx[0];
			var murl = 'http://2010.niaoke.com'+yy.photo;
			$('#nn').width(640);
			$('#mm').attr('src',murl).show();
			$('#ttt').click(function(){openTab(murl);});
        });
	}
	else if(msg=='鸟客美女'){
		$.ajax({url:'http://24.niaoke.com/index1.php',dataType:'html',cache:false,success:function(html){
			var s = html.substring(html.indexOf('"photo"')+9,html.indexOf('"up_num"')-2);
			s = 'http://24.niaoke.com'+s;
			$('#nn').width(640);
			$('#mm').attr('src',s).show();
			$('#ttt').click(function(){openTab(s);});
		}
		});
	}
	else if(msg=='天涯美女'){
		$.ajax({url:'http://24.niaoke.com/tianya/',dataType:'html',cache:false,success:function(html){
			var s = html.substring(html.indexOf('"photo"')+9,html.indexOf('"up_num"')-2);
			s = 'http://24.niaoke.com'+s;
			$('#nn').width(640);
			$('#mm').attr('src',s).show();
			$('#ttt').click(function(){openTab(s);});
		}
		});
	}
	else if(msg=='苏州美女'){
		$.getJSON("http://bbs.szr.com/clock.php",
        function(data){
			var murl = 'http://bbs.szr.com/'+data["img"];
			$('#nn').width(586);
			$('#mm').attr('src',murl).show();
			$('#ttt').click(function(){openTab(murl);});
        });
	}
	else if(msg=='搜道美女'){
		$.getJSON("http://www.sodao.com/showtime/gt",
        function(data){
			var x = data[0];
			var murl = x.path;
			$('#nn').width(630);
			$('#mm').attr('src',murl).show();
			$('#ttt').click(function(){openTab(murl);});
        });
	}
	else if(msg=='合肥美女'){
		$.getJSON("http://www.sodao.com/showtime/gt?pcs_id=8",
        function(data){
			var x = data[0];
			var murl = x.path;
			$('#nn').width(630);
			$('#mm').attr('src',murl).show();
			$('#ttt').click(function(){openTab(murl);});
        });
	}
	else if(msg=='青岛美女'){
		$.getJSON("http://www.sodao.com/showtime/gt?pcs_id=9",
        function(data){
			var x = data[0];
			var murl = x.path;
			$('#nn').width(630);
			$('#mm').attr('src',murl).show();
			$('#ttt').click(function(){openTab(murl);});
        });
	}
	else if(msg=='韩国美女2'){
		$.ajax({url:'http://www.talkon.co.kr/www/include/left_main_img.php',dataType:'html',cache:false,success:function(html){
			var s = html.substring(html.indexOf('img src')+9,html.indexOf('width=')-2);
			$('#nn').width(320);
			$('#mm').attr('src',s).show();
			$('#ttt').click(function(){openTab(s);});
		}
		});
	}
	else{
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
		else if(msg=='宁波美女'){
			var h = hm.substr(0,2);
			var m = hm.substr(2,3);
			url = 'http://xf.cnnb.com.cn/sz/style/mm/'+h+'_'+m+'.jpg';
		}
		else if(msg=='盛大美女'){
			url = 'http://pic.static.sdo.com/ts2/ts2_act/project/GirlClock/images/Girl/'+hm+'.jpg';
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
		
		if(msg=='巴黎美女'||msg=='美少女'){
			$('#nn').width(240);
		}
		else if(msg=='台湾正妹'){
			$('#nn').width(400);
		}
		else if(msg=='上海美女'){
			$('#nn').width(500);
		}
		else if(msg=='西安美女'){
			$('#nn').width(610);
		}
		else if(msg=='盛大美女'){
			$('#nn').width(600);
		}
		else if(msg=='宁波美女'){
			$('#nn').height(420);
		}
		else{
			$('#nn').width(590);
		}
		
		if(msg=='AV女优'){
			var _html = '<IFRAME SRC="http://www.avtokei.jp/tokeis/time?authenticity_token=y6Nfx1CL7mJsEIrpS3i%2BwHMmP0UGwf1Md0KBndjGo8A%3D" WIDTH="590" HEIGHT="450" FRAMEBORDER="0"  MARGINWIDTH="0" MARGINHEIGHT="0" SCROLLING="no"> </IFRAME>';
			$('#mm').remove();
			$('#nn').html(_html);
			$('#ttt').click(function(){openTab('http://www.avtokei.jp/tokeis/time?authenticity_token=y6Nfx1CL7mJsEIrpS3i%2BwHMmP0UGwf1Md0KBndjGo8A%3D');});
		}
		else{
			$('#mm').attr('src',url).show();
			$('#ttt').click(function(){openTab(url);});
		}
	}
}

function openTab(u){
	chrome.tabs.create({url: u});
}

function do_showBC(msg){
	var hm = getHM();
	if(s_time!=hm){
		s_time = hm;
		setUrl(msg,hm);
	}
	window.setInterval(function() {
		do_showBC(msg);
	}, 1000*30);
}