JSB.cls("org.jsborn.common", {

	plugins:["jsborn.plugin.model"],

	initialize: function(options) {

		prettyPrint();
		
		jQuery('#jsb-affix').affix({

			offset: {
				top: function() {

					var _number = parseInt(jQuery('#jsb-index').css("margin-top"));
					console.log(jQuery('#jsb-index').position().top);
					return (this.top = jQuery('#jsb-index').position().top + _number - jQuery('#jsb-nav').height())

				}
			}

		});

		jQuery(document.body).scrollspy({
			target: '#jsb-affix',
			offset: jQuery('#jsb-nav').outerHeight(true)
		});

		jQuery('#jsb-affix').find('[href^=#]').on('click', function(e) {

			var _el_target = jQuery(this.getAttribute('href'))

			e.preventDefault();

			document.body.scrollTop = _el_target.offset().top - jQuery('#jsb-nav').outerHeight(true) + 5;

		});

		jQuery('[comming-soon]').on('click', function(e) {

			e.preventDefault();

			alert("COMMING SOON!");

		});
		
		var dd2 = this.addModel("key",{});

		dd2.addListener("model-add",function(){

			console.log("add")

		});

		dd2.addListener("model-modify",function(){

			console.log("modify")

		});

	}


})
