<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
?>
				<div class="view_btns_wrap">
<?
if($temp_prev) {
?>
					<a href="<?=URL_PATH.'?'.$path_prev?>" class="list_prevnext list_prev">PRE</a>
<?
}
?>
					<a href="<?=URL_PATH.'?'.$path_list?>" class="list_return">LIST</a>
<?
if($temp_next) {
?>
					<a href="<?=URL_PATH.'?'.$path_next?>" class="list_prevnext list_next">NEXT</a>
<?
}
?>
				</div>