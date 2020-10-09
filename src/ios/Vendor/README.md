there is a known `cordova-ios` issue that prevents using cocoapods if there dependencies also has resource files of some kind.

The resource files get copied to the wrong location. So im manually copy files to the "wrong" location so that the build works. it sucks.

this was happening in appcenter 3.3.4

