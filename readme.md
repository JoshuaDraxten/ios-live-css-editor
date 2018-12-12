# Live CSS Inspector for iOS

Built on iPad for iPad.

![][image-1]

## Setup

**Safari**

1. If you don’t have it already, install the Siri Shortcuts App
2. Create a new shortcut
3. Open the shortcut settings, turn on “Show in share sheet”
4. Change Accepted Types to only “Safari web pages”
5. Name your shortcut
6. Go back to editing the shortcut and add “Run JavaScript on Web Page” action.
7. Add `completion({result: true});` to the end
8. Paste the main.js code into there.

Now when you’re in safari, press the action button, select “Shortcuts” then tap the shortcut you created

**Bookmarklet**

Paste the JavaScript into [this online tool][1] and set the link as a bookmark. When you want to use the tool, click the bookmark.

[1]:	https://mrcoles.com/bookmarklet/

[image-1]:	readme-assets/editor-in-action.gif