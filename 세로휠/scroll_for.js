$(function(){
    //1.화면의 세로값 변수에 데이터로 저장
    let wh=$(window).height();
    const page=$('section');
    layout();
    //2.화면 크기변경 맞추어 다시 저장하도록 하기
    $(window).resize(function(){
        wh=$(window).height();
        layout();
    });
    //3.section에 세로크기와 배경색 지정
    function layout(){
        const bg=['red','pink','yellow','green'];
        page.css({
            height:wh,
            backgroundColor:function(index){
                return bg[index];
            }
        });
    }
    //4..circle클릭하면 해당 순번과 
    //동일한 순번의 section이 보여지도록 하기
    $('.circle').click(function(){
        let i=$(this).index();
        let nowTop=wh*i;
        //console.log(i);
        $('html,body').stop().animate({
            scrollTop:nowTop
        },1500);
    });
    //5.스크롤의 변화 감지하고 on클래스를 추가/제거
    //#top_but가 두번째 section부터 보여지고 첫번쩨 section에서만 보여지지 않도록 처리
    const but=$('#top_but');
    $(window).scroll(function(){
        let scroll=$(window).scrollTop();
        console.log(scroll,page.length);
        for(let i=0;i<page.length;i++){//0~3
            if(scroll>=wh*i && scroll<wh*(i+1)){
                //첫번째 section : scroll>=0 && scroll<wh*1
                //두번째 section : scroll>=wh*1 && scroll<wh*2
                //세번째 section : scroll>=wh*2 && scroll<wh*3
                //네번째 section : scroll>=wh*3 && scroll<wh*4
                $('.circle').removeClass('on').eq(i).addClass('on');
            }
        }
        if(scroll>=wh){
            but.addClass('show');
        }else{
            but.removeClass('show');
        }
    });
    page.on('mousewheel',function(event,delta){
        //event:마우스 휠이 움직일 때 이벤트 객체
        //delta:마우스휠의 방향
        let targetSection=Number(event.currentTarget.dataset.page);
        console.log('첫번째 매개변수=',event,'두번째 매개변수=',delta,'현재 section의 data value=',targetSection);
        if(delta > 0){//delta가 1일때
            if(targetSection>0){
                let prev=$(this).prev().offset().top;
                $('html,body').stop().animate({
                    scrollTop:prev
                },1500,'easeInCirc');
                console.log('up');
            }
        }else if(delta < 0){//delta가 -1일때
            if(targetSection<page.length-1){
                let next=$(this).next().offset().top;
                $('html,body').stop().animate({
                    scrollTop:next
                },1500,'easeInCirc');
                console.log('down');
            }
        }
        //.offset().top : 상단 위치값 가져오기
    });
    //#top_but클릭시 최상단이동
    //태그의 기본 이벤트 발생 막기
    but.on('click',function(e){
        //console.log(e);
        e.preventDefault();//href=""링크이동막기
        $('html,body').animate({
            scrollTop:0
        },300);
    });
});