(function() {
	
	var datepicker = window.datepicker;
	//	为datepicker添加一个buildUi方法
	datepicker.buildUi = function(year, month) {
		//	获取本月数据
		var monthData = datepicker.getMonthDate(year, month);
		var html = '<div class="ui-datepicker-header">' +
				'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
				'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
				'<span class="ui-datepicker-curr-month">' + monthData.year + '-' +  monthData.month +'</span>' +
			'</div>' +
			'<div class="ui-datepicker-body">' +
				'<table>' +
					'<thead> ' +
						'<tr>' +
							'<th>一</th>' +
							'<th>二</th>' +
							'<th>三</th>' +
							'<th>四</th>' +
							'<th>五</th>' +
							'<th>六</th>' +
							'<th>日</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>';
					
				for(var i=0; i<monthData.days.length; i++) {
					var date = monthData.days[i];
					//为每周第一天加上tr标签	i%7为0是第一天
					if (i%7 ===0) {
						html += '<tr>';
					}
					
					html += '<td>' + date.showDate + '</td>';
					
					//为每周最后一天加tr结束标签		i%7为6是最后一天
					if (i%7 === 6) {
						html += '</tr>';
					}
				}
		
				html +=	'</tbody>' +
				'</table>' +
			'</div>'
			
			return html;
	};
	
	datepicker.init = function (input) {
		var html = datepicker.buildUi();
//		document.body.innerHTML = html;
//		<div class="ui-datepicker-wrapper">
		var $warpper = document.createElement('div');
		$warpper.className = 'ui-datepicker-wrapper';
		$warpper.innerHTML = html;
		
		document.body.appendChild($warpper);
		
		var $input = document.querySelector(input);
		var isOpen = false;
		
		//为input添加事件
		$input.addEventListener('click', function() {
			//如果isOpen把日历的class拿掉 
			if (isOpen) {
				$warpper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			} else {
				$warpper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$warpper.style.top = top + height + 2 + 'px';
				$warpper.style.left = left + 'px';
				isOpen = true;
			}
		}, false)
	}
	
	
	
	
	
	
})();
