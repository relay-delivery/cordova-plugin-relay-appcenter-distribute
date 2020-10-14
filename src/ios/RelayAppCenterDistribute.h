
#import <Cordova/CDVPlugin.h>

@interface RelayAppCenterDistribute : CDVPlugin

- (void)start:(CDVInvokedUrlCommand*)command;
- (void)checkForUpdate:(CDVInvokedUrlCommand*)command;

@end
