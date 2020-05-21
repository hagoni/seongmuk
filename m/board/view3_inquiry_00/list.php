<?
######################################################################################################################################################
//VIEW3 BOARD 1.0
######################################################################################################################################################
if(!defined('_VIEW3BOARD_'))exit;
######################################################################################################################################################
if(false) {
	$email_required = ' required';
} else {
	$email_required = '';
}
$view_email = '
	<div class="email_wrap">
		<input type="text" id="email_01" class="half_input01 half_inputs"'.$email_required.' data-input="email" onkeyup="view3_email_value(this);">
		<span class="email_ico">@</span>
		<input type="text" id="email_02" class="half_input02 half_inputs"'.$email_required.' data-input="email" onkeyup="view3_email_value(this);">
	</div>
	<select id="email_03" data-input="email" onchange="javascript:view3_email(this,this.options[this.selectedIndex].value);">
		<option value="">직접입력</option>
		<option value="naver.com">naver.com</option>
		<option value="gmail.com">gmail.com</option>
		<option value="nate.com">nate.com</option>
		<option value="yahoo.co.kr">yahoo.co.kr</option>
		<option value="hanmail.net">hanmail.net</option>
		<option value="daum.net">daum.net</option>
		<option value="dreamwiz.com">dreamwiz.com</option>
		<option value="lycos.co.kr">lycos.co.kr</option>
		<option value="empas.com">empas.com</option>
		<option value="korea.com">korea.com</option>
		<option value="paran.com">paran.com</option>
		<option value="freechal.com">freechal.com</option>
		<option value="hanmir.com">hanmir.com</option>
		<option value="hotmail.com">hotmail.com</option>
	</select>
';
?>

<!-- board wrapper start -->
<div id="boardWrap">
	<div class="inquiry_wrap">
		<form class="inquiry_form" method="post" action="<?=BOARD?>/index.php?<?=$path_action?>" enctype="multipart/form-data" accept-charset="<?=SET?>">
			<input type="hidden" name="drop" value="drop||privacy_agree||board||pw||skin||url||inquiry_action||x||y">
			<input type="hidden" name="board" value="<?=$board?>">
			<input type="hidden" name="sca" value="<?=$view3_sca?>">
			<input type="hidden" name="inquiry_action" value="ok">
			<input type="hidden" name="url" value="<?=URL?>">
			<input type="hidden" name="title_01" value="<?=$h2_title_sub?>">
			<input type="hidden" name="email" value="">
			<fieldset class="iqr_policy_wrap">
				<legend class="iqr_tit b_ff_h b_c_m">개인정보 수집 및 활용동의</legend>
				<div class="iqr_policy">
                    <ol>
                        <li class="b_fs_m b_ff_m b_lh_m b_c_l">
                        1. 개인정보의 수집 및 이용 목적<br>
                        가맹 관련 문의 확인 및 답변을 위한 연락통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.
                        </li>
                        <li class="b_fs_m b_ff_m b_lh_m b_c_l">
                        2. 처리하는 개인정보 항목<br>
                        - 필수항목 : 이름, 연락처 (접속 IP 정보, 쿠키, 서비스 이용 기록, 접속 로그)<br>
                        - 선택항목 : 이메일
                        </li>
                        <li class="b_fs_m b_ff_m b_lh_m b_c_l">
                        3. 개인정보의 처리 및 보유 기간<br>
                        ① 법령에 따른 개인정보 보유.이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용기간 내에서 개인정보를 처리, 보유합니다.<br>
                        ② 개인정보의 보유 기간은 5년입니다.
                        </li>
                    </ol>
				</div>
				<div class="iqr_check">
					<input type="checkbox" name="privacy_agree" id="inquiryPolicyCheck">
					<label for="inquiryPolicyCheck" class="b_ff_m b_c_l">위 개인정보 수집 및 활용에 동의합니다.</label>
				</div>
			</fieldset>
			<fieldset class="iqr_info">
				<legend class="iqr_tit rel b_ff_h b_c_m">상담자 정보<small class="iqr_dot b_ff_m b_c_l"><span>동그라미 표시</span>는 필수입력항목입니다.</small></legend>
				<div class="inquiry_fields">
					<ul>
						<?if($view3_sca == 'customer_01') {?>
						<li>
							<p class="field_title required"><label for="iqr_title_01">제목</label></p>
							<input type="text" name="title_01" id="iqr_title_01" required autocomplete="off">
						</li>
						<?}?>
						<li>
							<p class="field_title required"><label for="iqr_name">이름</label></p>
							<input type="text" name="name" id="iqr_name" required autocomplete="off">
						</li>
						<li>
							<p class="field_title required"><label for="iqr_hp">연락처</label></p>
							<input type="text" name="hp" id="iqr_hp" required autocomplete="off" onkeyup="hero_key(this,1);">
						</li>
						<li>
							<p class="field_title<?if($email_required){echo ' required';}?>"><label for="iqr_email_01">이메일</label></p>
							<?=$view_email?>
						</li>
						<?if($view3_sca == '1n1_01' || $view3_sca == 'jungbo_01' || $view3_sca == 'changup_01') {?>
						<li>
							<p class="field_title"><label for="iqr_special_03">창업희망지역</label></p>
							<input type="text" name="special_03" id="iqr_special_03">
						</li>
						<li>
							<p class="field_title"><label for="iqr_special_04">예상창업비용</label></p>
							<div class="input_comment">
								<input type="text" name="special_04" id="iqr_special_04">
								<span class="text">만원 (숫자만 입력)</span>
							</div>
						</li>
						<li>
							<p class="field_title">점포보유유무</p>
							<div class="input_radio">
								<input type="radio" name="special_05" id="iqr_special_05_01" value="무" checked>
								<label for="iqr_special_05_01">무</label>
							</div>
							<div class="input_radio">
								<input type="radio" name="special_05" id="iqr_special_05_02" value="유">
								<label for="iqr_special_05_02">유</label>
							</div>
						</li>
						<?} else if($view3_sca == 'customer_01') {?>
						<li>
							<p class="field_title">상담유형</p>
							<div class="input_radio">
								<input type="radio" name="special_03" id="special_03_01" value="칭찬" checked>
								<label for="special_03_01">칭찬</label>
							</div>
							<div class="input_radio">
								<input type="radio" name="special_03" id="special_03_02" value="불만">
								<label for="special_03_02">불만</label>
							</div>
							<div class="input_radio">
								<input type="radio" name="special_03" id="special_03_03" value="문의">
								<label for="special_03_03">문의</label>
							</div>
							<div class="input_radio">
								<input type="radio" name="special_03" id="special_03_04" value="제안">
								<label for="special_03_04">제안</label>
							</div>
						</li>
						<?}?>
						<li>
							<p class="field_title required"><label for="iqr_command_01">문의내용</label></p>
							<textarea name="command_01" id="iqr_command_01" required></textarea>
						</li>
					</ul>
				</div>
				<button type="submit" class="b_btn01 bindInquirySubmit" onclick="inquiry(this.form);">문의하기</button>
			</fieldset>
		</form>
    </div>
</div>
<!-- //board wrapper end -->