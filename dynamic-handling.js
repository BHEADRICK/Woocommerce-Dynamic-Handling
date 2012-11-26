(function ($) {
 if ($('#handling').length > 0) {
        var handling = $('#handling').attr('value');
        setHandling();
    }
    $('body').bind('updated_shipping_method', function () {
        console.log('Cart total changed');
        setHandling();
    });
    $('body').bind('updated_checkout', function () {
        console.log('Checkout changed');
        setHandling();
    });
	
	  function setHandling() {
	var amt;
	var	  amount;
	if(handling<100){
        console.log('handling is ' + handling);
        if ($('.cart_totals tr.shipping').length > 0) {
            $('.cart_totals tr.shipping').after('<tr class="handling"><th>Handling</th><td><span class="amount">$' + handling + '</span></td></tr>');
        }
        if ($('#order_review table.shop_table').length > 0) {
		console.log('found shop table');
		if($('#shipping_method option').length < 1){
		console.log('no find shipping method option');
		amount = $('#order_review table.shop_table tr.shipping .amount').text().replace('$','');
		console.log('shipping amount from shop table is ' + amount);
		amount -= handling;
		console.log('shipping amount from shop table is ' + amount);
		if(amount == 0) $('#order_review table.shop_table tr.shipping .amount').text('');
		else $('#order_review table.shop_table tr.shipping .amount').text('$' + amount);
		}
            $('#order_review table.shop_table tr.shipping').after('<tr class="handling"><th colspan="2">Handling</th><td><span class="amount">$' + handling + '</span></td></tr>');
        }
        $('#shipping_method option').each(function () {
            amt = $(this).text().split('$');
            amount = Number(amt[1]);
            console.log('amount for ' + amt[0] + ' is ' + amount);
            amount -= handling;
            if (amount == 0) {
                var label = amt[0];
                console.log('label is ' + label);
                label = label.replace(/-/g, "")
                label = label.replace(/:/g, "");
                console.log('now label is ' + label);
                $(this).text(label);
            } else {
                amt[1] = amount.toFixed(2);
                $(this).text(amt.join('$'));
            }
        });
		
		
		
		
		}
    }
	

	})(jQuery);
	
		