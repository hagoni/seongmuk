<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
unset($_SESSION['data']);
$total_data = mysql_num_rows(mysql_query("SELECT view3_idx FROM `".TABLE_LEFT.$board."` WHERE view3_use = '1'"));
$list_page = 10;
$start = ($view3_page - 1) * $list_page;
page($total_data, $list_page, 5, $path_next, "img", $view3_page, $end_page_path);
?>
<div class="career">
    <!-- layer1 start -->
    <div class="lyr1 layer1 rel">
        <div class="lyr1_line abs"><img src="<?=$root?>/img/page/car/lyr1_line" alt=""></div>
        <p class="lyr_ttl title">(주)성묵이 원하는 인재상</p>
        <div class="ttl_box">
            <div class="box_in">
                <div class="left_area">
                    <p class="box_ttl">회사 사훈</p>
                </div>
                <div class="right_area">
                    <p class="box_sttl">경사이신(<span class="hk_b">敬事而信</span>)</p>
                    <p class="box_text">일을 공경히(성심성의껏) 함으로써 <br class="br_m">신뢰(믿음과 성공)를 얻는다.<br>논어(<span class="hk">論語</span>) 학이(<span class="hk">學而</span>)편에 나오는 말씀</p>
                </div>
            </div>
        </div>
        <p class="lyr_text text">주식회사 성묵의 인재상은 사훈을 바탕으로 합니다</p>
        <ul>
            <li class="li1">
                <div class="img_area">
                    <div class="fig_img"><img src="<?=$root?>/img/page/car/lyr1_fig1.png" alt="" class="w100"></div>
                    <div class="fig_ttl">열정과<br>도전</div>
                </div>
                <div class="text_area">
                    <p class="li_sttl">BELIEVE</p>
                    <p class="li_text text">끊임없는 열정으로 <br>새로운것에 도전하는 인재</p>
                </div>
            </li>
            <li class="li2">
                <div class="img_area">
                    <div class="fig_img"><img src="<?=$root?>/img/page/car/lyr1_fig2.png" alt="" class="w100"></div>
                    <div class="fig_ttl">창의와<br>혁신</div>
                </div>
                <div class="text_area">
                    <p class="li_sttl">FAITHFULNESS</p>
                    <p class="li_text text">창의력과 혁신으로 <br>세상을 변화시키는 인재</p>
                </div>
            </li>
            <li class="li3">
                <div class="img_area">
                    <div class="fig_img"><img src="<?=$root?>/img/page/car/lyr1_fig3.png" alt="" class="w100"></div>
                    <div class="fig_ttl">정직과<br>신뢰</div>
                </div>
                <div class="text_area">
                    <p class="li_sttl">HONESTY</p>
                    <p class="li_text text">정직과 신뢰로 <br>자신의 역할과 책임을 다하는 인재</p>
                </div>
            </li>
        </ul>
    </div>
    <!-- //layer1 end -->
    <!-- layer2 start -->
    <div class="layer2 lyr2">
        <p class="lyr_ttl title">복리후생</p>
        <p class="lyr_text text">열심히 일한 성묵인, 당당히 누리셔도 됩니다!</p>
        <ul class="lyr2_ul fs_def">
            <li class="first">
                <div class="v_mid">
                    <p class="li_ttl">복지페이<br>상하반기 지급</p>
                    <p class="li_text text">네이버페이</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">생일축하금 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">생일/결혼기념일 <br>반차</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">입사첫돌<br>1주년 반차</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">도서지원비</p>
                    <p class="li_text text">분기별 <br class="br_m">도서문화상품권 5만원 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">문화생활비</p>
                    <p class="li_text text">분기별 <br class="br_m">스타벅스 쿠폰 5만원 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">체력단련비 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">반반차휴가</p>
                    <p class="li_text text">2시간단위 자유롭게 사용</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">휴가비 및 연차/휴가</p>
                    <p class="li_text text">휴가비 지급 및 <br class="br_m">자유로운 연차/휴가사용</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">출산축하금 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">신입사원 선물</p>
                    <p class="li_text text">선물패키지 증정</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">경조사비 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">명절상여금 지급</p>
                </div>
            </li>
            <li>
                <div class="v_mid">
                    <p class="li_ttl">장기근속 <br class="br_m">리프레쉬 휴가</p>
                    <p class="li_text text">만3년 포상휴가5일, <br class="br_m">휴가비50만원 지급, <br>휴가 미사용시 <br class="br_m">총 100만원 지급</p>
                </div>
            </li>
        </ul>
    </div>
    <!-- //layer2 end -->

    <p class="lyr_ttl title">(주)성묵 모집공고</p>
    <p class="lyr_text text">주식회사 성묵에서 인재를 기다립니다.</p>

<?
$ongoing_select_query = "SELECT view3_idx FROM `".TABLE_LEFT.$board."` WHERE view3_use = '1' AND (view3_open = '0000-00-00 00:00:00' || view3_open <= NOW())";
$ongoing_total_query = " AND (view3_close = '0000-00-00 00:00:00' OR view3_close >= NOW() - INTERVAL 1 DAY)";
$ongoing_cond1_query = " AND view3_special_02 LIKE '%신입%'";
$ongoing_cond2_query = " AND view3_special_02 LIKE '%경력%'";
$ongoing_total1 = mysql_num_rows(mysql_query($ongoing_select_query.$ongoing_total_query));
$ongoing_total2 = mysql_num_rows(mysql_query($ongoing_select_query.$ongoing_total_query.$ongoing_cond1_query));
$ongoing_total3 = mysql_num_rows(mysql_query($ongoing_select_query.$ongoing_total_query.$ongoing_cond2_query));
?>
        <div class="ad_state fs_def t_center">
            <p class="lyr_tit">진행중인 채용공고</p>
            <ul>
                <li>전체<span><?=$ongoing_total1?></span></li>
                <li>신입<span><?=$ongoing_total2?></span></li>
                <li>경력<span><?=$ongoing_total3?></span></li>
            </ul>
        </div>
        <div class="ad_listing over_h">
            <ul>
<?
$list_query = "SELECT * FROM `".TABLE_LEFT.$board."` WHERE view3_use = '1' AND (view3_open = '0000-00-00 00:00:00' OR view3_open <= NOW()) ORDER BY view3_write_day DESC";
$result = mysql_query($list_query);
while($list = mysql_fetch_assoc($result)) {
    $path_view = URL_PATH.'?'.view3_link('||idx||select||search','view&select='.$view3_select.'&search='.$view3_search.'&idx='.$list['view3_idx']);
    if($list['view3_check_01'] == 1) {
		$status_text = '마감';
    } else if($list['view3_open'] == '0000-00-00 00:00:00' && $list['view3_close'] == '0000-00-00 00:00:00') {
		$status_text = '상시';
	} else if($list['view3_open'] != '0000-00-00 00:00:00' && $list['view3_close'] == '0000-00-00 00:00:00') {
		$status_text = '채용시 마감';
	} else if(time() >= strtotime($list['view3_close']) + 86400) {
		$status_text = '마감';
	} else {
        $write_day = new DateTime($list['view3_write_day']);
        $close_day = new DateTime($list['view3_close']);
        $today = new DateTime('NOW');
        $interval1 = date_diff($today, $close_day);
        $interval2 = date_diff($write_day, $today);
        if($interval1->days > 0) {
            $status_text = 'D-'.($interval1->days);
        } else if($interval1->days == 0) {
            $status_text = 'D-DAY';
        }
	}
?>
                <li>
                    <a href="<?=$path_view?>">
                        <p class="ad_comp">
                            <span class="ellipsis"><?=$list['view3_special_01']?></span><span class="type"><?=str_replace('||', '·', $list['view3_special_02'])?></span>
                        </p>
                        <p class="ad_title"><?=$list['view3_title_01']?><?if($interval2->days < 3){?><span class="new"><img src="<?=$skin_path?>/img/new_lbl.jpg" alt="NEW"></span><?}?></p>
                        <p class="d_day"><?=$status_text?></p>
                    </a>
                </li>
<?
}
?>
            </ul>
        </div>
        <!-- paging start -->
      	<div class="paging">
      		<?=$out_page?>
      	</div>
      	<!-- //paging end -->

</div>
<script src="<?=$root?>/js/YMotion.js"></script>
<script type="text/javascript">
    TweenMax.to($('.layer1 .li1 .fig_img'), 40.0, {rotationZ: 360, ease: Power0.easeNone, repeat: -1});
    TweenMax.to($('.layer1 .li2 .fig_img'), 40.0, {rotationZ: 360, ease: Power0.easeNone, repeat: -1});
    TweenMax.to($('.layer1 .li3 .fig_img'), 40.0, {rotationZ: 360, ease: Power0.easeNone, repeat: -1});
</script>