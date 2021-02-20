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
  builtinicons: ["account","account-circle","account-group","account-multiple-minus","account-multiple-plus","account-outline","alarm","alert","alert-circle","alert-circle-outline","alert-outline","alphabetical","alphabetical-off","animation","application","apps","apps-box","arrow-all","arrow-collapse","arrow-collapse-down","arrow-collapse-horizontal","arrow-collapse-left","arrow-collapse-right","arrow-collapse-up","arrow-collapse-vertical","arrow-down","arrow-down-drop-circle-outline","arrow-left","arrow-left-drop-circle-outline","arrow-right","arrow-right-drop-circle-outline","arrow-split-horizontal","arrow-split-vertical","arrow-top-right-bottom-left","arrow-up","arrow-up-drop-circle-outline","atom","atom-variant","backspace","backspace-outline","backspace-reverse","backspace-reverse-outline","beach","bell","bell-cancel","bell-off","bell-ring","block-helper","bluetooth","book","bookmark","briefcase","broadcast","broadcast-off","buffer","calendar","calendar-edit","camera","camera-iris","camera-outline","cancel","card-search","cart","cart-outline","cellphone","cellphone-off","chart-areaspline","chat","chat-outline","chat-processing","chat-processing-outline","chat-remove","chat-remove-outline","check","check-circle","check-circle-outline","checkbox-blank-circle","checkbox-blank-circle-outline","checkbox-blank-outline","checkbox-intermediate","checkbox-marked","checkbox-marked-circle-outline","chevron-down","chevron-left","chevron-right","chevron-up","circle","circle-outline","clipboard","clipboard-check","clipboard-check-outline","clipboard-list","clipboard-list-outline","clipboard-outline","clipboard-text","clock","clock-time-five-outline","close","close-circle","close-circle-outline","cloud","cloud-upload","cloud-upload-outline","code-tags","cog","cog-outline","comment","comment-multiple","comment-multiple-outline","comment-off","comment-off-outline","comment-outline","comment-processing-outline","compass","compass-outline","credit-card","credit-card-outline","cube","cube-outline","cursor-default","cursor-move","cut","delete","delete-off","delete-off-outline","delete-outline","dots-horizontal","dots-horizontal-circle","dots-horizontal-circle-outline","dots-vertical","dots-vertical-circle","dots-vertical-circle-outline","email","email-open","email-open-outline","email-outline","exclamation","eye","eye-off","eye-off-outline","eye-outline","face-man","face-woman","file","file-outline","filter","filter-outline","fingerprint","fingerprint-off","folder","folder-outline","format-align-center","format-align-left","format-align-right","format-bold","format-italic","format-underline","forum","forum-outline","gender-female","gender-male","handshake","handshake-outline","heart","heart-broken","heart-outline","help","help-box","help-circle","help-circle-outline","history","home","home-outline","image","image-multiple","image-multiple-outline","image-outline","inbox","inbox-outline","info","info-outline","key","layers","layers-outline","layers-triple","layers-triple-outline","lightbulb","lightbulb-off","lightbulb-off-outline","lightbulb-on","lightbulb-on-outline","lightbulb-outline","link","link-variant","loading","lock","lock-open","lock-open-outline","lock-outline","map-marker","map-marker-outline","map-marker-radius","map-marker-radius-outline","menu","menu-down","menu-down-outline","menu-left","menu-left-outline","menu-right","menu-right-outline","menu-up","menu-up-outline","message","message-outline","message-reply","message-reply-outline","message-reply-text","message-text","message-text-outline","microphone","microphone-outline","minus","minus-circle","minus-circle-outline","movie","movie-outline","movie-play","movie-play-outline","music-circle","music-circle-outline","navigation","navigation-outline","near-me","note","note-multiple","note-multiple-outline","note-outline","paste","pause","pause-circle","pause-circle-outline","pencil","pencil-outline","pin","pin-outline","play","play-circle","play-circle-outline","play-outline","play-pause","plus","plus-circle","plus-circle-outline","power","radiobox-blank","radiobox-marked","replay","reply","reply-outline","restore","save","save-outline","scan","school","school-outline","screen-rotation","screen-rotation-lock","search","send","send-outline","share","share-circle","share-off","share-off-outline","share-outline","share-variant","share-variant-outline","skip-backward","skip-backward-outline","skip-forward","skip-forward-outline","skip-next","skip-next-circle","skip-next-circle-outline","skip-next-outline","skip-previous","skip-previous-circle","skip-previous-circle-outline","skip-previous-outline","star","step-backward","step-forward","svg","swap-horizontal","swap-horizontal-bold","swap-vertical","swap-vertical-bold","tag","tag-multiple","tag-multiple-outline","tag-outline","theme-light-dark","thumb-down","thumb-down-outline","thumb-up","thumb-up-outline","timer","timer-outline","trash-can-outline","tshirt-crew","tshirt-crew-outline","video","video-outline","web","widgets","widgets-outline","wifi","wrench","wrench-outline"],
})
