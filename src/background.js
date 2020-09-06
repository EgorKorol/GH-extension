const { REQUESTS_MATCHERS } = require('./constants');

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.newlook.com', schemes: ['https'] },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'www.joules.com', schemes: ['https'] },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});

chrome.webRequest.onCompleted.addListener(
  () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { isCartUpdated: true });
    })
  },
  { urls: REQUESTS_MATCHERS },
);
