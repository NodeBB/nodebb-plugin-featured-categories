<link rel="stylesheet" href="{config.relative_path}/plugins/nodebb-plugin-featured-categories/static/admin.css">
<div class="row featured-categories">
	<div class="col-lg-12">
		<div class="panel panel-default">
			<div class="panel-heading">Featured Categories</div>
			<div class="panel-body">
				<p>Select the categories you want to be featured on the home page.</p>
				<form role="form" id="featured-categories">
					<div class="form-group col-md-12 col-xs-12">
						<label for="opacity" class="col-md-2 col-sm-4 col-xs-12">Category 1</label>
						<input type="text" style="display: none" id="category_1" data-key="category_1" title="category_1" class="form-control">
						<select id="category_1_select" class="col-md-10 col-sm-8 col-xs-12"></select>
					</div>
					<div class="form-group col-md-12 col-xs-12">
						<label for="opacity" class="col-md-2 col-sm-4 col-xs-12">Category 2</label>
						<input type="text" style="display: none" id="category_2" data-key="category_2" title="category_2" class="form-control">
						<select id="category_2_select" class="col-md-10 col-sm-8 col-xs-12"></select>
					</div>
					<div class="form-group col-md-12 col-xs-12">
						<label for="opacity" class="col-md-2 col-sm-4 col-xs-12">Category 3</label>
						<input type="text" style="display: none" id="category_3" data-key="category_3" title="category_3" class="form-control">
						<select id="category_3_select" class="col-md-10 col-sm-8 col-xs-12"></select>
					</div>
					<div class="form-group col-md-12 col-xs-12">
						<label for="opacity" class="col-md-2 col-sm-4 col-xs-12">Category 4</label>
						<input type="text" style="display: none" id="category_4" data-key="category_4" title="category_4" class="form-control">
						<select id="category_4_select" class="col-md-10 col-sm-8 col-xs-12"></select>
					</div>
					<button class="btn btn-primary" id="save">Save Settings</button>
				</form>
			</div>
		</div>
	</div>

	<script>
	getCategories();
	</script>
