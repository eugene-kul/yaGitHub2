document.addEventListener("DOMContentLoaded", function(event) {

	document.querySelector('.menu-icon').addEventListener('click', function(event) {
		this.classList.toggle('active');
		document.querySelector('.bottom-row_menu-list').classList.toggle('active');
		document.querySelector('.bottom-row_overflow').classList.toggle('active');
		document.querySelector('body').classList.toggle('lockMenu');
	});

	//overflow менюшки
	document.querySelector('.bottom-row_overflow').addEventListener('click', function(event) {
		document.querySelector('.bottom-row_menu-list').classList.remove('active');
		document.querySelector('.bottom-row_overflow').classList.remove('active');
		document.querySelector('.menu-icon').classList.remove('active');
		document.querySelector('body').classList.remove('lockMenu');
	});

	let tableBlock = document.querySelectorAll('.table-block_row');
	for (let item of tableBlock) {
		let check = item.querySelector('.table-block_row-column--column3').textContent;
		if (check.replace(/\n\t+/g, '') == 0) {
			item.classList.add('hide');
		}
	}

	//кнопки "+" "-"
	let plus = document.querySelectorAll('.plus');
	let minus = document.querySelectorAll('.minus');
	if (plus != null) {
		for (let item of plus) {item.addEventListener('click', function(event) {plusNumber(this)})}}
	if (minus != null) {
		for (let item of minus) {item.addEventListener('click', function(event) {minusNumber(this)})}}
	function plusNumber(element) {
		if (element.nextElementSibling.value >= 999) {element.nextElementSibling.value = 999}
		if (element.nextElementSibling.value < 1) {element.nextElementSibling.value = 0}
		if (element.nextElementSibling.value >= 999) {return}
		element.nextElementSibling.value = (Number(element.nextElementSibling.value)+1);
	}
	function minusNumber(element) {
		if (element.previousElementSibling.value < 1) {element.previousElementSibling.value = 1}
		if (element.previousElementSibling.value > 999) {element.previousElementSibling.value = 1000}
		if (element.previousElementSibling.value == 1) {return}
		element.previousElementSibling.value = (Number(element.previousElementSibling.value)-1);
	}

	//подсвечивание активных пунктов в шапке меню
	let dataPage = document.querySelector('.wrapper').getAttribute('data-page');
	if (dataPage != 0 && dataPage != null) {
		let pageLink = document.querySelector('.bottom-row_menu-links[data-page="' + dataPage + '"]');
		pageLink.classList.add('active');
		if (dataPage == 1) {
			pageLink.addEventListener('click', function(event) {event.preventDefault()});
		}
	}

	//подсвечивание активных пунктов в сайдбаре
	let dataSidePage = document.querySelector('.wrapper').getAttribute('data-sidePAge');
	if (dataPage === null && dataSidePage != null) {
		let link = document.querySelector('.sidebar_item-link[data-SidePage="' + dataSidePage + '"]');
		link.classList.add('active');
		link.parentElement.parentElement.style.height = link.parentElement.parentElement.scrollHeight + 'px';
		link.parentElement.parentElement.previousElementSibling.classList.add('active');
		link.addEventListener('click', function(event) {event.preventDefault();});
	} else if (dataPage != null && dataSidePage === null) {
		let link = document.querySelector('.sidebar_item-link[data-SidePage="1"]');
		link.parentElement.parentElement.style.height = link.parentElement.parentElement.scrollHeight + 'px';
		link.parentElement.parentElement.previousElementSibling.classList.add('active');
	}

	//скролл до элемента через querySelector по уникальному class/id/teg или целого элемента. x - смещение скролла
	function scrollTo(element,x) {
		x = x || 0;
		let target = typeof element === "string" ? document.querySelector(element) : element;
		let position = target.getBoundingClientRect().top + x;
		window.scrollBy({
			top: position,
			behavior: 'smooth'
		});
	}

	//инициализация кнопки "наверх" и мобильной нижней строчки
	addEventListener('scroll', scroll);
	let x = 0;
	let timeoutRow;
	function scroll(){
		let scrollTop = window.pageYOffset;
		if(x > scrollTop) {
			document.querySelector('.buttonUp').classList.add('active');
			document.querySelector('.bottom-btn-row').classList.add('active');
		}
		if(x < scrollTop || scrollTop == 0) {
			document.querySelector('.buttonUp').classList.remove('active');
			clearTimeout(timeoutRow);
			document.querySelector('.bottom-btn-row').classList.remove('active');
			timeoutRow = setTimeout(initRow,500);
		}
		x = scrollTop;
	}
	function initRow() {document.querySelector('.bottom-btn-row').classList.add('active');}

	//кнопка наверх
	document.querySelector('.buttonUp').addEventListener('click', function(event) {scrollTo('body')});

	//спойлер(акордион) (.spMain, spSub (height = 0), .oneBlock (родитель родлителя))
	let spMain = document.querySelectorAll('.spMain'),
	spSub = document.querySelectorAll('.spSub');
	for (let item of spMain) {
		item.addEventListener('click', function(event) {
			let sp = this.nextElementSibling;
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				if (this.parentElement.classList.contains('bottom-row_menu-links')) {sp.classList.remove('active');}
					else {sp.style.height = '0';}
			}
			else {
				if (this.parentElement.parentElement.classList.contains('oneBlock')) {hideAll()}
				this.classList.add('active');
				if (this.parentElement.classList.contains('bottom-row_menu-links')) {sp.classList.add('active');}
				else {sp.style.height = sp.scrollHeight + 'px';}
			}
			function hideAll() {
				for (let item of spMain) {item.classList.remove('active');}
				for (let itemSub of spSub) {if (itemSub.parentElement.classList.contains('bottom-row_menu-links')) {continue} itemSub.style.height = '0';}
			}
		});
	}

	//скролл до элемента
	let pagePriceLinks = document.querySelectorAll('.scroll-to');
	if (pagePriceLinks != null) {
		for (let link of pagePriceLinks) {
			link.addEventListener('click', function(event) {
				scrollTo('.'+this.getAttribute('data-target'),-50);
			});
		}
	}

	//маска для ввода телефона
	let inputList = document.querySelectorAll(".tel");
	for (let input of inputList) {
		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
	}
	function mask(event) {
		let matrix = "+7(___)___-__-__",
		val = this.value.replace(/\D/g, ""),
		def = matrix.replace(/\D/g, ""),
		i = 0;
		if (def.length >= val.length) val = def;
		this.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
		if (val.length === 11) {
			for (l=0;l<10;l++) {if (val === '79'+l+l+l+l+l+l+l+l+l) {this.value = "+7"}}
		}
		if (this.value != '+7(9' && i === 2) {this.value = "+7"}
		if (event.type == "blur") {
			if (this.value.length == 2) this.value = ""
		} else {
			this.focus();
			if (this.setSelectionRange) this.setSelectionRange(this.value.length, this.value.length);
			else if (this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd("character", this.value.length);
				range.moveStart("character", this.value.length);
				range.select()
			}
		}
	};

	//убрать значение селекта при загрузке
	let selectForms = document.querySelectorAll('select');
	if (selectForms != null) {
		for (let select of selectForms) {
			if (select.classList.contains('val')) {break}
			select.value = "";
		}
	}

	//placeholder
	let placeholders = document.querySelectorAll(".placeholder");
	if (placeholders != null) {
		for (let pls of placeholders) {
			initPls(pls);
		}
	}
	function initPls(el) {
		let input = el.nextElementSibling;
			input.addEventListener('focus', function(event) {
				el.classList.add('active');
				el.parentElement.classList.add('active');
			});
			el.nextElementSibling.addEventListener('blur', function(event) {
				if (input.value === "Не выбрано") {input.value = "";}
				if (input.getAttribute('type') == 'tel' && input.value == "+7") {input.value = "";}
				if (input.value != "") {return}
				input.value = "";
				el.classList.remove('active');
				el.parentElement.classList.remove('active');
			});
	}

	//modal
	let modalButtons = document.querySelectorAll('.js-open-modal');
	let pageIndex = "../";
	if (dataPage == 1) {pageIndex = ""};
	if (modalButtons != null) {
		for (let item of modalButtons) {
			item.addEventListener('click', function(event) {
				event.preventDefault();
				document.querySelector('body').classList.add('lock');
				let overlay = document.querySelector('#overlay-modal');
				let modalId = this.getAttribute('data-modal');
				let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
				if (modalId == 1) {
					modalElem.innerHTML = `
						<div title="Закрыть" class="btn-close"><svg height="20" viewBox="0 0 329.26933 329" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></div>
						<div class="modalConsult_image"><img src="${pageIndex}img/content/form1.jpg" alt="Получите консультацию специалиста"></div>
						<div class="modalConsult_form">
							<div class="modalConsult_text"><span>Оставить заявку</span> Специалист свяжется с Вами</div>
							<form action="#!" method="POST" onsubmit="yaCounter66443812.reachGoal('modal1');" id="modal1" name="Получите консультацию специалиста" class="get-price_form v3">
								<span class="get-price_input-body input-name v3">
									<span class="placeholder">Ваше имя</span>
									<input autocomplete="off" type="text" title="Ваше имя" name="Имя">
								</span>
								<span class="get-price_input-body input-phone v3">
									<span class="placeholder">Номер телефона</span>
									<input autocomplete="off" type="tel" required="" title="Номер телефона" pattern="[\+]{1}[7]{1}[\(]{1}[9]{1}[0-9]{2}[\)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}" name="Телефон" placeholder="+7 (XXX) XXX XX-XX" class="tel">
								</span>
								<button type="submit" class="modalConsult_btn btn btn-type1">Отправить заявку</button>
								<span class="personal-data">Нажимая на кнопку, я даю свое согласие на <a href="{{common.domain}}/agreement" target="_blank">обработку персональных данных</a></span>
							</form>
							<div class="w-form-done">
								<div class="div-block-9">
									<div class="text-block-22">Спасибо!</div>
									<div class="text-block-23">Ваша заявка принята</div>
									<img src="${pageIndex}img/Форма-отправлена.svg" alt="Форма-отправлена" class="image-99">
								</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Что-то пошло не так, Ошибка отправки формы. Пожалуйста, перезагрузите страницу.</div>
							</div>
						</div>
					`;
				}
				if (modalId == 2) {
					modalElem.innerHTML = `<div title="Закрыть" class="btn-close"><svg height="20" viewBox="0 0 329.26933 329" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></div>
						<div class="modalQwiz_title"><span><svg width="7" height="34" viewBox="0 0 7 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.505 0.599999V13.47C5.505 14.82 5.445 16.1475 5.325 17.4525C5.205 18.7425 5.0475 20.1375 4.8525 21.6375H1.59C1.38 20.1375 1.215 18.7425 1.095 17.4525C0.99 16.1475 0.9375 14.82 0.9375 13.47V0.599999H5.505ZM0.0150001 30.21C0.0150001 29.775 0.0900001 29.37 0.24 28.995C0.405 28.605 0.63 28.2675 0.915 27.9825C1.2 27.6975 1.53 27.4725 1.905 27.3075C2.28 27.1425 2.6925 27.06 3.1425 27.06C3.5775 27.06 3.9825 27.1425 4.3575 27.3075C4.7475 27.4725 5.0775 27.6975 5.3475 27.9825C5.6325 28.2675 5.8575 28.605 6.0225 28.995C6.1875 29.37 6.27 29.775 6.27 30.21C6.27 30.66 6.1875 31.0725 6.0225 31.4475C5.8575 31.8225 5.6325 32.1525 5.3475 32.4375C5.0775 32.7225 4.7475 32.94 4.3575 33.09C3.9825 33.255 3.5775 33.3375 3.1425 33.3375C2.6925 33.3375 2.28 33.255 1.905 33.09C1.53 32.94 1.2 32.7225 0.915 32.4375C0.63 32.1525 0.405 31.8225 0.24 31.4475C0.0900001 31.0725 0.0150001 30.66 0.0150001 30.21Z" fill="#FF3C11"/></svg>Индивидуальное предложение</span> <mark>всего за 5 шагов</mark></div>
						<div class="modalQwiz_body">
							<form action="#!" id="qwiz-form" onsubmit="yaCounter66443812.reachGoal('modalCalc');" method="POST" name="Калькулятор">
								<div class="modalQwiz_step1 modalQwiz_steps active">
									<p class="modalQwiz_steps-title"><mark>Шаг №1.</mark> Для какого строения нужен фундамент?</p>
									<div class="modalQwiz_radio-body">
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" checked="" value="Дом" id="modal-radio-step1-1" name="Тип постройки" class="input">
											<label for="modal-radio-step1-1">
												<img src="${pageIndex}img/content/f81.jpg" alt="Дом">
												<span>Дом</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Баня" id="modal-radio-step1-2" name="Тип постройки" class="input">
											<label for="modal-radio-step1-2">
												<img src="${pageIndex}img/content/f82.jpg" alt="Баня">
												<span>Баня</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Забор" id="modal-radio-step1-3" name="Тип постройки" class="input">
											<label for="modal-radio-step1-3">
												<img src="${pageIndex}img/content/f83.jpg" alt="Забор">
												<span>Забор</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Ворота" id="modal-radio-step1-4" name="Тип постройки" class="input">
											<label for="modal-radio-step1-4">
												<img src="${pageIndex}img/content/f84.jpg" alt="Ворота">
												<span>Ворота</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Терраса" id="modal-radio-step1-5" name="Тип постройки" class="input">
											<label for="modal-radio-step1-5">
												<img src="${pageIndex}img/content/f85.jpg" alt="Терраса">
												<span>Терраса</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Другое" id="modal-radio-step1-7" name="Тип постройки" class="input">
											<label for="modal-radio-step1-7">
												<img src="${pageIndex}img/content/f86.jpg" alt="Другое">
												<span>Другое</span>
											</label>
										</span>
									</div>
								</div>
								<div class="modalQwiz_step2 modalQwiz_steps">
									<p class="modalQwiz_steps-title"><mark>Шаг №2.</mark> Выберете диметр сваи</p>
									<div class="modalQwiz_radio-body v3">
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" checked="" value="Диаметр 57 мм" id="modal-radio-step2-1" name="Диаметр свай" class="input">
											<label for="modal-radio-step2-1">
												<img src="${pageIndex}img/piles/svaya2.jpg" alt="Диаметр 57 мм">
												<span>Диаметр 57 мм</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Диаметр 76 мм" id="modal-radio-step2-2" name="Диаметр свай" class="input">
											<label for="modal-radio-step2-2">
												<img src="${pageIndex}img/piles/svaya2.jpg" alt="Диаметр 76 мм">
												<span>Диаметр 76 мм</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Диаметр 89 мм" id="modal-radio-step2-3" name="Диаметр свай" class="input">
											<label for="modal-radio-step2-3">
												<img src="${pageIndex}img/piles/svaya2.jpg" alt="Диаметр 89 мм">
												<span>Диаметр 89 мм</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Диаметр 108 мм" id="modal-radio-step2-4" name="Диаметр свай" class="input">
											<label for="modal-radio-step2-4">
												<img src="${pageIndex}img/piles/svaya2.jpg" alt="Диаметр 108 мм">
												<span>Диаметр 108 мм</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Другой диметр сваи" id="modal-radio-step2-5" name="Диаметр свай" class="input">
											<label for="modal-radio-step2-5">
												<img src="${pageIndex}img/piles/svaya2.jpg" alt="Другой диметр">
												<span>Другой диметр сваи</span>
											</label>
										</span>
									</div>
								</div>
								<div class="modalQwiz_step3 modalQwiz_steps">
									<div class="modalQwiz_steps-body">
										<span class="modalQwiz_steps-column">
											<span class="text"><mark>Шаг №3.</mark> Укажите общую площадь постройки</span>
											<span class="modalQwiz_input-area-block">
												<span class="modalQwiz_input-area">
													<span class="label noselect">м<span>2</span></span>
													<span class="placeholder">Площадь</span>
													<input tabindex="-1" autocomplete="off" type="number" name="Площадь">
												</span>
											</span>
										</span>
										<span class="modalQwiz_steps-column">
											<span class="text">Или укажите длину и/или ширину постройки</span>
											<span class="modalQwiz_input-area-block">
												<span class="modalQwiz_input-area">
													<span class="label noselect">м</span>
													<span class="placeholder">Длина</span>
													<input tabindex="-1" autocomplete="off" type="number" name="Длина">
												</span>
												<span class="modalQwiz_input-area">
													<span class="label noselect">м</span>
													<span class="placeholder">Ширина</span>
													<input tabindex="-1" autocomplete="off" type="number" name="Ширина">
												</span>
											</span>
										</span>
									</div>
								</div>
								<div class="modalQwiz_step4 modalQwiz_steps">
									<p class="modalQwiz_steps-title"><mark>Шаг №4.</mark> Выберете тип грунта</p>
									<div class="modalQwiz_radio-body v2">
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" checked="" value="Не знаю" id="modal-radio-step4-7" name="Тип грунта" class="input">
											<label for="modal-radio-step4-7">
												<span>Не знаю</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Суглинок" id="modal-radio-step4-1" name="Тип грунта" class="input">
											<label for="modal-radio-step4-1">
												<span>Суглинок</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Глина плотная" id="modal-radio-step4-2" name="Тип грунта" class="input">
											<label for="modal-radio-step4-2">
												<span>Глина плотная</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Торфяник" id="modal-radio-step4-3" name="Тип грунта" class="input">
											<label for="modal-radio-step4-3">
												<span>Торфяник</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Илистый" id="modal-radio-step4-4" name="Тип грунта" class="input">
											<label for="modal-radio-step4-4">
												<span>Илистый</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Песок" id="modal-radio-step4-5" name="Тип грунта" class="input">
											<label for="modal-radio-step4-5">
												<span>Песок</span>
											</label>
										</span>
										<span class="modalQwiz_radio">
											<input tabindex="-1" type="radio" value="Каменистый" id="modal-radio-step4-6" name="Тип грунта" class="input">
											<label for="modal-radio-step4-6">
												<span>Каменистый</span>
											</label>
										</span>
									</div>
								</div>
								<div class="modalQwiz_step5 modalQwiz_steps">
									<div class="modalQwiz_steps-body">
										<div class="modalQwiz_steps-column">
											<div class="modalQwiz_step5-image">
												<img src="${pageIndex}img/41.jpg" alt="Купить винтовую сваю по дешевой цене">
											</div>
											<div>
												<div class="modalQwiz_step5-title">Хотите купить дешевле<span>?</span></div>
												<div class="modalQwiz_step5-arrow"><svg width="299" height="69" viewBox="0 0 299 69" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M144.724 28.1764C144.866 28.1848 174.152 28.2016 174.303 28.2016C203.958 28.2016 233.612 28.2016 263.259 28.2016C263.82 28.2016 263.811 28.2352 263.535 27.7394C262.12 25.252 260.705 22.773 259.29 20.2856C258.101 18.2016 256.913 16.1092 255.724 14.0251C255.648 13.8991 255.565 13.7814 255.531 13.6386C255.548 13.6218 255.556 13.6134 255.565 13.605C255.573 13.5966 255.59 13.5966 255.598 13.605C268.743 20.5462 281.87 27.4789 295.007 34.4201C295.04 34.4369 295.057 34.4789 295.099 34.5125C295.057 34.5546 295.023 34.5966 294.981 34.6218C281.854 41.563 268.718 48.5041 255.581 55.4453C255.498 55.3193 255.59 55.252 255.632 55.1764C255.975 54.5714 256.318 53.9579 256.661 53.3529C257.314 52.21 257.959 51.0672 258.612 49.9243C260.169 47.1932 261.727 44.4705 263.276 41.7394C263.418 41.4789 263.56 41.2268 263.703 40.9663C263.736 40.8991 263.694 40.8319 263.619 40.8319C263.468 40.8235 263.326 40.8235 263.175 40.8235C250.533 40.8235 237.891 40.8235 225.249 40.8235C208.295 40.8235 191.332 40.8235 174.378 40.8235C174.203 40.8235 174.035 40.8403 173.859 40.8487L144.724 28.1764Z" fill="#FF0101" /> <path d="M26.8755 40.7812L194.64 40.7812L194.64 28.2518L26.8755 28.2518L26.8755 40.7812Z" fill="#FF0101" /></svg></div>
												<div class="modalQwiz_step5-text">Оставьте свои контактные данные, и мы перезвоним Вам с рассчетом стоимости Вашего фундамента!</div>
											</div>
										</div>
										<div class="modalQwiz_steps-column">
											<span class="modalQwiz_input-body modalQwiz_input-name">
												<span class="placeholder">Ваше имя</span>
												<input tabindex="-1" autocomplete="off" type="text" title="Ваше имя" name="Имя" class="qwizName">
											</span>
											<span class="modalQwiz_input-body modalQwiz_input-phone">
												<span class="placeholder">Номер телефона</span>
												<input tabindex="-1" autocomplete="off" type="tel" required="" title="Номер телефона" pattern="[\+]{1}[7]{1}[\(]{1}[9]{1}[0-9]{2}[\)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}" name="Телефон" placeholder="+7 (XXX) XXX XX-XX" class="tel">
											</span>
											<button tabindex="-1" type="submit" class="modalQwiz_btn btn btn-type1">Получить предложение</button>
											<span class="personal-data">Нажимая на кнопку, я даю свое согласие на <a href="{{common.domain}}/agreement" tabindex="-1" target="_blank">обработку персональных данных</a></span>
										</div>
									</div>
								</div>
								<button tabindex="3" type="submit" class="btn-next-form">Далее<span class="arrow-svg"><svg viewBox="0 -22 512 511" xmlns="http://www.w3.org/2000/svg"><path d="m512 233.820312-212.777344-233.320312v139.203125h-45.238281c-140.273437 0-253.984375 113.710937-253.984375 253.984375v73.769531l20.09375-22.019531c68.316406-74.851562 164.980469-117.5 266.324219-117.5h12.804687v139.203125zm0 0"/></svg></span></button>
							</form>
							<div class="w-form-done">
								<div class="div-block-9">
									<div class="text-block-22">Спасибо!</div>
									<div class="text-block-23">Ваша заявка принята</div>
									<img src="${pageIndex}img/Форма-отправлена.svg" alt="Форма-отправлена" class="image-99">
								</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Что-то пошло не так. Ошибка отправки формы. Пожалуйста, перезагрузите страницу.</div>
							</div>
						</div>
						<div class="modalQwiz_bottom-row">
							<div class="modalQwiz_pagination">Шаг <span class="value">1</span>/5</div>
							<div class="modalQwiz_btn-block noselect">
								<span class="btn-prev"><span class="arrow-svg">
								<svg viewBox="0 -22 512 511" xmlns="http://www.w3.org/2000/svg"><path d="m512 233.820312-212.777344-233.320312v139.203125h-45.238281c-140.273437 0-253.984375 113.710937-253.984375 253.984375v73.769531l20.09375-22.019531c68.316406-74.851562 164.980469-117.5 266.324219-117.5h12.804687v139.203125zm0 0"/></svg></span></span>
								<span class="btn-next active">Далее<span class="arrow-svg"><svg viewBox="0 -22 512 511" xmlns="http://www.w3.org/2000/svg"><path d="m512 233.820312-212.777344-233.320312v139.203125h-45.238281c-140.273437 0-253.984375 113.710937-253.984375 253.984375v73.769531l20.09375-22.019531c68.316406-74.851562 164.980469-117.5 266.324219-117.5h12.804687v139.203125zm0 0"/></svg></span></span>
							</div>
						</div>`;
					//qwiz
					let nextStep = document.querySelector('.modalQwiz_bottom-row .btn-next');
					let nextStepForm = document.querySelector('.modalQwiz .btn-next-form');
					let prevStep = document.querySelector('.modalQwiz_bottom-row .btn-prev');
					let steps = document.querySelectorAll('.modalQwiz_steps');
					let pafeNumb = document.querySelector('.modalQwiz_pagination .value');
					let radioBtns = document.querySelectorAll('.modalQwiz_radio input');
					let qwizForm = document.querySelector('.modalQwiz_body form');
					let n = 1;
					qwizForm.addEventListener('keydown', function(event) {
						if(event.keyCode == 13) {
							if (n <= 4) {
								event.preventDefault();
								nextPage();
							}
						}
					});
					if (radioBtns != null) {
						for (let radioBtn of radioBtns) {
							radioBtn.addEventListener('click', function(event) {nextPage()});
						}
					}
					nextStep.addEventListener('click', function(event) {nextPage()});
					prevStep.addEventListener('click', function(event) {prefPage()});
					function nextPage() {
						if (n > 4) {return}
						if (n === 4) {
							nextStep.classList.remove('active');
							nextStepForm.classList.add('active');
							qwizForm.querySelector('.tel').setAttribute('tabindex', 3);
							qwizForm.querySelector('.qwizName').setAttribute('tabindex', 4);
							qwizForm.querySelector('button').setAttribute('tabindex', 5);
						}
						if (n === 1) {prevStep.classList.add('active');}
						n++;
						let prevStepPage = document.querySelector('.modalQwiz_step'+(n-1));
						prevStepPage.classList.remove('next');
						prevStepPage.classList.add('prev');
						stepPage();
					}
					function prefPage() {
						if (n <= 1) {return}
						if (n === 5) {
							nextStep.classList.add('active');
							nextStepForm.classList.remove('active');
							qwizForm.querySelector('.tel').setAttribute('tabindex', -1);
							qwizForm.querySelector('.qwizName').setAttribute('tabindex', -1);
							qwizForm.querySelector('button').setAttribute('tabindex', -1);
						}
						if (n === 2) {prevStep.classList.remove('active');}
						n--;
						let nextStepPage = document.querySelector('.modalQwiz_step'+(n+1));
						nextStepPage.classList.remove('prev');
						nextStepPage.classList.add('next');
						stepPage();
					}
					function stepPage() {
						pafeNumb.textContent = n;
						let stepPage = document.querySelector('.modalQwiz_step'+n);
						for (let step of steps) {step.classList.remove('active');}
						stepPage.classList.remove('prev');
						stepPage.classList.remove('next');
						stepPage.classList.add('active');
					}
				}
				if (modalId == 5) {
					modalElem.innerHTML = `<div title="Закрыть" class="btn-close"><svg height="20" viewBox="0 0 329.26933 329" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></div>
						<div class="modalConsult_image"><img src="${pageIndex}img/form/01.jpg" alt="Купить винтовые сваи"></div>
						<div class="modalConsult_form">
							<div class="modalConsult_text"><span>Купить оголовок для винтовых свай</span></div>
							<form action="#!" method="POST" onsubmit="yaCounter66443812.reachGoal('modal5');" id="modal5" name="Купить оголовок для винтовых свай" class="get-price_form v3">
								<span class="get-price_input-body input-number v2 active fbf">
									<span class="placeholder active">Количество</span>
									<span class="plus noselect"><svg height="20" viewBox="0 0 469.33333 469.33333" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0"/></svg></span>
									<input autocomplete="off" type="number" min="1" max="999" value="1" name="Количество оголовков" class="get-price_quantity input-quantity">
									<span class="minus noselect"><svg height="20" viewBox="0 -192 469.33333 469" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"/></svg></span>
								</span>
								<span class="get-price_input-body input-select active fba">
									<span class="placeholder active">Размер оголовка</span>
									<select name="Размер оголовка" class="val">
										<option selected="">200x200 мм</option>
										<option>250x250 мм</option>
										<option>300x300 мм</option>
										<option>Другой размер</option>
									</select>
								</span>
								<span class="get-price_input-body input-name v3">
									<span class="placeholder">Ваше имя</span>
									<input autocomplete="off" type="text" title="Ваше имя" name="Имя">
								</span>
								<span class="get-price_input-body input-phone v3">
									<span class="placeholder">Номер телефона</span>
									<input autocomplete="off" type="tel" required="" title="Номер телефона" pattern="[\+]{1}[7]{1}[\(]{1}[9]{1}[0-9]{2}[\)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}" name="Телефон" placeholder="+7 (XXX) XXX XX-XX" class="tel">
								</span>
								<button type="submit" class="modalConsult_btn btn btn-type1">Оставить заявку</button>
								<span class="personal-data">Нажимая на кнопку, я даю свое согласие на <a href="{{common.domain}}/agreement" target="_blank">обработку персональных данных</a></span>
							</form>
							<div class="w-form-done">
								<div class="div-block-9">
									<div class="text-block-22">Спасибо!</div>
									<div class="text-block-23">Ваша заявка принята</div>
									<img src="${pageIndex}img/Форма-отправлена.svg" alt="Форма-отправлена" class="image-99">
								</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Что-то пошло не так. Ошибка отправки формы. Пожалуйста, перезагрузите страницу.</div>
							</div>
						</div>`;
				}
				if (modalId == 6) {
					modalElem.innerHTML = `<div title="Закрыть" class="btn-close"><svg height="20" viewBox="0 0 329.26933 329" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></div>
						<div class="modalConsult_image"><img src="${pageIndex}img/form/01.jpg" alt="Купить винтовые сваи"></div>
						<div class="modalConsult_form">
							<div class="modalConsult_text"><span>Купить винтовые сваи</span> &Oslash; <span class="text">57 мм.</span></div>
							<form action="#!" method="POST" onsubmit="yaCounter66443812.reachGoal('modal6');" id="modal6" name="Купить винтовые сваи" class="get-price_form v3">
								<span class="get-price_input-body input-number v2 active fbf">
									<span class="placeholder active">Количество свай</span>
									<span class="plus noselect"><svg height="20" viewBox="0 0 469.33333 469.33333" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0"/></svg></span>
									<input autocomplete="off" type="number" min="1" max="999" value="1" name="Количество свай" class="get-price_quantity input-quantity">
									<span class="minus noselect"><svg height="20" viewBox="0 -192 469.33333 469" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"/></svg></span>
								</span>
								<span class="get-price_input-body input-select active fba">
									<span class="placeholder active">Длина ствола</span>
									<select name="Длина ствола" class="length val">
										<option>Не выбрано</option>
										<option>500 мм</option>
										<option>1000 мм</option>
										<option>1500 мм</option>
										<option>2000 мм</option>
										<option>2500 мм</option>
										<option>3000 мм</option>
										<option>3500 мм</option>
										<option>4000 мм</option>
										<option>Другая длина</option>
									</select>
								</span>
								<span class="get-price_input-body input-name v3">
									<span class="placeholder">Ваше имя</span>
									<input autocomplete="off" type="text" title="Ваше имя" name="Имя">
								</span>
								<span class="get-price_input-body input-phone v3">
									<span class="placeholder">Номер телефона</span>
									<input autocomplete="off" type="tel" required="" title="Номер телефона" pattern="[\+]{1}[7]{1}[\(]{1}[9]{1}[0-9]{2}[\)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}" name="Телефон" placeholder="+7 (XXX) XXX XX-XX" class="tel">
								</span>
								<button type="submit" class="modalConsult_btn btn btn-type1">Оставить заявку</button>
								<span class="personal-data">Нажимая на кнопку, я даю свое согласие на <a href="{{common.domain}}/agreement" target="_blank">обработку персональных данных</a></span>
							</form>
							<div class="w-form-done">
								<div class="div-block-9">
									<div class="text-block-22">Спасибо!</div>
									<div class="text-block-23">Ваша заявка принята</div>
									<img src="${pageIndex}img/Форма-отправлена.svg" alt="Форма-отправлена" class="image-99">
								</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Что-то пошло не так. Ошибка отправки формы. Пожалуйста, перезагрузите страницу.</div>
							</div>
						</div>`;
				}
				if (modalId == 7) {
					modalElem.innerHTML = `<div title="Закрыть" class="btn-close"><svg height="20" viewBox="0 0 329.26933 329" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg></div>
						<picture class="modalConsult_image">
							<source srcset="${pageIndex}img/form/webp/@2x/form1.webp 2x, ${pageIndex}img/form/webp/form1.webp 1x" type="image/webp">
							<img src="${pageIndex}img/form/jpg/form1.jpg" srcset="${pageIndex}img/form/jpg/@2x/form1.jpg 2x" width="359" height="480" alt="Сваи для домов и коттеджей">
						</picture>
						<div class="modalConsult_form">
							<div class="modalConsult_text">Оставьте заявку на <span>вызов замерщика</span></div>
							<form action="#!" method="POST" onsubmit="yaCounter66443812.reachGoal('modal7');" id="modal7" name="Вызов замерщика" class="get-price_form v3">
								<span class="get-price_input-body input-name v3">
									<span class="placeholder">Ваше имя</span>
									<input autocomplete="off" type="text" title="Ваше имя" name="Имя">
								</span>
								<span class="get-price_input-body input-phone v3">
									<span class="placeholder">Номер телефона</span>
									<input autocomplete="off" type="tel" required="" title="Номер телефона" pattern="[\+]{1}[7]{1}[\(]{1}[9]{1}[0-9]{2}[\)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}" name="Телефон" placeholder="+7 (XXX) XXX XX-XX" class="tel">
								</span>
								<button type="submit" class="modalConsult_btn btn btn-type1">Оставить заявку</button>
								<span class="personal-data">Нажимая на кнопку, я даю свое согласие на <a href="{{common.domain}}/agreement" target="_blank">обработку персональных данных</a></span>
							</form>
							<div class="w-form-done">
								<div class="div-block-9">
									<div class="text-block-22">Спасибо!</div>
									<div class="text-block-23">Ваша заявка принята</div>
									<img src="${pageIndex}img/Форма-отправлена.svg" alt="Форма-отправлена" class="image-99">
								</div>
							</div>
							<div class="w-form-fail">
								<div>Oops! Что-то пошло не так. Ошибка отправки формы. Пожалуйста, перезагрузите страницу.</div>
							</div>
						</div>`;
				}

				//plus minus
				let thisPlus = modalElem.querySelector('.plus');
				let thisMinus = modalElem.querySelector('.minus');
				if (thisPlus != null) {
					thisPlus.addEventListener('click', function(event) {plusNumber(this)});
				}
				if (thisMinus != null) {
					thisMinus.addEventListener('click', function(event) {minusNumber(this)});
				}
				//placeholder
				let thisPlaceholders = modalElem.querySelectorAll(".placeholder");
				for (let pls of thisPlaceholders) {initPls(pls)};

				//tel
				let thisTel = modalElem.querySelector(".tel");
				thisTel.addEventListener("input", mask, false);
				thisTel.addEventListener("focus", mask, false);
				thisTel.addEventListener("blur", mask, false);
				
				//поиск форм
				refreshFormScript();

				if (item.classList.contains('js-length')) {
					let lg = item.getAttribute('data-length');
					let tx = item.getAttribute('data-text');
					let sel = modalElem.querySelector('select.length');
					for (let opt of sel) {
						opt.removeAttribute('selected');
					}
					sel[lg].setAttribute('selected', '');
					modalElem.querySelector('.text').textContent = tx;
				}
				modalElem.classList.add('active');
				overlay.classList.add('active');
				if(modalElem.querySelector('.btn-close') != null) {
					modalElem.querySelector('.btn-close').addEventListener('click', function(event) {
						modalElem.classList.remove('active');
						overlay.classList.remove('active');
						document.querySelector('body').classList.remove('lock');
						modalElem.innerHTML = '';
						refreshFormScript();
					});
				}
				overlay.addEventListener('click', function(event) {
					modalElem.classList.remove('active');
					this.classList.remove('active');
					document.querySelector('body').classList.remove('lock');
					modalElem.innerHTML = '';
					refreshFormScript();
				});
			});
		}
	}

	//qwiz(calculator)
	let calcNextStep = document.querySelector('.calculator_btn-next');
	let calcNextStepForm = document.querySelector('.calculator_btn-next-form');
	let calcPrevStep = document.querySelector('.calculator_btn-prev');
	let calcSteps = document.querySelectorAll('.calculator_steps');
	let calcLine = document.querySelector('.calculator_line');
	let calcPagination = document.querySelector('.calculator_pagination .value');
	let m = 1;
	let calcForm = document.querySelector('.calculator_form');
	if (calcForm != null) {
		calcForm.addEventListener('keydown', function(event) {
			if(event.keyCode == 13) {if (m <= 5) {event.preventDefault();calcNextPage()}}
		});
		let calcRadioBtns = document.querySelectorAll('.calculator_radio input');
		if (calcRadioBtns != null) {
			for (let radioBtn of calcRadioBtns) {
				radioBtn.addEventListener('click', function(event) {
					calcNextPage();
				});
			}
		}
		calcNextStep.addEventListener('click', function(event) {calcNextPage()});
		calcPrevStep.addEventListener('click', function(event) {calcPrevPage()});
	}
	function calcNextPage() {
		if (m > 5) {return}
		if (m === 5) {
			calcNextStep.classList.remove('active');
			calcNextStepForm.classList.add('active');
		}
		if (m === 1) {calcPrevStep.classList.add('active');}
		calcLine.classList.remove('s'+(m));
		m++;
		calcLine.classList.add('s'+m);
		let calcPrevStepPage = document.querySelector('.calculator_step'+(m-1));
		calcPrevStepPage.classList.remove('next');
		calcPrevStepPage.classList.add('prev');
		cStepPage();
	}
	function calcPrevPage() {
		if (m <= 1) {return}
		if (m === 6) {
			calcNextStep.classList.add('active');
			calcNextStepForm.classList.remove('active');
		}
		if (m === 2) {calcPrevStep.classList.remove('active');}
		calcLine.classList.remove('s'+(m));
		m--;
		calcLine.classList.add('s'+m);
		let calcNextStepPage = document.querySelector('.calculator_step'+(m+1));
		calcNextStepPage.classList.remove('prev');
		calcNextStepPage.classList.add('next');
		cStepPage();
	}
	function cStepPage() {
		calcPagination.textContent = m;
		let calcStepPage = document.querySelector('.calculator_step'+m);
		for (let step of calcSteps) {step.classList.remove('active');}
		calcStepPage.classList.remove('prev');
		calcStepPage.classList.remove('next');
		calcStepPage.classList.add('active');
	}

	//видео
	let ytVideos = document.querySelectorAll('.yt-video');
	ytVideos.forEach((ytVideo) => {
		ytVideo.addEventListener('click', () => {
			let ytVideoId = ytVideo.getAttribute('data-id');
			let VideoLink = `https://www.youtube.com/embed/${ytVideoId}?autoplay=1`;
			let ytVideoContent = ytVideo.querySelector('.yt-video__content');
			ytVideoContent.remove;
			let ytVideoEmbed = document.createElement('iframe');
			ytVideoEmbed.classList.add('yt-video__content');
			ytVideoEmbed.setAttribute('frameborder', '0');
			ytVideoEmbed.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
			ytVideoEmbed.setAttribute('allowfullscreen', '');
			ytVideoEmbed.setAttribute('src', VideoLink);
			ytVideo.appendChild(ytVideoEmbed);
		});
	});

	let widgets = function () {
		let callibriScript = document.createElement('script');
		callibriScript.type = 'text/javascript';
		callibriScript.src = '//callibri-a.akamaihd.net/callibri.js';
		callibriScript.charset = 'UTF-8';
		document.body.appendChild(callibriScript);

		let envyboxScript = document.createElement('script');
		let envyboxLink = document.createElement('link');
		envyboxScript.type = 'text/javascript';
		envyboxScript.src = 'https://cdn.envybox.io/widget/cbk.js?wcb_code={{common.venyooId}}';
		envyboxScript.charset = 'UTF-8';
		envyboxLink.rel = 'stylesheet';
		envyboxLink.href = 'https://cdn.envybox.io/widget/cbk.css';
		document.body.appendChild(envyboxScript);
		document.body.appendChild(envyboxLink);

		window.removeEventListener('scroll', widgets);
	}
	window.addEventListener('scroll', widgets);
		
	//отправка формы
	var punycode = new function Punycode() {
		this.utf16 = {
			decode:function(input){
				var output = [], i=0, len=input.length,value,extra;
				while (i < len) {
					value = input.charCodeAt(i++);
					if ((value & 0xF800) === 0xD800) {
						extra = input.charCodeAt(i++);
						if ( ((value & 0xFC00) !== 0xD800) || ((extra & 0xFC00) !== 0xDC00) ) {
							throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
						}
						value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
					}
					output.push(value);
				}
				return output;
			},
			encode:function(input){
				var output = [], i=0, len=input.length,value;
				while (i < len) {
					value = input[i++];
					if ( (value & 0xF800) === 0xD800 ) {
						throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
					}
					if (value > 0xFFFF) {
						value -= 0x10000;
						output.push(String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800));
						value = 0xDC00 | (value & 0x3FF);
					}
					output.push(String.fromCharCode(value));
				}
				return output.join("");
			}
		}

		//Default parameters
		var initial_n = 0x80;
		var initial_bias = 72;
		var delimiter = "\x2D";
		var base = 36;
		var damp = 700;
		var tmin=1;
		var tmax=26;
		var skew=38;
		var maxint = 0x7FFFFFFF;

		// decode_digit(cp) returns the numeric value of a basic code 
		// point (for use in representing integers) in the range 0 to
		// base-1, or base if cp is does not represent a value.

		function decode_digit(cp) {
				return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
		}

		// encode_digit(d,flag) returns the basic code point whose value
		// (when used for representing integers) is d, which needs to be in
		// the range 0 to base-1. The lowercase form is used unless flag is
		// nonzero, in which case the uppercase form is used. The behavior
		// is undefined if flag is nonzero and digit d has no uppercase form. 

		function encode_digit(d, flag) {
				return d + 22 + 75 * (d < 26) - ((flag != 0) << 5);
				//  0..25 map to ASCII a..z or A..Z 
				// 26..35 map to ASCII 0..9
		}
		//** Bias adaptation function **
		function adapt(delta, numpoints, firsttime ) {
				var k;
				delta = firsttime ? Math.floor(delta / damp) : (delta >> 1);
				delta += Math.floor(delta / numpoints);

				for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
								delta = Math.floor(delta / ( base - tmin ));
				}
				return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
		}

		// encode_basic(bcp,flag) forces a basic code point to lowercase if flag is zero,
		// uppercase if flag is nonzero, and returns the resulting code point.
		// The code point is unchanged if it is caseless.
		// The behavior is undefined if bcp is not a basic code point.

		function encode_basic(bcp, flag) {
				bcp -= (bcp - 97 < 26) << 5;
				return bcp + ((!flag && (bcp - 65 < 26)) << 5);
		}

		// Main decode
		this.decode=function(input,preserveCase) {
				// Dont use utf16
				var output=[];
				var case_flags=[];
				var input_length = input.length;

				var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;

				// Initialize the state: 

				n = initial_n;
				i = 0;
				bias = initial_bias;

				// Handle the basic code points: Let basic be the number of input code 
				// points before the last delimiter, or 0 if there is none, then
				// copy the first basic code points to the output.

				basic = input.lastIndexOf(delimiter);
				if (basic < 0) basic = 0;

				for (j = 0; j < basic; ++j) {
						if(preserveCase) case_flags[output.length] = ( input.charCodeAt(j) -65 < 26);
						if ( input.charCodeAt(j) >= 0x80) {
								throw new RangeError("Illegal input >= 0x80");
						}
						output.push( input.charCodeAt(j) );
				}

				// Main decoding loop: Start just after the last delimiter if any
				// basic code points were copied; start at the beginning otherwise. 

				for (ic = basic > 0 ? basic + 1 : 0; ic < input_length; ) {

						// ic is the index of the next character to be consumed,

						// Decode a generalized variable-length integer into delta,
						// which gets added to i. The overflow checking is easier
						// if we increase i as we go, then subtract off its starting 
						// value at the end to obtain delta.
						for (oldi = i, w = 1, k = base; ; k += base) {
										if (ic >= input_length) {
												throw RangeError ("punycode_bad_input(1)");
										}
										digit = decode_digit(input.charCodeAt(ic++));

										if (digit >= base) {
												throw RangeError("punycode_bad_input(2)");
										}
										if (digit > Math.floor((maxint - i) / w)) {
												throw RangeError ("punycode_overflow(1)");
										}
										i += digit * w;
										t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
										if (digit < t) { break; }
										if (w > Math.floor(maxint / (base - t))) {
												throw RangeError("punycode_overflow(2)");
										}
										w *= (base - t);
						}

						out = output.length + 1;
						bias = adapt(i - oldi, out, oldi === 0);

						// i was supposed to wrap around from out to 0,
						// incrementing n each time, so we'll fix that now: 
						if ( Math.floor(i / out) > maxint - n) {
								throw RangeError("punycode_overflow(3)");
						}
						n += Math.floor( i / out ) ;
						i %= out;

						// Insert n at position i of the output: 
						// Case of last character determines uppercase flag: 
						if (preserveCase) { case_flags.splice(i, 0, input.charCodeAt(ic -1) -65 < 26);}

						output.splice(i, 0, n);
						i++;
				}
				if (preserveCase) {
						for (i = 0, len = output.length; i < len; i++) {
								if (case_flags[i]) {
										output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0);
								}
						}
				}
				return this.utf16.encode(output);
		};

		//** Main encode function **

		this.encode = function (input,preserveCase) {
				//** Bias adaptation function **

				var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;

				if (preserveCase) {
						// Preserve case, step1 of 2: Get a list of the unaltered string
						case_flags = this.utf16.decode(input);
				}
				// Converts the input in UTF-16 to Unicode
				input = this.utf16.decode(input.toLowerCase());

				var input_length = input.length; // Cache the length

				if (preserveCase) {
						// Preserve case, step2 of 2: Modify the list to true/false
						for (j=0; j < input_length; j++) {
								case_flags[j] = input[j] != case_flags[j];
						}
				}

				var output=[];


				// Initialize the state: 
				n = initial_n;
				delta = 0;
				bias = initial_bias;

				// Handle the basic code points: 
				for (j = 0; j < input_length; ++j) {
						if ( input[j] < 0x80) {
								output.push(
										String.fromCharCode(
												case_flags ? encode_basic(input[j], case_flags[j]) : input[j]
										)
								);
						}
				}

				h = b = output.length;

				// h is the number of code points that have been handled, b is the
				// number of basic code points 

				if (b > 0) output.push(delimiter);

				// Main encoding loop: 
				//
				while (h < input_length) {
						// All non-basic code points < n have been
						// handled already. Find the next larger one: 

						for (m = maxint, j = 0; j < input_length; ++j) {
								ijv = input[j];
								if (ijv >= n && ijv < m) m = ijv;
						}

						// Increase delta enough to advance the decoder's
						// <n,i> state to <m,0>, but guard against overflow: 

						if (m - n > Math.floor((maxint - delta) / (h + 1))) {
								throw RangeError("punycode_overflow (1)");
						}
						delta += (m - n) * (h + 1);
						n = m;

						for (j = 0; j < input_length; ++j) {
								ijv = input[j];

								if (ijv < n ) {
										if (++delta > maxint) return Error("punycode_overflow(2)");
								}

								if (ijv == n) {
										// Represent delta as a generalized variable-length integer: 
										for (q = delta, k = base; ; k += base) {
												t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
												if (q < t) break;
												output.push( String.fromCharCode(encode_digit(t + (q - t) % (base - t), 0)) );
												q = Math.floor( (q - t) / (base - t) );
										}
										output.push( String.fromCharCode(encode_digit(q, preserveCase && case_flags[j] ? 1:0 )));
										bias = adapt(delta, h + 1, h == b);
										delta = 0;
										++h;
								}
						}

						++delta, ++n;
				}
				return output.join("");
		}

		this.ToASCII = function ( domain ) {
				var domain_array = domain.split(".");
				var out = [];
				for (var i=0; i < domain_array.length; ++i) {
						var s = domain_array[i];
						out.push(
								s.match(/[^A-Za-z0-9-]/) ?
								"xn--" + punycode.encode(s) :
								s
						);
				}
				return out.join(".");
		}
		this.ToUnicode = function ( domain ) {
				var domain_array = domain.split(".");
				var out = [];
				for (var i=0; i < domain_array.length; ++i) {
						var s = domain_array[i];
						out.push(
								s.match(/^xn--/) ?
								punycode.decode(s.slice(4)) :
								s
						);
				}
				return out.join(".");
		}
	}();
	//Обьявляем обьекты с информацией страницы
	let pageInfo = {
		'siteName': '',
		'siteAddress': '',
		'pageName': '',
		'pageAddress': ''
	};
	//Обьявляем обьекты с UTM данными
	let utms = {
		'utm_term': '',
		'utm_source': '',
		'utm_medium': '',
		'utm_campaign': '',
		'utm_content': ''
	};
	//Функция определения значений информации страницы
	function setPageInfo() {
		pageInfo['siteName'] = punycode.ToUnicode(document.location.hostname);
		pageInfo['siteAddress'] = punycode.ToUnicode(`${window.location.protocol}//${window.location.hostname}`);
		pageInfo['pageName'] = document.title;
		pageInfo['pageAddress'] = `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`;
	};
	function normalizeForms() {
		requestForms.forEach(requestForm => {
			if (requestForm.hasAttribute('name') && requestForm.hasAttribute('data-name')) {
				requestForm.setAttribute('name', requestForm.getAttribute('data-name'));
			};
			let inputs = requestForm.querySelectorAll('input, select, textarea');
			inputs.forEach(input => {
				if (input.hasAttribute('name') && input.hasAttribute('data-name')) {
					input.setAttribute('name', input.getAttribute('data-name'));
				}
			});
		});
	}
	//Функция определения значений UTM информации
	function setUtms() {
		//Получаем строку с get запросами с адреса страницы
		let getRequest = window.location.search;
		//Перебираем обьект с нужными нам UTM-метками
		for (let utm in utms) {
			//Если в строке с GET запросами есть совпадение с конкретной UTM-меткой, 
			if (getRequest.indexOf(utm) > -1) {
				//определяем где в строке GET запроса стартовая точка с UTM-меткой, а где последняя -
				let utmStartPoint = getRequest.indexOf(utm);
				//если после стартовой точки находится знак &, значит это последняя точка,
				let utmEndPoint = getRequest.indexOf('&', utmStartPoint);
				//если знака нет, значит последняя точка - это конец строки
				if (utmEndPoint === -1) {
					utmEndPoint = getRequest.length;
				};
				//Определяем значение UTM-метки из строки GET запроса: первая точка - это стартовая точка + длина названия UTM-метки + 1 символ '=', последняя точка - это последняя точка ыыы
				utms[utm] = getRequest.slice((utmStartPoint + utm.length + 1), (utmEndPoint));
			};
			utms['utm_term'] = decodeURI(utms['utm_term']);
		};
	};
	//Функция обработки форм заявок
	function handleRequestForms() {
		//Если нодлист не пуст,
		if (requestForms.length !== 0) {
			//перебираем каждый элемент
			requestForms.forEach((requestForm) => {
				//Задаём каждой форме дефолтные атрибуты
				requestForm.setAttribute('method', 'POST');
				requestForm.setAttribute('action', '/');
				requestForm.setAttribute('enctype', 'multipart/form-data');
				//Добавляем в каждую форму input hidden с информацией о странице
				for (let key in pageInfo) {
					let hiddenInput = document.createElement('input');
					hiddenInput.setAttribute('type', 'hidden');
					hiddenInput.setAttribute('name', key);
					hiddenInput.setAttribute('value', pageInfo[key]);
					requestForm.append(hiddenInput);
				};
				//Добавляем в каждую форму input hidden с UTM-метками
				for (let key in utms) {
					if (utms[key] !== '') {
						let hiddenInput = document.createElement('input');
						hiddenInput.setAttribute('type', 'hidden');
						hiddenInput.setAttribute('name', key);
						hiddenInput.setAttribute('value', utms[key]);
						requestForm.append(hiddenInput);
					}
				};
				//Добавляем в каждую форму input hidden с с её name
				let requestFormName = requestForm.getAttribute('name');
				if (requestFormName !== null) {
					let hiddenInput = document.createElement('input');
					hiddenInput.setAttribute('type', 'hidden');
					hiddenInput.setAttribute('name', 'Форма');
					hiddenInput.setAttribute('value', requestFormName);
					requestForm.prepend(hiddenInput);
				};
			});
		}
	};
	let send = 0;
	function resetX() {send = 0;}
	function sendRequestForms() {
		requestForms.forEach((requestForm) => {
			requestForm.addEventListener('submit', function(event) {
				if (send >= 1) {return}
				event.preventDefault();
				let formData = new FormData(requestForm);
				for(var pair of formData.entries()){
					if (formData.get(pair[0]) === '') {
						formData.delete(pair[0]);
					}
				}
				let request;
				if (window.XMLHttpRequest) {
					request = new XMLHttpRequest;
				} else {
					request = new ActiveXObject('Microsoft.XMLHTTP');
				};
				request.open('POST', '../submitRequestForm.php', true);
				request.send(formData);
				send++;
				request.onreadystatechange = function() {
					if (request.status == 200) {
						requestForm.parentNode.querySelector('.w-form-done').style.display = 'block';
						resetX();
					} else {
						requestForm.querySelector('.w-form-fail').style.display = 'block';
					}
				}
			});
		});
	};
	refreshFormScript();
	setUtms();
	setPageInfo();
	function refreshFormScript() {
		requestForms = document.querySelectorAll('form');
		normalizeForms();
		handleRequestForms();
		sendRequestForms();
	}
});

//залипалка второй строчи менюшки
let header_hght = 118;
(function () {
	let elem = document.querySelector('.header');
	let list = document.querySelector('.bottom-row_menu-list');
	let top = window.pageYOffset;
	elem.style.top = header_hght+'px';
	list.style.top = header_hght+'px';
	if (top > header_hght) {
		elem.style.top = '0px';
		list.style.top = '0px';
	}
	addEventListener('scroll', slimMenu);
	function slimMenu() {
		top = window.pageYOffset;
		if (top < header_hght) {
			elem.style.top = header_hght-top+'px';
			list.style.top = header_hght-top+'px';
		}
		else {
			elem.style.top = '0px';
			list.style.top = '0px';
		}
	}
}());