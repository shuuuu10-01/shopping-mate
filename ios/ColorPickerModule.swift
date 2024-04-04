import UIKit
@available(iOS 14.0, *)
@objc(ColorPickerModule)
class ColorPickerModule: RCTEventEmitter, UIColorPickerViewControllerDelegate{
    var picker: UIColorPickerViewController!
    var supportsAlpha:Bool = false
    var initialColor:UIColor = UIColor(ciColor: .black)
    var callback: RCTResponseSenderBlock!

    override func supportedEvents() -> [String]! {
        return ["onColorChange"]
    }

    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    func showColorPicker(_ options:NSDictionary, callback:@escaping RCTResponseSenderBlock){
        if (options["supportsAlpha"] as? NSNumber == 1) {
            self.supportsAlpha = true
        }
        self.initialColor=RCTConvert.uiColor(options["initialColor"])
        self.callback=callback
                                                        
        DispatchQueue.main.async {
            self.launchColorPicker()
        }
    }
    
    func launchColorPicker() {
        self.picker = UIColorPickerViewController()
        self.picker.delegate = self
                
        self.picker.supportsAlpha=self.supportsAlpha
        self.picker.selectedColor=self.initialColor
        
        if let root = RCTPresentedViewController() {
            root.present(self.picker, animated: true, completion: nil)
        }
    }

    // 色を選択するたびに呼ばれる関数
    func colorPickerViewController(_ viewController: UIColorPickerViewController, didSelect color: UIColor, continuously: Bool) {
        let colorString = hexStringFromColor(color: color)
        sendEvent(withName: "onColorChange", body: ["color": colorString])
    }
    
    func hexStringFromColor(color: UIColor) -> String {
        let rgba = color.cgColor.components
        let r: CGFloat = rgba?[0] ?? 0.0
        let g: CGFloat = rgba?[1] ?? 0.0
        let b: CGFloat = rgba?[2] ?? 0.0
        let a: CGFloat = rgba?[3] ?? 0.0

        let hexString = String(format: "#%02lX%02lX%02lX%02lX", lroundf(Float(r * 255)), lroundf(Float(g * 255)), lroundf(Float(b * 255)), lroundf(Float(a * 255)))
        return hexString
    }
}
