---
layout: page
title: Known Issues
---

#For known issues with RES releases, please see the relevant [changelog](https://redditenhancementsuite.com/releases/).

#Extension conflicts

Some common extensions interfere with RES.  To troubleshoot potential conflicts, try turning off all your other extensions.


* **Chrome / Opera:** go to chrome://extensions > for each extension, uncheck the  checkbox ☑ Enabled

* **Microsoft Edge:** Settings > Extensions > for each extension, toggle the enabled option.

* **Firefox:** Tools menu > Add-ons > Extensions tab > for each extension, Click "Disable" button

Disable all your other extensions and plugins, but leave RES enabled. If the problem goes away, then it's a problem with one of your other extensions. (Sometimes other extensions interact with RES in strange ways.) To figure out which one exactly, turn each plugin back on one at a time and reload reddit.com until something breaks.

---

###Ghostery vs Twitter expandos

If Twitter embeds are showing plain text, Ghostery may be blocking Twitter's formatting script. To fix this, disable Ghostery's [Twitter Button Filter](https://apps.ghostery.com/en/apps/twitter_button).

https://www.reddit.com/r/RESissues/comments/43khwi/twitter_expandos_not_working_with_the/

###EmojiInput by EmojiStuff.com

Emoji Input reportedly blocks Account Switcher dropdown showing when clicking the snoo/arrow button and image expandos.

https://www.reddit.com/r/RESissues/comments/4is8fm/bug_account_switcher_and_the_pictures_in_comments/d320tcl?context=5

###Dashlane

Firefox stops responding with:

> "Warning: Unresponsive script [...] Script: resource://gre/modules/commonj...scripts/kwift.FFJETPACK.min.js"

[More info](https://www.reddit.com/r/firefox/comments/3yzns6/temporary_hangs_on_scriptskwiftffjetpackminjs1/d0zhgv0)

###McAfee Site Advisor 

When visiting any reddit page, McAfee Site Advisor throws an error :

> Exception... "<no message>" nsresult: "0x805e0006 (<unknown>)" location: "JS frame :: chrome://saff/content/saffplg.js :: oSAPlg.navigate :: line 30" data: no]

[More discussion](http://www.reddit.com/r/resissues/comments/3re92n/_/)

This is unrelated to RES. 

#### Click and dragging an image open a new tab

Typically caused by other extensions interfering with res. If you encounter this, try turning off other extensions and reloading the page to track down the culprit. 

Several common extensions which cause this issue area listed below. 

* 4chan Plus
* YouTubeMagic Actions
* AS Magic Viewer

Resizing an RES expando image by clicking and dragging it may open the image link in a new tab. Several users have reported that AS Magic Viewer causes this, and uninstalling that fixes it.

[More details](https://www.reddit.com/r/RESissues/comments/3pje2u/bug_zoom_with_expandables_opens_the_link/)


###[Reddit Comment Highlights](https://github.com/staticfish/Reddit-Comment-Highlights)

When using this extension, turn off RES's **[New Comment Count](https://www.reddit.com/#!settings/newCommentCount)**

###[Google Services Dashboard](https://chrome.google.com/webstore/detail/google-services-dashboard/eijbjfcckboebcapjecehbbbcdojcelo)

After resizing an image by clicking and dragging, the image opens in a new tab. [More details](https://www.reddit.com/r/RESissues/comments/2v48mo/images_open_in_new_tab_after_dragging_to_expand/cofw8o5)

###AdBlock for YouTube

AdBlock for YouTube apparently breaks RES's inline image viewer [according to this post](http://www.reddit.com/r/RESissues/comments/2c4myb/bug_adblock_for_youtube_addon_breaks_images/)

###Chromoji

[Chromoji often breaks RES, as well](https://www.reddit.com/r/RESissues/comments/1wv3ny/sticky_chromoji_is_breaking_redditres_on_windows/)


###Ghostery, NoScript

Ghostery, Adblock Plus, and other adblock/Javascript blocker scripts often interfere with RES. Add an exception for ("whitelist") reddit.com to fix this. (Sometimes Adblock Plus automatically updates their lists, so don't rule out ABP even if you haven't changed anything recently.)

###HoverZoom

HoverZoom is usually okay, but it can make RES's image expandos jiggle around a little.
Try HoverFree or Imagus instead.

###HTTPS Everywhere

HTTPS everywhere can break some of RES's image viewing features unless disabled for affected sites (e.g. imgur)

### Privacy Badger vs RES

A user reported that it prevents RES v4.5.1 from loading: https://www.reddit.com/r/RESissues/comments/2givgp/res_not_working_at_all_with_newest_update/ckjn087

### Privacy Badger vs Gfycat

A user reported that Privacy Badger blocks gfycat by default: https://www.reddit.com/r/RESissues/comments/43h09r/bug_gfycat_embedded_videos_not_playing/

###Avast Online Security

We have had some reports of Avast Online Security breaking some RES features such as NER and Modmail Popup. Disabling the "Search engine results" module resolves this.
https://www.reddit.com/r/RESissues/comments/5yo3be/bug/dew3dpc/
