#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(ColorPickerModule, RCTEventEmitter)

RCT_EXTERN_METHOD(showColorPicker:(NSDictionary*)options callback:(RCTResponseSenderBlock*)callback)

@end
