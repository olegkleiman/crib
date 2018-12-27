# Install iOS (Swift)

Usually, OpenCV functionality is wrapped in Objective C header file. Since there is no bridging between Swift and C++, that file exposes only pure C functions and uses OpenCV methods internally
``` Objective-C
@interface OpenCVWrapper : NSObject
- (void) isThisWorking;
// These methods are not exposed since they use OpenCV (as C++ library)
//+ (cv::Mat) cvMatFromUIImage:(UIImage *)image;
//+ (UIImage *) UIImageFromCVMat:(cv::Mat)cvMat;
@end
```
