<!-- lnb_wrap start -->
<div class="lnb_wrap">
    <ul class="lnb fs_def">
<?
$depth2_link_query = "SELECT * FROM `".TABLE_LEFT."board` WHERE view3_use = '1' AND view3_setup = '$html_idx' AND view3_group_idx = '".$group_list['view3_idx']."' ORDER BY view3_order";
$depth2_result = mysql_query($depth2_link_query);
while($depth2_list = mysql_fetch_assoc($depth2_result)) {
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
?>
    	<li<?if($depth2_list['view3_order_css'] == $minor_index){echo ' class="on"';}?>>
    		<a href="<?=$depth2_link?>"><?=strip_tags(html_entity_decode($depth2_list['view3_title_01']))?></a>
    	</li>
<?
}
?>
    </ul>
</div>
<!-- //lnb_wrap end -->
