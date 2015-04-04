$(function() {
	/*
	 * 入力系の処理
	 */
	$('#submitBtn').on('click',function() {
		//全部のinputを静的表示(pタグ)に書き直す
		$('input,select').each( function() {
			var $this = $(this),
				val = $this.val();
			$this.next().text(val);
			$this.fadeOut('fast');
			$this.next().fadeIn('fast');
		});
		//作成ボタンを消して、確認のボタンを出す
		$('#submitBtn').hide();
		$('#isConfirms').fadeIn('fast');
		return false;
	});

	$('#submitOK').on('click',function() {
		var dataArr,dataArrP;
		$('#inputForms').find('label').each( function() {
			var $this = $(this),
				thisfor = $this.attr('for'),
				confText = $this.next().next().text(),
				dataArrP = 0;
				
			if ( confText.length > 0 ) dataArrP = thisfor + ': "' + confText + '",';
			if ( dataArrP ) dataArr ? dataArr = dataArr.concat(dataArrP) : dataArr = dataArrP;
		});
		dataArr = dataArr.slice(0,-1);
		//phpにpostする
		$.ajax({
			url: 'add.php',
			data: dataArr,
			success: function(data) {
				console.log('success!! data : ' + data);
			}
		});
		//動作キャンセル
		return false;
	});

	$('#reEdit').on('click',function() {
		//静的表示に入れたhtmlを全てinputのvalueに入れて再度編集可能状態へ書き直す
		$('input').each( function() {
			var $this = $(this),
				val = $this.next().val();
			$this.text(val);
			$this.fadeIn('fast');
			$this.next().fadeOut('fast');
		});
		$('select').each( function() {
			var $this = $(this),
				val = $this.next().val();
			$this.fadeIn('fast');
			$this.next().fadeOut('fast');
		});
		$('#isConfirms').hide();
		$('#submitBtn').fadeIn('fast');
		return false;
	});

	//ポップアップで表示するテキスト
	$('form').find('input,select').hover( function() {
		$('#'+ $(this).attr('id') +'Text').stop().fadeIn('fast');
	},function() {
		$('#'+ $(this).attr('id') +'Text').stop().fadeOut('fast');
	});
	$('form').find('label').hover( function() {
		$('#'+ $(this).attr('for') +'Text').stop().fadeIn('fast');
	},function() {
		$('#'+ $(this).attr('for') +'Text').stop().fadeOut('fast');
	});
});