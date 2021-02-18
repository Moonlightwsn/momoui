const themeListeners = []

App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: (sysinfo) => {
        if (sysinfo && sysinfo.theme) {
          this.momouiTheme = sysinfo.theme;
        }
      },
    })
  },
  onThemeChange: function(obj) {
    if (obj && obj.theme) {
      this.momouiTheme = obj.theme;
      themeListeners.forEach((listener) => {
        listener(obj.theme)
      })
    }
  },
  watchThemeChange(listener) {
    if (themeListeners.indexOf(listener) < 0) {
      themeListeners.push(listener)
    }
  },
  unWatchThemeChange(listener) {
    const index = themeListeners.indexOf(listener)
    if (index > -1) {
      themeListeners.splice(index, 1)
    }
  },
  momouiRootPath: '/',
  customizedIconsPath: '/assets/icons/',
  momouiTheme: 'light',
  builtinicons: ["account-circle","account-group","account-multiple-minus","account-multiple-plus","account-outline","account","alarm","alert-circle-outline","alert-circle","alert-outline","alert","alphabetical-off","alphabetical","animation","application","apps-box","apps","arrow-all","arrow-collapse-down","arrow-collapse-horizontal","arrow-collapse-left","arrow-collapse-right","arrow-collapse-up","arrow-collapse-vertical","arrow-collapse","arrow-down-drop-circle-outline","arrow-down","arrow-left-drop-circle-outline","arrow-left","arrow-right-drop-circle-outline","arrow-right","arrow-split-horizontal","arrow-split-vertical","arrow-top-right-bottom-left","arrow-up-drop-circle-outline","arrow-up","atom-variant","atom","backspace-outline","backspace-reverse-outline","backspace-reverse","backspace","beach","bell-cancel","bell-off","bell-ring","bell","block-helper","bluetooth","book","bookmark","briefcase","broadcast-off","broadcast","buffer","calendar-edit","calendar","camera-iris","camera-outline","camera","cancel","card-search","cart-outline","cart","cellphone-off","cellphone","chart-areaspline","chat-outline","chat-processing-outline","chat-processing","chat-remove-outline","chat-remove","chat","check-circle-outline","check-circle","check","checkbox-blank-circle-outline","checkbox-blank-circle","checkbox-blank-outline","checkbox-intermediate","checkbox-marked-circle-outline","checkbox-marked","chevron-down","chevron-left","chevron-right","chevron-up","circle-outline","circle","clipboard-check-outline","clipboard-check","clipboard-list-outline","clipboard-list","clipboard-outline","clipboard-text","clipboard","clock-time-five-outline","clock","close-circle-outline","close-circle","close","cloud-upload-outline","cloud-upload","cloud","code-tags","cog-outline","cog","comment-multiple-outline","comment-multiple","comment-off-outline","comment-off","comment-outline","comment-processing-outline","comment","compass-outline","compass","credit-card-outline","credit-card","cube-outline","cube","cursor-default","cursor-move","cut","delete-off-outline","delete-off","delete-outline","delete","dots-horizontal-circle-outline","dots-horizontal-circle","dots-horizontal","dots-vertical-circle-outline","dots-vertical-circle","dots-vertical","email-open-outline","email-open","email-outline","email","exclamation","eye-off-outline","eye-off","eye-outline","eye","face-man","face-woman","file-outline","file","filter-outline","filter","fingerprint-off","fingerprint","folder-outline","folder","format-align-center","format-align-left","format-align-right","format-bold","format-italic","format-underline","forum-outline","forum","gender-female","gender-male","heart-broken","heart-outline","heart","history","home-outline","home","image-multiple-outline","image-multiple","image-outline","image","inbox-outline","inbox","info-outline","info","key","layers-outline","layers-triple-outline","layers-triple","layers","lightbulb-off-outline","lightbulb-off","lightbulb-on-outline","lightbulb-on","lightbulb-outline","lightbulb","link-variant","link","loading","lock-open-outline","lock-open","lock-outline","lock","map-marker-outline","map-marker-radius-outline","map-marker-radius","map-marker","menu-down-outline","menu-down","menu-left-outline","menu-left","menu-right-outline","menu-right","menu-up-outline","menu-up","menu","message-outline","message-reply-outline","message-reply-text","message-reply","message-text-outline","message-text","message","microphone-outline","microphone","minus-circle-outline","minus-circle","minus","movie-outline","movie-play-outline","movie-play","movie","music-circle-outline","music-circle","navigation-outline","navigation","near-me","note-multiple-outline","note-multiple","note-outline","note","paste","pause-circle-outline","pause-circle","pause","pencil-outline","pencil","pin-outline","pin","play-circle-outline","play-circle","play-outline","play-pause","play","plus-circle-outline","plus-circle","plus","power","radiobox-blank","radiobox-marked","replay","reply-outline","reply","restore","save-outline","save","scan","school-outline","school","screen-rotation-lock","screen-rotation","search","send-outline","send","share-circle","share-off-outline","share-off","share-outline","share-variant-outline","share-variant","share","skip-backward-outline","skip-backward","skip-forward-outline","skip-forward","skip-next-circle-outline","skip-next-circle","skip-next-outline","skip-next","skip-previous-circle-outline","skip-previous-circle","skip-previous-outline","skip-previous","star","step-backward","step-forward","svg","tag-multiple-outline","tag-multiple","tag-outline","tag","theme-light-dark","thumb-down-outline","thumb-down","thumb-up-outline","thumb-up","timer-outline","timer","trash-can-outline","tshirt-crew-outline","tshirt-crew","video-outline","video","web","widgets-outline","widgets","wifi","wrench-outline","wrench"],
})
