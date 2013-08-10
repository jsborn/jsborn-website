JSB.cls("org.jsborn.common", {

	plugins:[
		"jsborn.plugin.model",
		"jsborn.plugin.template"
	],

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
		
		this.setTplPath("/jsborn/assets/js/")

		this.loadTpl(["org/jsborn/template.html","org/jsborn/template2.html"]);
	}


})
