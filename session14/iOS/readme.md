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
Such a header does not mention OpenCV. OpenCV comes to play only at the implementation level that should be written in **Objective-C++** (.mm file extension)
``` Objective-C++
@implementation OpenCVWrapper
- (void) isThisWorking: (UIImage *)image  {
     cout << "Hey" << endl;
     cv:Mat mat = [self cvMatFromUIImage:image];
}
- (cv::Mat) cvMatFromUIImage:(UIImage *) image {
//...
}
- (UIImage *) UIImageFromCVMat:(cv::Mat) cvMat {
//...
}
```
This way Swift is able to call methods in OpenCV library

Obviously, images that passed from Swift should be firstly converted into OpenCV structures and primarily into *Mat*. This is done with a help of *Core Graphics* framework:
``` Objective-C++
- (cv::Mat) cvMatFromUIImage:(UIImage *)image {
    
    //cv::Mat src = [Conversion cvMatWithImage:source];
    CGColorSpaceRef colorSpace = CGImageGetColorSpace(image.CGImage);
    CGFloat cols = image.size.width;
    CGFloat rows = image.size.height;
    
    cv::Mat cvMat(rows, cols, CV_8UC4); // 8 bits per component, 4 channels (color channels + alpha)
    CGContextRef contextRef = CGBitmapContextCreate(cvMat.data,                 // Pointer to  data
                                                    cols,                       // Width of bitmap
                                                    rows,                       // Height of bitmap
                                                    8,                          // Bits per component
                                                    cvMat.step[0],              // Bytes per row
                                                    colorSpace,                 // Colorspace
                                                    kCGImageAlphaNoneSkipLast |
                                                    kCGBitmapByteOrderDefault); // Bitmap info flags
    CGContextDrawImage(contextRef, CGRectMake(0, 0, cols, rows), image.CGImage);
    CGContextRelease(contextRef);
    
    return cvMat;
}
```
The main point of interest here is [CGBitmapContextCreate](https://developer.apple.com/documentation/coregraphics/1455939-cgbitmapcontextcreate?language=objc) function that actually converts the image data from colorspace to matrix data according to various parameters.
