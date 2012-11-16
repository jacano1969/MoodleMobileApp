Ext.application({

	name: 'MoodleMobApp',

	requires: [
		'Ext.MessageBox',
		'Ext.TitleBar',
		'Ext.Img',
		'Ext.data.identifier.Uuid',
		'MoodleMobApp.Config',
		'MoodleMobApp.Session',
		'MoodleMobApp.WebService',
		'MoodleMobApp.util.Link',
		'MoodleMobApp.store.HomeOrgs',
	],

	models: [
		"MoodleMobApp.model.Settings",
	],

	stores: [
		'MoodleMobApp.store.Settings',
	],
	
	views: [
		'MoodleMobApp.view.UsageAgreement',
		'MoodleMobApp.view.AccountChoice',
		'MoodleMobApp.view.Main',
		'MoodleMobApp.view.Course',
		'MoodleMobApp.view.CourseList',
		'MoodleMobApp.view.Shell',
	],

	controllers: [
		"MoodleMobApp.controller.Init", 
		"MoodleMobApp.controller.Main",
		"MoodleMobApp.controller.UsageAgreement", 
		"MoodleMobApp.controller.User", 
		"MoodleMobApp.controller.AccountChoice", 
		'MoodleMobApp.controller.Account',
		'MoodleMobApp.controller.AaiAccount',
		'MoodleMobApp.controller.ManualAccount',
		'MoodleMobApp.controller.CourseNavigator',
		'MoodleMobApp.controller.Assignment',
		'MoodleMobApp.controller.Forum',
		'MoodleMobApp.controller.Folder',
		'MoodleMobApp.controller.Shell',
	],

	icon: {
		57: 'resources/icons/Icon.png',
		72: 'resources/icons/Icon~ipad.png',
		114: 'resources/icons/Icon@2x.png',
		144: 'resources/icons/Icon~ipad@2x.png'
	},

	phoneStartupScreen: 'resources/loading/Homescreen.jpg',
	tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

	launch: function() {
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();

		if( MoodleMobApp.Session.getSettingsStore().first().getData().usageagreement == false ) {
			Ext.Viewport.add( Ext.create('MoodleMobApp.view.UsageAgreement') );
		} else if( MoodleMobApp.Session.getSettingsStore().first().getData().accounttype == '' ) {
			Ext.Viewport.add(Ext.create('MoodleMobApp.view.AccountChoice'));
		} else {
			Ext.Viewport.add(Ext.create('MoodleMobApp.view.Main'));
		}
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	},

	openFile: function(path, mimetype){
		window.plugins.webintent.startActivity(
			{
    			action: WebIntent.ACTION_VIEW,
				type: mimetype,
    			url: path,
  			}, 
			function () {}, 
			function () {
				Ext.Msg.alert('File Error', 'Failed to open:'+path+' via Android Intent');
  			});
	}
});
