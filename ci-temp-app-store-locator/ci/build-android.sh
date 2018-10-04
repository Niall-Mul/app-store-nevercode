#!/bin/bash
set -e

export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:/usr/local/bin
yarn install


rm -f node_modules/react-native-scripts/build/scripts/eject.js
cp ci/node_modules/react-native-scripts/build/scripts/eject.js node_modules/react-native-scripts/build/scripts/eject.js
yarn eject
sed -i "s@appstorelocator@StoreLocator@" index.js
#mkdir android/app/src/main/assets && yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

#keytool -genkey -noprompt -alias vfstorelocatorkey -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=niallmul.singlepoint.com, OU=VF, O=SP, L=Dublin, S=Dublin, C=IE" -keystore vodafonestorelocator.jks -storepass password -keypass password

#mv ci/vodafonestorelocator.keystore android/app/vodafonestorelocator.keystore

#rm -f android/build.gradle && rm -f android/gradle.properties && rm -f android/app/build.gradle && rm -f android/settings.gradle
#cp ci/android/build.gradle android/build.gradle
#cp ci/android/gradle.properties android/gradle.properties
#cp ci/android/settings.gradle android/settings.gradle
#cp ci/android/app/build.gradle android/app/build.gradle
#sed -i "s@versionCode 5@versionCode $BUILD_NUMBER@" android/app/build.gradle

#rm -f android/app/src/main/java/com/storelocator/MainApplication.java && rm -f android/app/src/main/AndroidManifest.xml && rm -f android/gradle/wrapper/gradle-wrapper.properties
#cp ci/android/app/src/main/java/com/storelocator/MainApplication.java android/app/src/main/java/com/storelocator/MainApplication.java
#cp ci/android/app/src/main/AndroidManifest.xml android/app/src/main/AndroidManifest.xml
#cp ci/android/gradle/wrapper/gradle-wrapper.properties android/gradle/wrapper/gradle-wrapper.properties

#rm -r android/app/src/main/res/mipmap-hdpi && rm -r android/app/src/main/res/mipmap-mdpi && rm -r android/app/src/main/res/mipmap-xhdpi && rm -r android/app/src/main/res/mipmap-xxhdpi
#cp -r ci/android/app/src/main/res/mipmap/ic_launcher/mipmap-hdpi android/app/src/main/res/mipmap-hdpi && cp -r ci/android/app/src/main/res/mipmap/ic_launcher/mipmap-ldpi android/app/src/main/res/mipmap-ldpi && cp -r ci/android/app/src/main/res/mipmap/ic_launcher/mipmap-mdpi android/app/src/main/res/mipmap-mdpi
#cp -r ci/android/app/src/main/res/mipmap/ic_launcher/mipmap-xhdpi android/app/src/main/res/mipmap-xhdpi && cp -r ci/android/app/src/main/res/mipmap/ic_launcher/mipmap-xxhdpi android/app/src/main/res/mipmap-xxhdpi && cp -r ci/android/app/src/main/res/mipmap/ic_launcher/mipmap-xxxhdpi android/app/src/main/res/mipmap-xxxhdpi
#cp ci/android/app/src/main/res/mipmap/ic_launcher/playstore-icon.png android/app/src/main/res/playstore-icon.png

#rm -f node_modules/react-native/react.gradle && cp ci/node_modules/react-native/react.gradle node_modules/react-native/react.gradle
#cd android && ./gradlew assembleRelease

#/opt/android-sdk/build-tools/27.0.3/zipalign -v -p 4 app/build/outputs/apk/release/app-release-unsigned.apk  app/build/outputs/apk/release/app-release-unsigned-aligned.apk



#/opt/android-sdk/build-tools/27.0.3/apksigner sign --ks app/vodafonestorelocator.keystore --ks-pass pass:password --ks-key-alias vodafonestorelocator --key-pass pass:password --out ./app/build/outputs/apk/release/app-release.apk ./app/build/outputs/apk/release/app-release-unsigned-aligned.apk 
