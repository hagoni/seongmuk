<!-- 사이트맵 start -->
<div id="sitemapWrap" class="sitemap_wrap">
	<a href="<?=$root?>/" class="stm_logo"><img src="<?=$root?>/img/common/bi.png" alt="" class="w100"></a>
	<div class="sitemap center">
        <ul class="stm_depth1_ul">
<?
$depth1_link_query = "SELECT * FROM `".TABLE_LEFT."group` WHERE view3_use = '1' AND view3_setup = '$html_idx' ORDER BY view3_order";
$depth1_result = @mysql_query($depth1_link_query);
while($depth1_list = @mysql_fetch_assoc($depth1_result)) {
    $depth2_link_query = "SELECT * FROM `".TABLE_LEFT."board` WHERE view3_use = '1' AND view3_setup = '$html_idx' AND view3_group_idx = '".$depth1_list['view3_idx']."' ORDER BY view3_order";
    $depth2_result = @mysql_query($depth2_link_query);
	unset($depth1_link);
	while($depth2_list = mysql_fetch_assoc($depth2_result)) {
		switch($depth2_list['view3_style']) {
			case 'html':
				if(file_exists(ROOT_INC.'/html/'.$depth2_list['view3_link'])) {
					$depth1_link = $root.'/html/'.$depth2_list['view3_link'];
				}
				break;
			case 'board':
				$depth1_link = BOARD.'/index.php?board='.$depth2_list['view3_link'];
				break;
			case 'http':
				$depth1_link = $depth2_list['view3_link'].'" target="_blank';
				break;
			case 'url':
				$depth1_link = $depth2_list['view3_link'];
				break;
			default:
				if(file_exists(ROOT_INC.'/html/'.$depth2_list['view3_link'])) {
					$depth1_link = $root.'/html/'.$depth2_list['view3_link'];
				}
		}
		if($depth1_link) {
			if($depth2_list['view3_sca']) {
				if(strpos($depth1_link, '?') > -1) $depth1_link .= '&amp;sca='.$depth2_list['view3_sca'];
				else $depth1_link .= '?sca='.$depth2_list['view3_sca'];
			}
			break;
		}
	}
?>
			<li class="stm_depth1_li<?=$depth1_list['view3_order_css']?> stm_depth1_li<?if($depth1_list['view3_order_css'] == $gnb_index){echo ' on';}?>">
				<a href="<?=$depth1_link?>" class="stm_depth1_a"><?=$depth1_list['view3_title_02']?></a>
				<ul class="stm_depth2_ul_pc fs_def t_center">
<?
$depth2_result = @mysql_query($depth2_link_query);
$depth2_i = 1;
while($depth2_list = @mysql_fetch_assoc($depth2_result)) {
	switch($depth2_list['view3_style']) {
		case 'html':
			$depth2_link = $root.'/html/'.$depth2_list['view3_link'];
			break;
		case 'board':
			$depth2_link = BOARD.'/index.php?board='.$depth2_list['view3_link'];
			break;
		case 'http':
			$depth2_link = $depth2_list['view3_link'].'" target="_blank';
			break;
		case 'url':
			$depth2_link = $depth2_list['view3_link'];
			break;
		default:
			$depth2_link = $root.'/html/'.$depth2_list['view3_link'];
	}
	if($depth2_list['view3_sca']) {
		if(strpos($depth2_link, '?') > -1) $depth2_link .= '&amp;sca='.$depth2_list['view3_sca'];
		else $depth2_link .= '?sca='.$depth2_list['view3_sca'];
	}
	$depth2_link .= '#'.$depth2_i;
?>
					<li class="stm_depth2_li<?if($gnb_index != 3 && $depth1_list['view3_order_css'] == $gnb_index && $depth2_list['view3_order_css'] == $minor_index){echo ' on';}?>">
						<a href="<?=$depth2_link?>" class="stm_depth2_a"><?=$depth2_list['view3_title_01']?></a>
					</li>
<?
	$depth2_i++;
}
?>
				</ul>
				<div class="stm_depth2_slide swiper-container">
					<ul class="stm_depth2_ul swiper-wrapper">
<?
	$depth2_result = @mysql_query($depth2_link_query);
	$depth2_i = 1;
	while($depth2_list = @mysql_fetch_assoc($depth2_result)) {
		switch($depth2_list['view3_style']) {
			case 'html':
				$depth2_link = $root.'/html/'.$depth2_list['view3_link'];
				break;
			case 'board':
				$depth2_link = BOARD.'/index.php?board='.$depth2_list['view3_link'];
				break;
			case 'http':
				$depth2_link = $depth2_list['view3_link'].'" target="_blank';
				break;
			case 'url':
				$depth2_link = $depth2_list['view3_link'];
				break;
			default:
				$depth2_link = $root.'/html/'.$depth2_list['view3_link'];
		}
		if($depth2_list['view3_sca']) {
			if(strpos($depth2_link, '?') > -1) $depth2_link .= '&amp;sca='.$depth2_list['view3_sca'];
			else $depth2_link .= '?sca='.$depth2_list['view3_sca'];
		}
		$depth2_link .= '#'.$depth2_i;
?>
						<li class="swiper-slide stm_depth2_li<?if($gnb_index != 3 && $depth1_list['view3_order_css'] == $gnb_index && $depth2_list['view3_order_css'] == $minor_index){echo ' on';}?>">
							<a href="<?=$depth2_link?>" class="stm_depth2_a"><?=$depth2_list['view3_title_01']?></a>
						</li>
<?
        $depth2_i++;
    }
?>
					</ul>
				</div>
			</li>
<?
}
?>
		</ul>
	</div>
	<a href="#none" class="stm_close bindSitemapFold">사이트맵 닫기</a>
</div>
<!-- //사이트맵 end -->