$(function () {
  //메인화면 슬라이드 (index.html)
  if ($('.main_slide_wrapper').length) {
    var swiper = new Swiper('.main_slide-container', {
      slidesPerView: 1,
      spaceBetween: 25,
      width: 270,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  //홈 카테고리 슬라이드
  if ($('.category_menus').length) {
    $('.swiper-wrapper').slick({
      // 페이지네이션
      dots: false,
      // 이전, 다음버튼
      arrows: false,
      infinite: true,
      speed: 300,
      // 현재 포커스된 슬라이드요소
      slidesToShow: 1,
      // 중간정렬 (true -> 요소들의 중간부분이 화면에 보여지게됨)
      centerMode: false,
      variableWidth: true,
    });
  }

  //히스토리 뒤로가기
  $('.go_back').click(function (e) {
    e.preventDefault();

    // history가 1보다 많을경우에만 뒤로가기버튼 작동
    if (window.history.length > 1) {
      // window.history.back();
      window.history.go(-1);
    } else {
      // history가 1이하일 경우 home으로 이동
      location.href = './index.html';
    }
  });

  //Aside Menu
  if ($('.aside_menu_toggle').length) {
    var asideToggleBtn = $('.aside_menu_toggle');

    asideToggleBtn.click(function () {
      $('body').toggleClass('aside_active');
      // $('aside').css('left', '0');
    });

    // Aside Menu Accodion
    var asideMenuList = $('.categories > li');
    asideMenuList.click(function () {
      $(this).siblings('li').find('ul').slideUp();
      $(this).find('ul').slideToggle();
    });
  }
  //상세페이지 썸네일 슬라이드
  if ($('.product_thumb_slides').length) {
    var swiper = new Swiper('.product_thumb_container', {
      slidesPerView: 1,
      spaceBetween: 13,
      width: 138,
    });

    //이미지 변경하기
    var thumbImg = $('.product_thumb_slides li img');
    var targetImg = $('.product_img_top img');

    // thumbImg를 클릭하면 targetImg의 경로가 바뀌도록
    thumbImg.click(function () {
      var targetImgUrl = $(this).attr('src');

      targetImg.attr('src', targetImgUrl);
    });
  }

  // 상세페이지 별표
  if ($('.review_content').length) {
    var rating = $('.review_content li .rating');
    // 만약 폰트어썸으로 가져온 아이콘일경우 i태그로 가져오면안됨
    // svg로 들어오기때문
    /*
      rating마다 할일
      각각이 가지고 있는 별점을 변수명 starscore에 저장
      저장된 값만큼 nth:child를 이용해서 svg의  color를 #f05522로 변경
    */
    rating.each(function () {
      var starscore = $(this).attr('data-rate');

      $(this)
        .find('span:nth-child(-n+' + starscore + ')')
        .css({ color: '#f05522' });
    });
  }

  //장바구니 합계 구하기
  //카트에 담겨진 상품이 있다면
  if ($('.cart_list li').length) {
    var cartList = $('.cart_list li');
    var targetTotal = $('.total_price .price');
    var shippingCost = parseInt($('.shipping .price').text().replace('$ ', ''));
    // 계산할 값을 담을 변수
    var totalprice = 0;

    var itemDelBtn = cartList.find('.cart_item_del');
    console.log(shippingCost);

    //열리자마자 합계 다시계산
    calcTotal();

    //수량을 바꾸면 합계를 다시계산
    //  $('.qty input').change(function () {
    //    calcTotal();
    //  });
    // 위의 코드와 같은의미
    $('.qty input').change(calcTotal);

    //x눌러서 item삭제하면 합계 다시계산
    itemDelBtn.click(function () {
      // 사용자에게 확인을 받아서 (yes / no)
      var userAction = confirm('정말로 지울건가요?');
      // yes이면 true이므로 삭제시킴
      if (userAction) {
        $(this).parent().remove();
        calcTotal();
      }
    });

    //합계구하기 함수
    function calcTotal() {
      //
      cartList = $('.cart_list li');
      totalprice = 0;

      //상품이 장바구니에 있을때만 단가계산
      if (cartList.length > 0) {
        //li들마다 할일
        cartList.each(function () {
          //상품가격 추출
          var unitPrice = parseInt($(this).find('.unit_price').text().replace('$', ''));
          //담긴수량
          var unitCount = $(this).find('input').val();

          // 총가격 = 해당아이템의단가 x 해당아이템의갯수
          totalprice += unitPrice * unitCount;
          var subtotal = (totalprice + shippingCost).toLocaleString('en') + '.00';
          var grandTotal = '$ ' + subtotal;

          targetTotal.text(grandTotal);
        });
      } else {
        targetTotal.text('$ 0.00');
      }
    } //calcTotal
  }

  //검색
}); //document.ready
