/********* Echo.m Cordova Plugin Implementation *******/

#import "RelayAppCenterDistribute.h"
#import <Cordova/CDVPlugin.h>
#import <AppCenter/AppCenter.h>
#import <AppCenterDistribute/AppCenterDistribute.h>

@implementation RelayAppCenterDistribute

- (void)start:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* msAppId = [command.arguments objectAtIndex:0];

    NSString* strReturnValue = [NSString stringWithFormat:@"%@/%@/%@", @"hello_ ", msAppId, @" _goodbye"];


    if (msAppId != nil && [msAppId length] > 0) {

	[MSAppCenter start:msAppId withServices: @[ [MSDistribute class] ]];

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:strReturnValue];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)checkForUpdate:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = @"called checkForUpdate";

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
@end
