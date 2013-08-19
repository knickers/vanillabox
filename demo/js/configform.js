var BooleanField = function(config) {
	var me = this;

	var elem = $('<input type="checkbox">');
	me.elem_ = elem;

	me.name_ = config.name;
	me.setValue(config.value);
};

BooleanField.prototype.getElement = function() {
	return this.elem_;
};

BooleanField.prototype.getName = function() {
	return this.name_;
};

BooleanField.prototype.getValue = function() {
	return !!this.elem_.is(':checked');
};

BooleanField.prototype.setValue = function(value) {
	this.elem_.attr('checked', value);
};


var ConfigRow = function(config) {
	var me = this;

	me.config_ = config;

	me.create();
};

ConfigRow.FIELD_CLASSES = {
	'boolean': BooleanField
};

ConfigRow.prototype.create = function() {
	var me = this;

	if (me.elem_) {
		return;
	}

	var config = me.config_;
	var elem = $('<tr>');
	var tdElem;

	// enabled
	var checkboxElem;
	tdElem = $('<td>');
	tdElem.addClass('config-enabled');
	checkboxElem = $('<input type="checkbox">');
	tdElem.append(checkboxElem);
	elem.append(tdElem);
	me.checkboxElem_ = checkboxElem;

	// name
	tdElem = $('<td>');
	tdElem.addClass('config-name');
	tdElem.text(config.name);
	elem.append(tdElem);

	// description
	tdElem = $('<td>');
	tdElem.addClass('config-desc');
	tdElem.text(config.description);
	elem.append(tdElem);

	// field
	var FieldClass = ConfigRow.FIELD_CLASSES[config.type];
	var field = new FieldClass(config);
	tdElem = $('<td>');
	tdElem.addClass('config-field');
	tdElem.append(field.getElement());
	elem.append(tdElem);
	me.field_ = field;

	me.elem_ = elem;
};

ConfigRow.prototype.getElement = function() {
	return this.elem_;
};

ConfigRow.prototype.getField = function() {
	return this.field_;
};

ConfigRow.prototype.isEnabled = function() {
	var me = this;
	return me.checkboxElem_.is(':checked');
};


var ConfigForm = function(elem) {
	var me = this;

	me.elem_ = elem;

	me.create();
};

ConfigForm.HEADERS = [
	'Enabled',
	'Name',
	'Description',
	'Value'
];
ConfigForm.CONFIGS = [
	{
		name: 'closeButton',
		type: 'boolean',
		value: false,
		description: 'Visibility of the close button. If true, the mask will be unclickable.'
	}, {
		name: 'keyboard',
		type: 'boolean',
		value: true,
		description: 'If false, keyboard operations will be disabled.'
	}, {
		name: 'loop',
		type: 'boolean',
		value: false,
		description: 'If true, grouped images will become a continuous loop.'
	}, {
		name: 'repositionOnScroll',
		type: 'boolean',
		value: true,
		description: 'If false, reposition on scroll will be disabled.'
	}
];

ConfigForm.prototype.create = function() {
	var me = this;
	var elem = me.getElement();
	var len;
	var i;

	if (me.tableElem_) {
		return;
	}

	var tableElem = $('<table>');
	me.tableElem_ = tableElem;

	var rowElem = $('<tr>');
	var thElem;
	len = ConfigForm.HEADERS.length;
	for (i = 0; i < len; i++) {
		thElem = $('<th>');
		thElem.text(ConfigForm.HEADERS[i]);
		rowElem.append(thElem);
	}
	tableElem.append(rowElem);

	var config;
	var row;
	len = ConfigForm.CONFIGS.length;
	me.rows_ = [];
	for (i = 0; i < len; i++) {
		config = ConfigForm.CONFIGS[i];

		row = new ConfigRow(config);
		tableElem.append(row.getElement());
		me.rows_.push(row);
	}

	elem.append(tableElem);
};

ConfigForm.prototype.getElement = function() {
	return this.elem_;
};

ConfigForm.prototype.buildConfig = function() {
	var me = this;
	var rows = me.rows_;
	var len = rows.length;
	var config = {};
	var i;
	var row;
	var field;

	for (i = 0; i < len; i++) {
		row = rows[i];

		if (row.isEnabled()) {
			field = row.getField();
			config[field.getName()] = field.getValue();
		}
	}

	return config;
};
