package delivery.relay.cordova;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.distribute.Distribute;

public class RelayAppCenterDistribute extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

		if (action.equals("start")) {
			// AppCenter.start(getApplication(), "{Your App Secret}", Distribute.class);
			String msApplicationId = data.getString(0);

			Distribute.setEnabledForDebuggableBuild(true);
			AppCenter.start(cordova.getActivity().getApplication(), msApplicationId, Distribute.class);

			Distribute.setEnabledForDebuggableBuild(true);

			this.echo(msApplicationId, callbackContext);

			return true;

		} else if (action.equals("checkForUpdate")) {
			Distribute.setEnabledForDebuggableBuild(true);
			Distribute.checkForUpdate();
			Distribute.setEnabledForDebuggableBuild(true);
			this.echo("success checkForUpdate", callbackContext);
			return true;

		} else {
			return false;

		}
	}

	// Validate the message and send callback accordingly.
	private void echo(String message, CallbackContext callbackContext) {
		if (message != null && message.length() > 0) {
			callbackContext.success("RelayAppCenterDistribute: " + message);
		} else {
			callbackContext.error("Echo Argument was null");
		}
	}
}
