<footer id="jsb-footer" class="jsb-footer">
	<div class="container">
		<p>
			<span>
				Designed and built  by
				<a href="https://twitter.com/tureki" target="_blank">@tureki</a>
			</span>
			<span>
				<a 
				title="Author: kah wai liew on Google+" 
				rel="publisher" 
				href="https://plus.google.com/115553313711775317354" target="_blank">Kah Wai Liew</a>
			</div>
		</p>
		<p>
			Code licensed under
			<a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>
			, documentation under
			<a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>
		</p>
	</div>
</footer>
<div id="fb-root"></div>
<script src="<?php echo DIR_ROOT; ?>/assets/js/jquery/jquery-1-10-2.js"></script>
<script src="<?php echo DIR_ROOT; ?>/assets/js/bootstrap/bootstrap-3.js"></script>
<script src="<?php echo DIR_ROOT; ?>/assets/js/prettify/prettify.js"></script>
<script src="<?php echo DIR_ROOT; ?>/assets/js/jsborn/jsborn.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
			
		JSB.setConfig({
			console: true,
			createImport: true,
			importSetup: {
				library: '<?php echo DIR_ROOT; ?>/assets/js/jsborn/',
				jquery: '<?php echo DIR_ROOT; ?>/assets/js/jsborn/',
				source: '<?php echo DIR_ROOT; ?>/assets/js/',
				parserURL:function(url){
					console.log(url);
					return url;
				}
			}
		});

		JSB.addListener('create', function() {
			// console.log(arguments);
			// console.log("create");
		});

		JSB.addListener('destroy', function() {
			// console.log(arguments);
			// console.log("destroy");
		});

		window.cls = JSB.create("org.jsborn.common");

		window.fbAsyncInit = function() {
		FB.init({
			appId: '223395717811146',
			status: true,
			xfbml: true
		});

		FB.Event.subscribe('xfbml.render', function() {
			$("#social-like-btn").show();
		});
		
	};
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/zh_TW/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	});
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-42957857-1', 'jsborn.org');
  ga('send', 'pageview');

</script>
</body>
</html>