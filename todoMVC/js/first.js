$(function () {
    // 查询
    $('#search').click(function() {
        var searchVal = $('.nav').find('input').val();
        switch(searchVal) {
            case '格言':
                window.location.href = '#aArea'
                break;
            case '相册':
                window.location.href = '#bArea'
                break;
            case '剧本':
                window.location.href = '#cArea'
                break;
            case '留言':
                window.location.href = '#dArea'
                break;
        }
    });
    
    // 轮播
    $(".fullSlide").slide({ 
        titCell:".hd ul", mainCell:".bd ul", effect:"fold",  autoPlay:true, autoPage:true, trigger:"click"
    });

    // 我的相册,无缝滚动
    $(".bArea li a").hover(function () {
        $(this).addClass("on");
    }, function () {
        $(this).removeClass("on");
    });
    $(".bArea").slide({
        mainCell: ".bd ul",
        autoPlay: true,
        effect: "leftMarquee",
        vis: 5,
        interTime: 40,
        trigger: "click"
    });

    // 我的剧本,tab切换
    $(".cArea .bd").slide({titCell: ".cHd ul li", mainCell: ".cBd", effect: "fold"});

    // 心情日志
    xinQingInit();
    function xinQingInit() {
        var xqArr = '';
        // 获取localStorage中的数据
        if (window.localStorage.getItem('my_xinqing') == null) {
            xqArr = []
        }else {
            var xqStr = window.localStorage.getItem('my_xinqing');
            xqArr = JSON.parse(xqStr);
        }
        for (var i = 0; i < xqArr.length; i++) {
            // console.log(xqArr[i].text);
            var str = '';
            str += '<li>';
            str += '<img src="images/xinqing_sm.jpg" width="200" height="126" alt="心情日志"/>';
            str += '<div class="tm">';
            str += '<span>'+xqArr[i].text+'</span>';
            str += '</div>';
            str += '</li>';
            $('.xinqing').append(str);
        }
    }

    // 遮罩,注意需要在ul添加li之后,否则获得不了ul子节点DOM
     $(".pic-sma li").hover(function(){
        $(this).find(".tm").stop().fadeToggle().siblings().stop().fadeToggle();
    });

    // 发表说说
    speakInit();

    // 将发表说说内容写入到storage中
    $('.speakBtn').click(function() {
        // 随机个头像
        var peopleImg = Math.ceil(Math.random()*6);
        // 获取发表的言论
        var value = $('.speaking').val();
        // 先要获取localStorage中的数据
        if (window.localStorage.getItem('speakContent') == null) {
            var speakArr = [];
        }else {
            var speakStorage = window.localStorage.getItem('speakContent');
            var speakArr = speakStorage.split(',');
        }
        // 添加到localStorage
        speakArr.push(value);
        // console.log(speakArr); //speakArr刷新

        var speakStr = '';
        speakStr += '<li>';
        speakStr += '<div class="pic"><img src="images/visitor0'+peopleImg+'.jpg" width="48" height="48" alt="头像"/></div>';
        speakStr += '<div class="txt"><a href="#">'+value+'</a></div>';
        speakStr += '</li>';

        // 此时的speakArr就是页面需要呈现的内容板块
        $('#shuoshuo').append(speakStr);

        // 写入到localStorage
        window.localStorage.setItem('speakContent',speakArr);

        $('.speaking').val('');
    });
    function speakInit() {
        if (window.localStorage.getItem('speakContent') == null) {
            var speakArr = [];
        }else {
            var speakStorage = window.localStorage.getItem('speakContent');
            var speakArr = speakStorage.split(',');
        }
        // 此时的speakArr就是页面需要呈现的内容板块
        for (var i = 0; i < speakArr.length; i++) {
            var speakTxt = '';
            speakTxt += '<li>';
            speakTxt += '<div class="pic"><img src="images/visitor0'+Math.ceil(Math.random()*6)+'.jpg" width="48" height="48" alt="头像"/></div>';
            speakTxt += '<div class="txt"><a href="#">'+speakArr[i]+'</a></div>';
            speakTxt += '</li>';
            // 此时的speakArr就是页面需要呈现的内容板块
            $('#shuoshuo').append(speakTxt);
        }
    }

    // 返回顶部
    $(window).scroll(function () {
        var sTop = $(document).scrollTop();
        if (sTop > 0) {
            $('.topArea').addClass('fixed');
            $(".returnTop").show(300);
            $(".returnTop").click(function () {
                // window.scrollTo(0,0);  //scrollTop大于零,返回顶部图标显示
                $("html,body").stop().animate({"scrollTop": 0}, 800);
            });
        }
        else {
            $('.topArea').removeClass('fixed');
            $(".returnTop").hide();
        }
    });
});
