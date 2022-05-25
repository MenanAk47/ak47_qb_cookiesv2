window.addEventListener("message", function(event) {
	var item = event.data;
	if (item.showmenu) {
		var config = item.dados.config;
		var store_business = item.dados.store_business;
		var isProcess = item.process;
		var manage = item.manage;
		$("#nav-bar").empty();
		if (item.update != true) {
			$(".pages").css("display", "none");
			$("body").css("display", "");
			$(".sidebar-navigation ul li").removeClass("active");
			$("#sidebar-1").addClass("active");
			openPage(5);
		}
		$("#nav-bar").append(`
			` + getPagination(config.market_types.pagination) + `
			<li onclick="closeUI()">
				<i class="fas fa-times"></i>
				<span class="tooltip">Close</span>
			</li>
			`);
		$(".sidebar-5").addClass("active");
		$("#market-products0").empty();
		$("#market-products1").empty();
		$("#market-products2").empty();
		$("#market-products3").empty();
		$("#market-products4").empty();
		$("#market-products5").empty();
		$("#market-products6").empty();
		$("#market-products7").empty();
		$("#market-products7").empty();
		$("#market-products9").empty();
		$("#form_product").empty();
		$("#form_product").append(`
			<option value="" selected disabled>Select the product</option>
		`);
		var arr_stock = JSON.parse(store_business.stock);
		for (const key in config.market_types.market_items) {
			var item = config.market_types.market_items[key];
			var stock_value = 0;
			if (arr_stock[key] == undefined) {
				stock_value = "Full";
			} else {
				stock_value = new Intl.NumberFormat(config.format.location).format(arr_stock[key].stock);
			}
			var fkey = key;
			if (isProcess) {
				if (item.process) {
					$("#market-products" + item.page).append(`
						<div class="col-2 p-2">
							<div class="card card-custom w-auto m-0 bg-light">
								<div class="card-content">
									<div class="card-body cleartfix">
										<div class="media flex-column">
											<div class="media-div-custom">
												<img src=img/` + key + `.png/><p class="stock-location mb-0">` + stock_value + `</p>
											</div>
											<div class="media-body">
												<h4>` + (item.name.length > 15 ? item.name.substring(0, 14) + ".." : item.name) + `</h4>
												<button onclick="makeItem('` + fkey + `')" class="btn btn-outline-secondary deposit-money-btn col-12">Make Item</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					`);
				}
			} else if (manage) {
				$("#market-products" + item.page).append(`
					<div class="col-2 p-2">
						<div class="card card-custom w-auto m-0 bg-light">
							<div class="card-content">
								<div class="card-body card-custom-height cleartfix">
									<div class="media flex-column">
										<div class="media-div-custom">
											<img src=img/` + key + `.png/>
											<p class="price-location">` + new Intl.NumberFormat(config.format.location, {
					style: "currency",
					currency: config.format.currency,
					maximumFractionDigits: 0,
					minimumFractionDigits: 0,
				}).format(arr_stock[key].price) + `</p>
											<p class="stock-location mb-0">` + stock_value + `</p>
										</div>
										<div class="media-body">
											<h4>` + (item.name.length > 15 ? item.name.substring(0, 14) + ".." : item.name) + `</h4>
											<div class="row mr-0 ml-0">
												<button onclick="putIn('` + fkey + `')" class="btn btn-outline-secondary deposit-money-btn btn-left-radius col-3 p-0">IN</button>
												<div class="col-6 pl-1 pr-1">
													<input id="input-` + fkey + `" class="deposit-money w-100 h-100 m-0 p-1" type="number" min="1" placeholder="0" name="amount" required="required">
												</div>
												<button onclick="putOut('` + fkey + `')" class="btn btn-outline-secondary deposit-money-btn btn-right-radius col-3 p-0">OUT</button>
											</div>
											<div class="row mr-0 ml-0 mt-1">
												<div class="col-6 pl-0 pr-1">
													<input id="input-p-` + fkey + `" class="manage-money input-left-radius w-100 h-100 m-0 p-1" type="number" min="1" placeholder="Price" name="amount" required="required">
												</div>
												<button onclick="cPrice('` + fkey + `')" class="btn btn-outline-secondary deposit-money-btn btn-right-radius col-6 p-0">UPDATE</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				`);
			} else {
				$("#market-products" + item.page).append(`
					<div class="col-2 p-2">
						<div class="card card-custom w-auto m-0 bg-light">
							<div class="card-content">
								<div class="card-body cleartfix">
									<div class="media flex-column">
										<div class="media-div-custom">
											<img src=img/` + key + `.png/>
											<p class="price-location">` + new Intl.NumberFormat(config.format.location, {
					style: "currency",
					currency: config.format.currency,
					maximumFractionDigits: 0,
					minimumFractionDigits: 0,
				}).format(arr_stock[key].price) + `</p><p class="stock-location mb-0">` + stock_value + `</p></div><div class="media-body"><h4>` + (item.name.length > 15 ? item.name.substring(0, 14) + ".." : item.name) + `</h4><div class="row mr-0 ml-0"><div class="col-7 pl-0 pr-1"><input id="input-` + fkey + `" class="deposit-money input-left-radius w-100 h-100 m-0 p-1" type="number" min="1" max="` + arr_stock[key] + `" placeholder="0" name="amount" required="required"></div>
											<button onclick="buyItem('` + fkey + `')" class="btn btn-outline-secondary deposit-money-btn btn-right-radius col-5">BUY</button></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				`);
			}
		}
	}
	if (item.hidemenu) {
		$("body").css("display", "none");
	}
});

function openPage(pageN) {
	if ($(".sidebarClass").hasClass("active")) {
		$(".sidebarClass").removeClass("active");
	}
	$(".sidebar-" + pageN).addClass("active");
	if (pageN == 0) {
		$(".pages").css("display", "none");
		$(".main-page").css("display", "block");
	}
	if (pageN == 1) {
		$(".pages").css("display", "none");
		$(".goods-page").css("display", "block");
	}
	if (pageN == 2) {
		$(".pages").css("display", "none");
		$(".hire-page").css("display", "block");
	}
	if (pageN == 3) {
		$(".pages").css("display", "none");
		$(".upgrades-page").css("display", "block");
	}
	if (pageN == 4) {
		$(".pages").css("display", "none");
		$(".bank-page").css("display", "block");
	}
	if (pageN == 5) {
		$(".pages").css("display", "none");
		$(".market-page0").css("display", "block");
	}
	if (pageN == 6) {
		$(".pages").css("display", "none");
		$(".market-page1").css("display", "block");
	}
	if (pageN == 7) {
		$(".pages").css("display", "none");
		$(".market-page2").css("display", "block");
	}
	if (pageN == 8) {
		$(".pages").css("display", "none");
		$(".market-page3").css("display", "block");
	}
	if (pageN == 9) {
		$(".pages").css("display", "none");
		$(".market-page4").css("display", "block");
	}
	if (pageN == 10) {
		$(".pages").css("display", "none");
		$(".market-page5").css("display", "block");
	}
	if (pageN == 11) {
		$(".pages").css("display", "none");
		$(".market-page6").css("display", "block");
	}
	if (pageN == 12) {
		$(".pages").css("display", "none");
		$(".market-page7").css("display", "block");
	}
	if (pageN == 13) {
		$(".pages").css("display", "none");
		$(".market-page8").css("display", "block");
	}
	if (pageN == 14) {
		$(".pages").css("display", "none");
		$(".market-page9").css("display", "block");
	}
}

function getPagination(pagination) {
	var html = "";
	for (var i = 0; i <= 9; i++) {
		if (pagination[i] == undefined) {
			return html;
		}
		html += `
		<li class="sidebarClass sidebar-` + (5 + i) + `" onclick="openPage(` + (5 + i) + `)">
			<i class="fas ` + pagination[i].icon + `"></i>
			<span class="tooltip">` + pagination[i].name + `</span>
		</li>`;
	}
	return html;
}
document.onkeyup = function(data) {
	if (data.which == 27) {
		if ($("body").is(":visible")) {
			post("close", "");
		}
	}
};

function closeUI() {
	post("close", "");
}
$(document).ready(function() {
	$("#contact-form").on("submit", function(e) {
		e.preventDefault();
		var form = $("#contact-form").serializeArray();
		var e = document.getElementById("form_product");
		var item_id = e.options[e.selectedIndex].getAttribute("item_id");
		post("createJob", {
			name: form[0].value,
			reward: form[1].value,
			product: item_id,
			amount: form[3].value,
		});
	});
});

function buyItem(item_id) {
	var amount = $("#input-" + item_id).val();
	var item_id = item_id.replace("-x-", "|");
	if (amount > 0) {
		post("buyItem", {
			item_id: item_id,
			amount: amount,
		});
	}
}

function putIn(item_id) {
	var amount = $("#input-" + item_id).val();
	var item_id = item_id.replace("-x-", "|");
	if (amount > 0) {
		post("putIn", {
			item_id: item_id,
			amount: amount,
		});
	}
}

function putOut(item_id) {
	var amount = $("#input-" + item_id).val();
	var item_id = item_id.replace("-x-", "|");
	if (amount > 0) {
		post("putOut", {
			item_id: item_id,
			amount: amount,
		});
	}
}

function cPrice(item_id) {
	var price = $("#input-p-" + item_id).val();
	var item_id = item_id.replace("-x-", "|");
	if (price >= 0) {
		post("cPrice", {
			item_id: item_id,
			price: price,
		});
	}
}

function makeItem(item_id) {
	var item_id = item_id;
	post("makeItem", {
		item_id: item_id,
	});
	closeUI();
}

function post(name, data) {
	$.post("https://ak47_qb_cookiesv2/" + name, JSON.stringify(data), function(datab) {});
}