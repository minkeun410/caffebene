// sub-menu

$(function(){
    $(".gnb ul").on("mouseover focus", function(){
            $(".sub-menu").show()
            $("#header").addClass("menu-bg")
        });
    
    $(".gnb ul").on("mouseout blur", function(){
        $(".sub-menu").hide()
        $("#header").removeClass("menu-bg")
    });
});


// main-slide

function slide(){
    var wid = 0; //슬라이드 가로값(브라우저100%)
    var i = 0; //현재 인덱스
    var slide_length = 0; //슬라이드,인디케이터의 갯수(인덱스)

    // 초기화
    function init(){
        wid = $(".slide").width(); //브라우저의 너비(100%)
        i = $(".img-indi > li.indi-on").index(); //인디케이터(on)의 인덱스
        slide_length = $(".img-indi > li").length; //인디케이터의 갯수
    }

    // 슬라이드 실행(왼쪽이동,인디케이터가 활성화되는 상태)
    function slideMover(){
        $(".img-panel").stop().animate({"margin-left":-wid * i},300);
        $(".img-indi>li").removeClass("indi-on");
        $(".img-indi>li").eq(i).addClass("indi-on");
    }

    function slideEvent(){
    // 자동 실행(진짜 이동, 활성화-인덱스를 찾아주는 함수)
    function autoMove(){
        setInterval(function(){
            if(i == slide_length - 1){
                i++;
                var cloneCont = $(".img-panel").children("li:nth-child(1)").clone();
                var move = wid*5;

                $(".img-panel").css({"width":move});
                cloneCont.appendTo(".img-panel");
                $(".img-panel").stop().animate({"margin-left": -wid * i+1},300);

                i = 0;
                $(".img-indi>li").removeClass("indi-on");
                $(".img-indi>li").eq(i).addClass("indi-on");

                setTimeout(function(){
                    $(".img-panel").find(">li").eq(slide_length-1).nextAll().remove();
                    $(".img-panel").stop().css({"margin-left": 0, "width": wid * 4});
                },300);
            }else{
                i++;
                slideMover();
            }
            
        },4000);
    }

    //인디케이터를 클릭했을때(인덱스가 일치되서 활성화)
    function indicator(){
        $(".img-indi>li").click(function(){
            i = $(this).index();
            slideMover();
        });
    }
    autoMove();
    indicator();
    }


    // 화면크기 재설정
    function autoResize(){
        $(window).resize(function(){
            init();
            $(".img-panel").animate({"margin-left":-wid * i},0);
        });
    }

    init();
    slideEvent();
    autoResize();
}

$(document).ready(function(){ 
    slide();
});

// contents 1 hover 고양이 등장
$(function(){
    $(".cont1-left > ul > li").hover(function(){

        var i = Math.floor(Math.random()*5);
        var iconImages = new Array();

        iconImages[0]='<img src="http://www.caffebene.co.kr/images/common/cat1.png" class="hovercat">';
        iconImages[1]='<img src="http://www.caffebene.co.kr/images/common/cat2.png" class="hovercat">';
        iconImages[2]='<img src="http://www.caffebene.co.kr/images/common/cat3.png" class="hovercat">';
        iconImages[3]='<img src="http://www.caffebene.co.kr/images/common/cat4.png" class="hovercat">';
        iconImages[4]='<img src="http://www.caffebene.co.kr/images/common/cat5.png" class="hovercat">';

        $(this).append(iconImages[i]);
    },function(){
        $(".hovercat").remove();
    }

    );
});

// icon을 li를 hover했을때 html로 img태크가 작성되는것!

// header 고정

$(function(){
    $(window).scroll(function(){
        var hei = $(document).scrollTop();
        if(hei>=150){
            $(header).css({"position":"fixed"});
        }else{
            $(header).css({"position":"relative"});
        }
    }); 
});

//md-slide

function mdSlide(){

    var show = 6;
    var $slidePanel = $(".slide-panel");
    var view = $slidePanel.width();
    var movin = view/show;
    var $slideLi = $(".slide-panel>li")

    function mdSlideEvent(){

        $(".md-next").click(function(){
            nextPlay();
        });


        $(".md-prev").click(function(){
            prevPlay();
        });

        mdAutoPlay();
        mdAutoPlayStop();
        mdAutoPlayRestart();
    }

    function nextPlay(){
        $slidePanel.animate({'margin-left':-movin*2},function(){
            $(this).css({'margin-left':-movin}).find("li:last").after($(this).find("li:first"));
        });
    };

    function prevPlay(){
        $slidePanel.animate({'margin-left':0},function(){
            $(this).css({'margin-left':-movin}).find("li:first").before($(this).find("li:last"));
        });
    };

    function mdAutoPlay(){
        auto = setInterval(function(){
            nextPlay();
        },4000);
    };
    function mdAutoPlayStop(){
        $slideLi.mouseenter(function(){
            clearInterval(auto);
        });
        $(".md-prev").mouseenter(function(){
            clearInterval(auto);
        });
        $(".md-next").mouseenter(function(){
            clearInterval(auto);
        });
    };
    function mdAutoPlayRestart(){
        $slideLi.mouseleave(function(){
            auto = setInterval(function(){
                nextPlay();
            },4000);
        });
        $(".md-prev").mouseleave(function(){
            auto = setInterval(function(){
                nextPlay();
            },4000);
        });
        $(".md-next").mouseleave(function(){
            auto = setInterval(function(){
                nextPlay();
            },4000);
        });
    };

    nextPlay();
    mdSlideEvent();
}

$(document).ready(function(){
    mdSlide();
});