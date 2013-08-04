<div>
	<div class="page-header">
		<h1 id="class">物件</h1>
		<p class="lead">JSBorn Class</p>
	</div>
	<?php include "class/properties.html"; ?>
	<hr>
	<?php include "class/options.html"; ?>
	<hr>
	<?php include "class/methods.html"; ?>
	<hr>
	<?php include "class/events.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb">JSB</h1>
		<p class="lead">JSBorn 全域變數</p>
	</div>
	<?php include "jsb/properties.html"; ?>
	<?php include "jsb/methods.html"; ?>
	<?php include "jsb/events.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb-core-channel">Channel 物件</h1>
		<p class="lead">讓物件加入不同的事件頻道，就如收音機接收電臺一樣，接收事件。</p>
	</div>
	<?php include "core/channel/methods.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb-core-model">Model 物件</h1>
		<p class="lead">提供了簡單的資料偵測。</p>
	</div>
	<?php include "core/model/methods.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb-plugin-controller">Controller 插件</h1>
		<p class="lead">擴充物件更容易控制HTML DOM</p>
		<p>依賴:</p>
		<p><code>jsborn.plugin.model</code></p>
	</div>
	<?php include "plugin/controller/methods.html"; ?>
	<?php include "plugin/controller/events.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb-plugin-model">Model 插件</h1>
		<p class="lead">擴充物件更容易偵測資料變動。</p>
		<p>依賴:</p>
		<p><code>jsborn.core.model</code></p>
	</div>
	<?php include "plugin/model/methods.html"; ?>
	<?php include "plugin/model/events.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb-extend">extend 機制</h1>
		<p class="lead">了解繼承的支援與特性</p>
	</div>
	<?php include "extend/index.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="jsb-import">import 機制</h1>
		<p class="lead">了解import特性，可以修改你想要的載入位置。</p>
	</div>
	<?php include "import/index.html"; ?>
</div>