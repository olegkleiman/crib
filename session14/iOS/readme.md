# Use from iOS (Swift)

## 1. Wrapping OpenCV as C++ librarty with Objective-C

Because OpenCV is C++ libarary and there is no bridging between Swift and C++, OpenCV functionality is usually wrapped in Objective C header file that exposes only pure C functions and uses OpenCV methods internally
``` Objective-C
@interface OpenCVWrapper : NSObject
- (void) isThisWorking;
// These methods are not exposed since they use OpenCV (as C++ library)
//- (cv::Mat) cvMatFromUIImage:(UIImage *)image;
//- (UIImage *) UIImageFromCVMat:(cv::Mat)cvMat;
@end
```
Such a header does not mention OpenCV. OpenCV comes to play only at the implementation level that should be written in **Objective-C++** (.mm file extension)
``` Objective-C++
#import <opencv2/opencv.hpp>
#import "OpenCVWrapper.h"
#import <UIKit/UIKit.h>

using namespace std;
using namespace cv;

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
After that, Swift is able to call methods in the wrapper and the later will actually translate the invocation to OpenCV library:
``` Swift
let image = UIImage(named: "amino.png")
let openCVWrapper = OpenCVWrapper()
openCVWrapper.isThisWorking(image!)
```

## 2. Converting UIImage to Mat back and forth

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

## 3. Image transformations

Having a wrapper compiled with OpenCV, the transformations are permormed as a methods of such wrapper. For example, converting an image to grey (only one channel)
``` Objective-C++
#import <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

- (UIImage *) toGrey: (UIImage *)image {
    
    Mat mat = [self cvMatFromUIImage:image];
    int channels = mat.channels();
    cout << "Origin matrix has " << channels << " channels" << endl;
    
    Mat greyMat;
    cvtColor(mat, greyMat, CV_BGR2GRAY);
    UIImage *greyImage = [self UIImageFromCVMat:greyMat];
    channels = greyMat.channels();
    cout << "Grey matrix has " << channels << " channels" << endl;
    return greyImage;
}
```
