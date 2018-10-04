#!/bin/bash
set -e
# Parameters
#appdevaccount team id
TEAM_ID=GZM59DY7MK
#Stephens account:
#TEAM_ID=6CX3VH6HDK
set -x

rm -rf ci-temp-ios
cp  -r app-store-locator ci-temp-ios
mkdir -p ci-temp-ios/@vodafone
cp -r core-app ci-temp-ios/@vodafone/core-app
cp -r core-redux ci-temp-ios/@vodafone/core-redux

cd ci-temp-ios
yarn reset
yarn remove crna-make-symlinks-for-yarn-workspaces
yarn remove metro-bundler-config-yarn-workspaces

yarn install
rm -f node_modules/react-native-scripts/build/scripts/eject.js
cp ci/node_modules/react-native-scripts/build/scripts/eject.js node_modules/react-native-scripts/build/scripts/eject.js
yarn eject
rm -f index.js && mv ci/index.js index.js
NAME=`cat app.json | jq -r .name`
DISPLAY_NAME=`cat app.json | jq -r .displayName`

cd ios/

cp ../ci/build-resources/ios/Podfile .
pod install

#rm -f ~/Library/MobileDevice/Provisioning\ Profiles/*
yarn react-native link react-native-vector-icons
cd ..

yarn react-native bundle --dev false --entry-file index.js --bundle-output main.jsbundle --platform ios --assets-dest ios

cd ios
sed -i '' 's/org.reactjs.native.example/com.singlepoint/g' StoreLocator/Info.plist
perl -i.bak -0777 -pe  's|<key>UIViewControllerBasedStatusBarAppearance</key>\s*<false/>|<key>UIViewControllerBasedStatusBarAppearance</key>\n<false/>\n<key>ITSAppUsesNonExemptEncryption</key>\n<false/>|sig' StoreLocator/Info.plist
perl -i.bak -0777 -pe  's|<key>ITSAppUsesNonExemptEncryption</key>\s*<false/>|<key>ITSAppUsesNonExemptEncryption</key>\n<false/>\n<key>NSLocationAlwaysUsageDescription</key>\n<string>This app requires youre location as it works to display the stores closest to your location, it also, if you so choose, will show the fastest route to that store</string>|sig' StoreLocator/Info.plist
perl -i.bak -0777 -pe 's|<key>NSLocationWhenInUseUsageDescription</key>\s*<string/>|<key>NSLocationWhenInUseUsageDescription</key>\n<string>This app requires youre location as it works to display the stores closest to your location, it also, if you so choose, will show the fastest route to that store</string>|sig' StoreLocator/Info.plist

xcrun agvtool new-version -all $BUILD_NUMBER
rm -r StoreLocator/images.xcassets/AppIcon.appiconset && cp -r ../assets/images/AppIcon.appiconset StoreLocator/images.xcassets/AppIcon.appiconset


# Command to unlock the keychain if ever required
security unlock-keychain -p wuVvEZmY login.keychain-db
xcodebuild -sdk iphonesimulator -configuration Debug -workspace $NAME.xcworkspace -scheme $NAME -derivedDataPath build
cd build/Build/Products/Debug-iphonesimulator
zip -r StoreLocator.zip StoreLocator.app
mv StoreLocator.zip ../../../../../StoreLocator.zip
cd ../../../..

xcodebuild archive  -workspace $NAME.xcworkspace  -allowProvisioningUpdates -scheme $NAME -configuration Release -archivePath ../builds/$NAME.xcarchive DEVELOPMENT_TEAM=$TEAM_ID CODE_SIGN_STYLE=Automatic PROVISIONING_STYLE=Automatic
xcodebuild -exportArchive -allowProvisioningUpdates -archivePath ../builds/$NAME.xcarchive -exportPath ../builds-devicefarm/ -exportOptionsPlist ../ci/build-resources/ios/ExportOptionsDevelopment.plist
xcodebuild -exportArchive  -allowProvisioningUpdates -archivePath ../builds/$NAME.xcarchive -exportPath ../builds/ -exportOptionsPlist ../ci/build-resources/ios/ExportOptions.plist
codesign -f --sign "iPhone Distribution: Ronnie Jansen (GZM59DY7MK)" ../builds/StoreLocator.ipa
cd ..
# “$ALTOOL” --upload-app -f ./StoreLocator.ipa -u appledevaccount@singlepoint.ie -p urtz-swip-mkbv-lzod
# “$ALTOOL” --upload-app --type ios --file ./StoreLocator.ipa --username appledevaccount@singlepoint.ie --password urtz-swip-mkbv-lzod
