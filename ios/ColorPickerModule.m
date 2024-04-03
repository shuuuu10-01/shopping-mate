#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(ColorPickerModule, NSObject)

RCT_EXTERN_METHOD(showColorPicker:(NSDictionary*)options callback:(RCTResponseSenderBlock*)callback)

@end
