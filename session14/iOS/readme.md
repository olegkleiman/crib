# Install iOS (Swift)

Because OpenCV is C++ libarary and there is no bridging between Swift and C++, usually, OpenCV functionality is wrapped in Objective C header file that exposes only pure C functions and uses OpenCV methods internally
``` Objective-C
@interface OpenCVWrapper : NSObject
- (void) isThisWorking;
// These methods are not exposed since they use OpenCV (as C++ library)
//+ (cv::Mat) cvMatFromUIImage:(UIImage *)image;
//+ (UIImage *) UIImageFromCVMat:(cv::Mat)cvMat;
@end
```
Such a header does not mention OpenCV. It comes to play only at the implementation level that should be written in Objective-C++
``` Objective-C++
@implementation OpenCVWrapper
- (void) isThisWorking {
     cout << "Hey" << endl;
}
+ (cv::Mat) cvMatFromUIImage:(UIImage *)image
{
//...
}
+ (UIImage *)UIImageFromCVMat:(cv::Mat)cvMat
{
//...
}
```
