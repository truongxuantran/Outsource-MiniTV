package com.minischool.minitv;

import android.content.Context;

import androidx.multidex.MultiDexApplication;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return true;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
           packages.add(new PermissionWebviewPackage());
                   packages.add(new RNFirebaseMessagingPackage());
                   packages.add(new RNFirebaseNotificationsPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
//    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
//  private static void initializeFlipper(
//      Context context, ReactInstanceManager reactInstanceManager) {
//    if (BuildConfig.DEBUG) {
//      try {
//        /*
//         We use reflection here to pick up the class that initializes Flipper,
//        since Flipper library is not available in release mode
//        */
//        Class<?> aClass = Class.forName("com.minischool.minitv.ReactNativeFlipper");
//        aClass
//            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
//            .invoke(null, context, reactInstanceManager);
//      } catch (ClassNotFoundException e) {
//        e.printStackTrace();
//      } catch (NoSuchMethodException e) {
//        e.printStackTrace();
//      } catch (IllegalAccessException e) {
//        e.printStackTrace();
//      } catch (InvocationTargetException e) {
//        e.printStackTrace();
//      }
//    }
//  }
}
