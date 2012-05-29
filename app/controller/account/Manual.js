Ext.define('iCorsi.controller.account.Manual', {
    extend: 'Ext.app.Controller',

	requires: [
		'iCorsi.model.account.Manual',
		'iCorsi.store.account.Manual'
	],
   	
    config: {
        refs: {
			form: '#manualaccount_form',
			save: '#manualaccount_form button[action=save]'
        },

        control: {
			form: {
				initialize: 'loadAccountData'
			},
   			save: {
				tap: 'saveAccountData'
			}	
        }
    },

	loadAccountData: function () {
		var form = this.getForm();	
		var account_store = Ext.create('iCorsi.store.account.Manual'); 
		account_store.load();
		if(account_store.getCount() > 0) {
			// Update the form with account data.
			form.setRecord( Ext.create('iCorsi.model.account.Manual', account_store.first().getData()) );
		}
	},

	saveAccountData: function () {
		var form = this.getForm();	
		// store account data
		var account_store = Ext.create('iCorsi.store.account.Manual'); 
		account_store.load();
		account_store.removeAll();
		account_store.add(form.getValues());
		account_store.sync();

		// set user accounttype setting
		var settings_store = Ext.create('iCorsi.store.Settings'); 
		settings_store.load();
		settings_store.data.first().getData().accounttype = 'manual';
		settings_store.first().setDirty();
		settings_store.sync();

        // Mask the form
        form.setMasked({
            xtype: 'loadmask',
            message: 'Saving...'
        });

        // Put it inside a timeout so it feels like it is going to a server.
        setTimeout(function() {
            // Unmask the formpanel
            form.setMasked(false);
			location.reload();
        }, 1000);
	}
    
});
