# OS macOs


## mermaid
https://github.com/mermaid-js/mermaid-cli

## xattr

macOS
  extended attributes

  e`x`tended `attr`ibutes

xattr -d com.apple.quarantine {해당파일이름}

   -p  Print the value associated with the given attribute.

-l  By default, the first two command forms either display just the attribute names or
       values, respectively. The -l option causes both the attribute names and corresponding
       values to be displayed. For hex display of values, the output is preceeded with the hex
       offset values and followed by ASCII display, enclosed by '|'.

-d  Delete the given attribute.


-c  CLear all Atrributes.
-r  If a file argument is a directory, act as if the entire contents of the directory
       recursively were also specified (so that every file in the directory tree is acted upon).

## lipo

lipo -info
lipo -create

## XCFramework

## otool

otool -L

## install_name_tool

install_name_tool -id
install_name_tool -change


## disable Input Source Indicating Bubble

- https://apple.stackexchange.com/questions/464783/what-s-that-coloured-icon-with-an-a-inside-it-in-text/465466#465466

``` sh
sudo defaults write /Library/Preferences/FeatureFlags/Domain/UIKit.plist redesigned_text_cursor -dict-add Enabled -bool NO
```
