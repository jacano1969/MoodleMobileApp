Ext.define('MoodleMobApp.model.ForumDiscussion', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'forum', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'firstpost', type: 'int'},
			{name: 'userid', type: 'int'},
			{name: 'groupid', type: 'int'},
			{name: 'timemodified', type: 'string'}
		]
	}
});